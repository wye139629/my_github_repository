import { useState, useEffect } from "react";
import fetchData from "../shared/fetchData";

function Profile() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetchData("").then((user) => setUser(user));
  }, []);
  if (!user) return null;
  return (
    <div>
      <div>
        <img src={user.avatar_url} />
      </div>
      <div>
        <h3>{user.name}</h3>
        <h4>{user.login}</h4>
        <div>
          <span>{user.followers}followers</span>
          <span>{user.following}following</span>
        </div>
      </div>
    </div>
  );
}
export default Profile;
