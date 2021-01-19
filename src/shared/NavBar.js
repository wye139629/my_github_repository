import styled from "styled-components";

const Nav = styled.nav`
  background-color: #24292e;
  height: 62px;
  margin-bottom: 30px;
  h1 {
    font-size: 20px;
    margin: 0;
    color: white;
    line-height: 62px;
  }
`;

function NavBar() {
  return (
    <Nav>
      <h1>My GitHub Repositories</h1>
    </Nav>
  );
}

export default NavBar;
