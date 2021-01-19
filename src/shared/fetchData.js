async function fetchData(url) {
  const response = await fetch(`https://api.github.com/users/wye139629${url}`);
  const json = await response.json();
  return json;
}
export default fetchData;
