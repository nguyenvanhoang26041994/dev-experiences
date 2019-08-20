<table>
  <tr>
    <th>Classes</th>
    <th>Hooks</th>
  </tr>
  <tr>
    <td><pre lang="javascript">
function getSomeThing() {
  API.getSomeThing()
}
componentDidMount() {
  this.getSomeThing();
}
    </pre></td>
    <td><pre lang="javascript">
const getSomeThing = () => API.getSomeThing();
useEffect(() => {
  getSomeThing();
}, []);
    </pre></td>
  </tr>
    <tr>
    <td>
      <pre lang="javascript">
onBodyClick() {}
componentDidMount() {
  document.body
    .addEventListener('click', this.onBodyClick);
}

componentWillUnmount() {
  document.body
    .removeEventListener('click', this.onBodyClick);
}
      </pre>
    </td>
    <td>
      <pre lang="javascript">
const onBodyClick = () => {};
useEffect(() => {
  document.body
    .addEventListener('click', onBodyClick);
 
  return () => document
    .body.removeEventListener('click', onBodyClick);
}, []);
      </pre>
    </td>
  </tr>
<table>
