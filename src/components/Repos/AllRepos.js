import fetchData from "../../shared/fetchData";
function AllRepos({ repos, pages, toEndPage, updateRepo }) {
  const scrollHandler = (e) => {
    let scrollDistance = e.target.scrollTop;
    let reposHeight = e.target.offsetHeight;
    let scrollingHeight = e.target.scrollHeight;
    let toBottom = scrollDistance + reposHeight === scrollingHeight;
    if (!toEndPage && toBottom) {
      pages += 1;
      const repoAmount = 5;
      const cloneRepo = repos.concat();
      fetchData(repoAmount, pages).then((newRepo) => {
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
          <li key={index}>
            <ul>
              <li>{repo.name}</li>
              <li>{repo.description}</li>
              <li>{repo.url}</li>
            </ul>
          </li>
        );
      })}
    </ul>
  );
}
export default AllRepos;
