import React, { useState } from "react";
import { User } from "screens/project-list/search-panel";
import * as auth from "auth-provider";
import { http } from "util/http";
import { useMount } from "util/index";
import { useAsync } from "util/use-async";
import { FullPageErrorFallback, FullPageLoading } from "components/lib";

interface AuthForm {
  username: string;
  password: string;
}

const bootstrap = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

const AuthContext = React.createContext<
  | {
      user: User | null;
      register: (form: AuthForm) => Promise<void>;
      login: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    run,
    setData: setUser,
  } = useAsync<User | null>();

  const login = (form: AuthForm) => auth.login(form).then(setUser);
  const register = (form: AuthForm) => auth.register(form).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null));

  useMount(() => {
    run(bootstrap());
  });

  if (isIdle || isLoading) {
    return <FullPageLoading></FullPageLoading>;
  }

  if (isError) {
    return <FullPageErrorFallback error={error}></FullPageErrorFallback>;
  }
  return (
    <AuthContext.Provider
      value={{ user, login, register, logout }}
      children={children}
    />
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth只能在AuthProvider中使用");
  }
  return context;
};
