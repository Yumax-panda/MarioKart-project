import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { client } from "@/lib/rpc-browser";

type AccountInfo =
  | {
      id: string;
      name: string;
      image: string | null;
    }
  | null
  | undefined;

type AccountContextType = {
  account: AccountInfo;
  syncAccountInfo: () => Promise<void>;
};

const AccountContext = createContext<AccountContextType>({
  account: null,
  syncAccountInfo: async () => {},
});

type ProviderProps = {
  children: React.ReactNode;
};

export const AccountProvider = ({ children }: ProviderProps) => {
  const [account, setAccount] = useState<AccountInfo>(undefined);

  const syncAccountInfo = useCallback(async () => {
    const res = await client.api.v1.users["@me"].$get();

    if (!res.ok) {
      return setAccount(null);
    }

    const {
      user: { id, name, image },
    } = await res.json();
    setAccount({ id, name, image });
  }, []);

  useEffect(() => {
    syncAccountInfo();
  }, [syncAccountInfo]);

  return (
    <AccountContext.Provider value={{ account, syncAccountInfo }}>
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = () => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error("useAccount must be used within a AccountProvider");
  }
  return context;
};
