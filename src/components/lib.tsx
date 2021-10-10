import styled from "@emotion/styled";

export const Row = styled.div`
  display: flex;
  align-items: center;
  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${(props) => props.gap && 2};
  }
`;
