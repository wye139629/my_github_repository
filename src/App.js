import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
async function fetchData(page) {
  const response = await fetch(
    `https://api.github.com/users/wye139629/repos?per_page=5&page=${page}`,
    {
      headers: {
        Authorization: `token ${process.env.React_APP_USER_TOKEN}`,
      },
    }
  );
  const json = await response.json();
  return json;
}
function App() {
  const [repos, setRepos] = useState(null);
  const [pages, setPages] = useState(1);
  const [toEndPage, setToEndPage] = useState(false);
  useEffect(() => {
    fetchData(pages).then((repoData) => setRepos(repoData));
  }, []);

  const updateRepo = (newRepos, newpage, toEnd) => {
    setToEndPage(toEnd);
    setPages(newpage);
    setRepos(newRepos);
  };
  return (
    <div className="App">
      {repos && (
        <Repos
          repos={repos}
          pages={pages}
          toEndPage={toEndPage}
          updateRepo={updateRepo}
        ></Repos>
      )}
    </div>
  );
}

function Repos({ repos, pages, toEndPage, updateRepo }) {
  const scrollHandler = (e) => {
    let scrollDistance = e.target.scrollTop;
    let reposHeight = e.target.offsetHeight;
    let scrollingHeight = e.target.scrollHeight;
    let toBottom = scrollDistance + reposHeight === scrollingHeight;
    if (!toEndPage && toBottom) {
      pages += 1;
      const cloneRepo = repos.concat();
      fetchData(pages).then((newRepo) => {
        toEndPage = newRepo.length < 5;
        const updateRepos = cloneRepo.concat(newRepo);
        updateRepo(updateRepos, pages, toEndPage);
      });
    }
    // console.log(1);
  };
  return (
    <div>
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
    </div>
  );
}
export default App;
