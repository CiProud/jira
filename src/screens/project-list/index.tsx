import React from "react";

import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useState } from "react";
import { useMount, useDebounce, useDocumentTitle } from "util/index";
import { useHttp } from "util/http";
import styled from "@emotion/styled";
import { Button, Row, Typography } from "antd";
import { useProjects } from "util/project";
import { useProjectSearchParams } from "./util";

export const ProjectListScreen = (props: {
  setProjectModalOpen: (isOpen: boolean) => void;
}) => {
  useDocumentTitle("项目列表", false);
  const [users, setUsers] = useState([]);
  const [param, setParam] = useProjectSearchParams();
  const client = useHttp();
  const {
    isLoading,
    error,
    data: list,
    retry,
  } = useProjects(useDebounce(param, 200));
  useMount(() => {
    client("users", {}).then(setUsers);
  });
  return (
    <Container>
      <Row align="middle" justify="space-between">
        <h1>项目列表</h1>
        <Button onClick={() => props.setProjectModalOpen(true)}>
          添加项目
        </Button>
      </Row>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List
        setProjectModalOpen={props.setProjectModalOpen}
        refresh={retry}
        users={users}
        loading={isLoading}
        dataSource={list || []}
      />
    </Container>
  );
};

ProjectListScreen.whyDidYouRender = false;
const Container = styled.div`
  padding: 3.2rem;
`;
