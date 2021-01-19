import styled from "styled-components";
const SearchForm = styled.form`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding-right: 10px;
  input {
    font-size: 15px;
    flex-grow: 5;
    margin: 0 10px 0 0;
    padding: 10px;
    border-radius: 10px;
    :focus {
      outline: none;
    }
  }
  .typeGroup {
    flex-grow: 1;
  }
`;
const Type = styled.div`
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 20px;
  padding: 10px 0;
  select {
    font-size: 15px;
    border: none;
    :focus {
      outline: none;
    }
  }
`;

function SearchRepos({ languageOptions, changeLanguage, searchingRepos }) {
  const changeHandler = (e) => {
    changeLanguage(e.target.value);
  };
  const typingHandler = (e) => {
    searchingRepos(e.target.value);
  };
  return (
    <SearchForm>
      <input placeholder="Find a repository..." onChange={typingHandler} />
      <Type className="typeGroup">
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
      </Type>
    </SearchForm>
  );
}

export default SearchRepos;
