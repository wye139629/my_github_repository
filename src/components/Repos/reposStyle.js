import styled from "styled-components";
export const RepoItem = styled.li`
  padding: 30px 0;
  + li {
    border-top: 1px solid #ccc;
  }
`;

export const RepoInfo = styled.li`
  font-size: ${(props) => props.size || "15px"};
  color: ${(props) => props.color || "#586069"};
  + li {
    margin-top: 10px;
  }
`;
const type = {
  HTML: "#e34c26",
  CSS: "#563d7c",
  JavaScript: "#f1e05a",
  Ruby: "#701516",
};

export const LanguageStyle = styled(RepoInfo)`
  &:before {
    content: "";
    display: inline-block;
    margin-right: 10px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${(props) => type[props.type]};
  }
`;
