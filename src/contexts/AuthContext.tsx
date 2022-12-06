import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { UserAccount } from "../Types";

interface AuthContextProviderProps {
  children: ReactNode;
}

interface AuthContextProps {
  userAccount?: UserAccount;
  setUserAccount: Dispatch<SetStateAction<UserAccount | undefined>>;
}

export const AuthContext = createContext({} as AuthContextProps);

export default function AuthContextProvider({
  children,
}: AuthContextProviderProps) {
  const [userAccount, setUserAccount] = useState<UserAccount | undefined>();

  return (
    <AuthContext.Provider value={{ userAccount, setUserAccount }}>
      {children}
    </AuthContext.Provider>
  );
}
