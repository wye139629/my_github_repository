import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import fetchData from "./shared/fetchData";
import SearchRepos from "./components/SearchRepos";
import Repos from "./components/Repos/Repos";
import Profile from "./components/Profile";
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
    const reposUrl = `/repos?per_page=${repoAmount}&page=${pages}`;
    fetchData(reposUrl).then((repoData) => setRepos(repoData));
  }, []);
  useEffect(() => {
    const reposUrl = `/repos?per_page=&page=`;
    fetchData(reposUrl).then((repoData) => {
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
      <Profile />
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

export default App;
