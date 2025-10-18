import { zValidator } from "@hono/zod-validator";
import { GetCallbackQuerySchema } from "@repo/schema/auth/discord";
import { Hono } from "hono";
import { getCookie, setCookie } from "hono/cookie";
import type { CookieOptions } from "hono/utils/cookie";
import {
  StatusBadRequest,
  StatusForbidden,
  StatusInternalServerError,
} from "@/lib/statusCode";
import { randomString } from "@/lib/utils";
import { KEY_SESSION_ID, KEY_STATE_ID } from "../consts/cookie";
import { AccountType, ProviderName } from "../consts/enum";
import { sessionKeepAge, sessionMaxAge } from "../consts/session";
import type { Env } from "../types";

type TokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
};

export type DiscordUser = {
  id: string;
  username: string;
  global_name: string | null;
  discriminator: string;
  avatar: string | null;
  verified: boolean;
  email: string | null;
  flags: number;
  banner: string | null;
  accent_color: number | null;
  premium_type: number | null;
  public_flags: number;
  avatar_decoration_data?: {
    sku_id: string;
    asset: string;
  };
  collectibles?: {
    nameplate?: {
      sku_id: string;
      asset: string;
      label: string;
      palette: string;
    };
  };
  primary_guild?: {
    identity_guild_id: string;
    identity_enabled: boolean;
    tag: string;
    badge: string;
  };
};

export type DiscordPartialGuild = {
  id: string;
  name: string;
  icon: string | null;
  banner: string | null;
  owner: boolean;
  permissions: string;
  features: string[];
  approximate_member_count?: number;
  approximate_presence_count?: number;
};

// https://discord.com/developers/docs/topics/oauth2#oauth2
export const discord = new Hono<Env>()
  .get("/login", async (c) => {
    const stateValue = randomString(16);
    const { id } = await c.var.repo.authState.create(stateValue);

    const opts: CookieOptions = {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 300000,
    };

    if (c.env.ENV_NAME === "production") {
      opts.sameSite = "none";
      opts.secure = true;
      opts.partitioned = true;
    }

    setCookie(c, KEY_STATE_ID, id, opts);

    const params = new URLSearchParams({
      response_type: "code",
      client_id: c.env.DISCORD_CLIENT_ID,
      scope: "identify email guilds",
      state: stateValue,
      redirect_uri: `${c.env.BASE_URL}/api/auth/discord/callback`,
    });
    return c.redirect(
      `https://discord.com/oauth2/authorize?${params.toString()}`,
    );
  })
  .get("/callback", zValidator("query", GetCallbackQuerySchema), async (c) => {
    const { code, state } = c.req.valid("query");
    const stateId = getCookie(c, KEY_STATE_ID);

    if (!stateId) {
      return c.json({ error: "Missing state id." }, StatusBadRequest);
    }

    const storedStatePayload = await c.var.repo.authState.get(stateId);

    if (storedStatePayload === null) {
      return c.json({ error: "Invalid state id." }, StatusBadRequest);
    }

    if (state !== storedStatePayload.state) {
      return c.json({ error: "Invalid state." }, StatusBadRequest);
    }

    const params = new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: `${c.env.BASE_URL}/api/auth/discord/callback`,
    });

    const tokenRes = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          btoa(`${c.env.DISCORD_CLIENT_ID}:${c.env.DISCORD_CLIENT_SECRET}`),
      },
      body: params.toString(),
    });

    if (!tokenRes.ok) {
      return c.json(
        { error: "Internal server error." },
        StatusInternalServerError,
      );
    }

    const token: TokenResponse = await tokenRes.json();

    const [accountInfoRes, guildsRes] = await Promise.all([
      fetch("https://discord.com/api/users/@me", {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
        },
      }),
      fetch("https://discord.com/api/users/@me/guilds", {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
        },
      }),
    ]);

    if (!accountInfoRes.ok) {
      return c.json(
        { error: "Failed to fetch account info." },
        StatusInternalServerError,
      );
    }

    if (!guildsRes.ok) {
      return c.json(
        {
          error: "Failed to fetch guilds info.",
        },
        StatusInternalServerError,
      );
    }

    const guilds: DiscordPartialGuild[] = await guildsRes.json();

    // 指定したDiscordサーバーに入っていなかったら却下
    if (!guilds.some((g) => g.id === c.env.ALLOWED_DISCORD_SERVER_ID)) {
      return c.json(
        { error: "You are not permitted to access." },
        StatusForbidden,
      );
    }

    const discordAccount: DiscordUser = await accountInfoRes.json();

    const storedUser = await c.var.repo.user.getByAccount({
      provider: ProviderName.discord,
      providerAccountId: discordAccount.id,
    });

    const storedAccount = await c.var.repo.account.getById({
      provider: ProviderName.discord,
      providerAccountId: discordAccount.id,
    });

    let userId: string | null = null;

    if (storedUser === null) {
      let image: null | string = null;

      if (discordAccount.avatar) {
        const format = discordAccount.avatar.startsWith("a_") ? "gif" : "png";
        image = `https://cdn.discordapp.com/avatars/${discordAccount.id}/${discordAccount.avatar}.${format}`;
      }

      const newUser = await c.var.repo.user.create({
        name: discordAccount.username,
        email: discordAccount.email,
        image,
      });

      userId = newUser.id;
    } else {
      userId = storedUser.id;
    }

    if (!storedAccount) {
      await c.var.repo.account.create({
        userId: userId,
        provider: ProviderName.discord,
        providerAccountId: discordAccount.id,
        type: AccountType.oauth,
        refresh_token: token.refresh_token,
        access_token: token.access_token,
        scope: token.scope,
        token_type: token.token_type,
        expires_at: Math.floor(Date.now() / 1000) + token.expires_in,
      });
    } else {
      await c.var.repo.account.update({
        provider: ProviderName.discord,
        providerAccountId: discordAccount.id,
        scope: token.scope,
        type: AccountType.oauth,
        refresh_token: token.refresh_token,
        access_token: token.access_token,
        token_type: token.token_type,
        expires_at: Math.floor(Date.now() / 1000) + token.expires_in,
      });
    }

    const sessionExpires = new Date(
      Date.now() + (sessionMaxAge + sessionKeepAge) * 1000,
    );

    const newSession = await c.var.repo.session.create({
      sessionToken: randomString(50),
      userId,
      expires: sessionExpires,
    });

    const opts: CookieOptions = {
      expires: sessionExpires,
      maxAge: sessionMaxAge + sessionKeepAge,
      path: "/",
      httpOnly: true,
      sameSite: "lax",
    };

    if (c.env.ENV_NAME === "production") {
      opts.sameSite = "none";
      opts.secure = true;
      opts.partitioned = true;
    }

    setCookie(c, KEY_SESSION_ID, newSession.sessionToken, opts);

    return c.redirect(c.env.FRONTEND_BASE_URL);
  });
