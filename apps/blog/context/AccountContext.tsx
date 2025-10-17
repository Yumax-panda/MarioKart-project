import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type AccountInfo = {
  userName: string;
  image: string;
  discordId: string;
};

type AccountContextType = {
  account: AccountInfo;
  syncAccountInfo: () => Promise<void>;
};

const AccountContext = createContext<AccountContextType>({
  account: {
    userName: "",
    image: "",
    discordId: "",
  },
  syncAccountInfo: async () => {},
});

type ProviderProps = {
  children: React.ReactNode;
};

export const AccountProvider = ({ children }: ProviderProps) => {
  const [account, _setAccount] = useState<AccountInfo>({
    userName: "",
    image: "",
    discordId: "",
  });

  const syncAccountInfo = useCallback(async () => {}, []);

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
