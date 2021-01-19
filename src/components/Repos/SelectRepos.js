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
export default SelectRepos;
