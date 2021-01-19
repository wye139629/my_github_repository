import { useState, useEffect } from "react";
import fetchData from "../shared/fetchData";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 20%;
  box-sizing: border-box;
  padding: 0 20px;
  @media (max-width: 768px) {
    display: flex;
    width: 100%;
    margin-bottom: 30px;
  }
`;
const Picture = styled.div`
  img {
    border-radius: 50%;
    width: 100%;
  }
  @media (max-width: 768px) {
    width: 20%;
    min-width: 128px;
  }
`;

const UserInfo = styled.div`
  text-align: start;
  margin-top: 15px;
  white-space: nowrap;
  h3,
  h4 {
    margin: 5px 0;
  }
  h3 {
    font-size: 25px;
  }
  h4 {
    color: #586069;
    font-size: 20px;
  }

  span + span {
    margin-left: 10px;
  }
  @media (max-width: 992px) {
    span {
      display: block;
    }
    span + span {
      margin: 0;
    }
    @media (max-width: 768px) {
      margin-left: 20px;
      span {
        display: inline-block;
      }
      span + span {
        margin-left: 10px;
      }
    }
  }
`;

function Profile() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetchData("").then((user) => setUser(user));
  }, []);
  if (!user) return null;
  return (
    <Wrapper>
      <Picture>
        <img src={user.avatar_url} />
      </Picture>
      <UserInfo>
        <h3>{user.name}</h3>
        <h4>{user.login}</h4>
        <div>
          <span>{user.followers} followers</span>
          <span>{user.following} following</span>
        </div>
      </UserInfo>
    </Wrapper>
  );
}
export default Profile;
