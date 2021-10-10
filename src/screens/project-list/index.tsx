import React from "react";

import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useState, useEffect } from "react";
import { cleanObject, useMount, useDebounce } from "util/index";
import qs from "qs";
import { useHttp } from "util/http";

export const ProjectListScreen = () => {
  const [users, setUsers] = useState([]);

  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [list, setList] = useState([]);
  const debouncedParam = useDebounce(param, 200);
  const client = useHttp();

  useEffect(() => {
    client(["projects", { data: cleanObject(debouncedParam) }]).then(setList);
  });

  useMount(() => {
    client(["users", {}]).then(setUsers);
  });
  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List users={users} list={list} />
    </div>
  );
};
