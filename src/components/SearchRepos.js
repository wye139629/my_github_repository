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

export default SearchRepos;
