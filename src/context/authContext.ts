import { createContext } from "react";

interface AuthStatus {
  authStatus: boolean;
  setAuthStatus: (status: boolean) => void;
}

const AuthContext = createContext<AuthStatus>({
  authStatus: false,
  setAuthStatus: () => {},
});

export const AuthProvider = AuthContext.Provider;
export default AuthContext;
