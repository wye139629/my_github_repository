import fetchData from "../../shared/fetchData";
import { RepoItem, RepoInfo, LanguageStyle } from "./reposStyle";
function AllRepos({ repos, pages, toEndPage, updateRepo }) {
  const scrollHandler = (e) => {
    let scrollDistance = e.target.scrollTop;
    let reposHeight = e.target.offsetHeight;
    let scrollingHeight = e.target.scrollHeight;
    let toBottom = scrollDistance + reposHeight === scrollingHeight;
    if (!toEndPage && toBottom) {
      pages += 1;
      const repoAmount = 5;
      const reposUrl = `/repos?per_page=${repoAmount}&page=${pages}`;
      const cloneRepo = repos.concat();
      fetchData(reposUrl).then((newRepo) => {
        toEndPage = newRepo.length < repoAmount;
        const updateRepos = cloneRepo.concat(newRepo);
        updateRepo(updateRepos, pages, toEndPage);
      });
    }
    // console.log(1);
  };
  return (
    <ul className="repo" onScroll={toEndPage ? null : scrollHandler}>
      {repos.map((repo, index) => {
        return (
          <RepoItem key={index}>
            <ul>
              <RepoInfo size="25px" color="#0366d6">
                {repo.name}
              </RepoInfo>
              <RepoInfo>{repo.description}</RepoInfo>
              <LanguageStyle type={repo.language}>
                {repo.language}
              </LanguageStyle>
              <RepoInfo>
                Link: <a href={repo.html_url}>{repo.html_url}</a>
              </RepoInfo>
            </ul>
          </RepoItem>
        );
      })}
    </ul>
  );
}
export default AllRepos;
