import styled from "styled-components";
export const RepoItem = styled.li`
  padding: 45px 10px;
  :first-child {
    border-top: 1px solid #ccc;
  }
  + li {
    border-top: 1px solid #ccc;
  }
`;

export const RepoInfo = styled.li`
  font-size: 20px;
  + li {
    margin-top: 10px;
  }
`;
