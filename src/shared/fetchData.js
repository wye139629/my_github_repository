async function fetchData(url) {
  const response = await fetch(`https://api.github.com/users/wye139629${url}`, {
    headers: {
      Authorization: `token ${process.env.React_APP_USER_TOKEN}`,
    },
  });
  const json = await response.json();
  return json;
}
export default fetchData;
