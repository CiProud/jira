import React from "react";

import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useState, useEffect } from "react";
import { cleanObject, useMount, useDebounce } from "util/index";
import qs from "qs";
import { useHttp } from "util/http";
import styled from "@emotion/styled";

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
  }, [debouncedParam]);

  useMount(() => {
    client(["users", {}]).then(setUsers);
  });
  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List users={users} list={list} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
