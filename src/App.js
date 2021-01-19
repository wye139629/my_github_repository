import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
async function fetchData(perPage, page) {
  const response = await fetch(
    `https://api.github.com/users/wye139629/repos?per_page=${perPage}&page=${page}`,
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
  const [allRepos, setAllRepos] = useState(null);
  const [classifiedRepo, setClassifiedRepo] = useState(null);
  const [repos, setRepos] = useState(null);
  const [pages, setPages] = useState(1);
  const [toEndPage, setToEndPage] = useState(false);
  const [languageOptions, setLanguageOptions] = useState(null);
  const [selectRepos, setSelectRepos] = useState(null);
  useEffect(() => {
    const repoAmount = 5;
    fetchData(repoAmount, pages).then((repoData) => setRepos(repoData));
  }, []);
  useEffect(() => {
    fetchData().then((repoData) => {
      const languages = repoData.reduce((accu, current) => {
        accu[current.language]
          ? accu[current.language].push(current)
          : (accu[current.language] = [current]);
        return accu;
      }, {});
      const filterLanguages = Object.keys(languages).filter(
        (language) => language !== "null"
      );
      setAllRepos(repoData);
      setClassifiedRepo(languages);
      setLanguageOptions(filterLanguages);
    });
  }, []);

  const updateRepo = (newRepos, newpage, toEnd) => {
    setToEndPage(toEnd);
    setPages(newpage);
    setRepos(newRepos);
  };

  const changeLanguage = (language) => {
    setSelectRepos(classifiedRepo[language]);
  };

  const searchingRepos = (name) => {
    const searchedRepos = allRepos.filter((repo) => {
      if (repo.name.includes(name)) {
        return repo;
      }
    });
    setSelectRepos(searchedRepos);
  };

  return (
    <div className="App">
      <SearchRepos
        languageOptions={languageOptions}
        changeLanguage={changeLanguage}
        searchingRepos={searchingRepos}
      />
      {repos && (
        <Repos
          repos={repos}
          selectRepos={selectRepos}
          pages={pages}
          toEndPage={toEndPage}
          updateRepo={updateRepo}
        ></Repos>
      )}
    </div>
  );
}

function SearchRepos({ languageOptions, changeLanguage, searchingRepos }) {
  const changeHandler = (e) => {
    changeLanguage(e.target.value);
  };
  const typingHandler = (e) => {
    searchingRepos(e.target.value);
  };
  return (
    <form>
      <input placeholder="Find a repository..." onChange={typingHandler} />
      <label>Language:</label>
      <select id="types" onChange={changeHandler}>
        <option value="">All</option>
        {languageOptions &&
          languageOptions.map((language, index) => {
            return (
              <option key={index} value={language}>
                {language}
              </option>
            );
          })}
      </select>
    </form>
  );
}

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

function SelectRepos({ repos }) {
  return (
    <ul className="repo">
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
export default App;
