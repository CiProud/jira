import { useEffect } from "react";
import { User } from "screens/project-list/search-panel";
import { cleanObject } from "util/index";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();
  const { run, ...res } = useAsync<User[]>();
  useEffect(() => {
    run(client("users", { data: cleanObject(param || {}) }));
    // eslint-disable-next-line
  }, [param]);
  return res;
};
