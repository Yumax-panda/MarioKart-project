import type { AccountRepository } from "./accounts";
import type { PostRepository } from "./posts";
import type { SessionRepository } from "./sessions";
import type { TagRepository } from "./tags";
import type { UserRepository } from "./users";

export interface Repository {
  account: AccountRepository;
  post: PostRepository;
  session: SessionRepository;
  tag: TagRepository;
  user: UserRepository;
}
