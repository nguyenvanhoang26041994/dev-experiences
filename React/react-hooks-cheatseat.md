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
  </table>
