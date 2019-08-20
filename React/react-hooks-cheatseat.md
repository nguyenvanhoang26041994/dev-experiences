  <table>
    <tr>
      <td>Classes</td>
      <td>Hooks</td>
    </tr>
    <tr class="1">
      <td>
        <pre lang="javascript">
componentDidMount() {
  API.getSomeThing();
}
        </pre>
      </td>
      <td>
        <pre lang="javascript">
useEffect(() => {
  API.getSomeThing();
}, []);
        </pre>
      </td>
    </tr>
    <tr class="2">
      <td>
        <pre lang="javascript">
onBodyClick() {}
componentDidMount() {
  document
    .body
    .addEventListener('click', this.onBodyClick);
}

componentWillUnmount() {
  document
    .body
    .removeEventListener('click', this.onBodyClick);
}
        </pre>
      </td>
      <td>
        <pre lang="javascript">
const onBodyClick = () => {};
useEffect(() => {
  document
    .body
    .addEventListener('click', onBodyClick);
 
  return () => {
    document
    .body.
    removeEventListener('click', onBodyClick);
}, []);
        </pre>
      </td>
    </tr>
  </table>
