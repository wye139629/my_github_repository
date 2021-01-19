import { RepoItem, RepoInfo } from "./reposStyle";
function SelectRepos({ repos }) {
  return (
    <ul className="repo">
      {repos.map((repo, index) => {
        return (
          <RepoItem key={index}>
            <ul>
              <RepoInfo size="25px" color="#0366d6">
                {repo.name}
              </RepoInfo>
              <RepoInfo>{repo.description}</RepoInfo>
              <RepoInfo>{repo.language}</RepoInfo>
              <RepoInfo>Link:{repo.html_url}</RepoInfo>
            </ul>
          </RepoItem>
        );
      })}
    </ul>
  );
}
export default SelectRepos;
