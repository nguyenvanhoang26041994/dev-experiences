<table>
  <tr>
    <td>Classes</td>
    <td>Hooks</td>
  </tr>
  <tr>
  <tr>
    <td>
      <pre lang="javascript">
state = { name: '' };
setName(name) {
  this.setState({ name });
}
      </pre>
    </td>
    <td>
      <pre lang="javascript">
const [name, setName] = useState('');
      </pre>
    </td>
  </tr>
  <tr>
    <td>
      <pre lang="javascript">
state = { count: 0 };
nextCount() {
  this.setState(prevState => ({
    ...prevState,
    count: prevState.count + 1,
  }));
}
      </pre>
    </td>
    <td>
      <pre lang="javascript">
const [count, setCount] = useState(0);
const nextCount = () =>
  setCount(prevValue => prevValue + 1);
      </pre>
    </td>
  </tr>
  <tr>
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
}, []); // Phải thêm [] để không bị gọi API liên tục mỗi lần re-render
      </pre>
    </td>
  </tr>
  <tr>
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
}, []);// Phải thêm [] để không bị gọi API liên tục mỗi lần re-render
      </pre>
    </td>
  </tr>
  <tr>
    <td>
      <pre lang="javascript">
doSomething() {}
componentDidMount() {
  doSomething();
}
componentDidUpdate() {
  doSomething();
}
      </pre>
    </td>
    <td>
      <pre lang="javascript">
const doSomething = () => {};
useEffect(() => {
  doSomething();
});
      </pre>
    </td>
  </tr>
  <tr>
    <td>
      <pre lang="javascript">
state = { count: 0 };
componentDidMount() {
  document.title = `clicked Count${this.state.count} times`;
}
componentDidUpdate(prevProps, prevState) {
  if (prevState.count !== this.state.count) {
    document.title = `clicked Count${this.state.count} times`;
  }
}
      </pre>
    </td>
    <td>
      <pre lang="javascript">
const [count, setCount] = useState(0);
useEffect(() => {
  document.title = `clicked Count${this.state.count} times`;
}, [count]); // Phải thêm [count] chỉ thực hiện set title nếu count trước và sau re-render thay đổi
      </pre>
    </td>
    <tr>
      <td>
        <pre lang="javascript">
componentDidMount() {
  API.setOnline();
}
componentWillUnmount() {
  API.setOffline();
}
        </pre>
      </td>
      <td>
        <pre lang="javascript">
useEffect(() => {
  API.setOnline();
  return () => API.setOffline();
}, []); // [] để ko bị gọi API liên tục khi re-render
        </pre>
      </td>
    </tr>
    <tr>
      <td>
        <pre lang="javascript">
state = { girlId: '001' }
componentDidMount() {
  API.sayILoveThisGirl(this.state.girlId);
}
componentDidUpdate(prevProps, prevState) {
  if (prevState.girlId !== this.state.girlId) {
    API.sayILoveThisGirl(this.state.girlId);
  }
}
componentWillUnmount() {
  API.sayGoodByMyLove(this.state.girlId);
}
        </pre>
      </td>
      <td>
        <pre lang="javascript">
const [girlId, setGirlId] = useState('001');
useEffect(() => {
  API.sayILoveThisGirl(girlId);
  return API.sayGoodByMyLove(girlId);
}, [girlId]);// [girlId] để ko bị gọi API liên tục nếu girlId trước và sau re-render không thay đổi
        </pre>
      </td>
    </tr>
  </tr>
</table>
