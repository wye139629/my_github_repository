import SelectRepos from "./SelectRepos";
import AllRepos from "./AllRepos";

function Repos({ repos, selectRepos, pages, toEndPage, updateRepo }) {
  return (
    <div>
      {selectRepos ? (
        <SelectRepos repos={selectRepos} />
      ) : (
        <AllRepos
          repos={repos}
          pages={pages}
          toEndPage={toEndPage}
          updateRepo={updateRepo}
        ></AllRepos>
      )}
    </div>
  );
}
export default Repos;
