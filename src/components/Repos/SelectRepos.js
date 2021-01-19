import { RepoItem, RepoInfo } from "./reposStyle";
function SelectRepos({ repos }) {
  return (
    <ul className="repo">
      {repos.map((repo, index) => {
        return (
          <RepoItem key={index}>
            <ul>
              <RepoInfo>{repo.name}</RepoInfo>
              <RepoInfo>{repo.description}</RepoInfo>
              <RepoInfo>{repo.language}</RepoInfo>
              <RepoInfo>Link:{repo.url}</RepoInfo>
            </ul>
          </RepoItem>
        );
      })}
    </ul>
  );
}
export default SelectRepos;
