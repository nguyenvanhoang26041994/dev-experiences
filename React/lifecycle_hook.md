### ♳ TỔNG QUAN
- *Từ phiên bản 16.3 trở đi, React đã có lifecycle mới tuy nhiên vẫn hỗ trợ life cycle cũ. Từ phiên bản 17 thì lifecycle cũ không được hỗ trợ nữa nên ở bài này chỉ để cập đến lifecyle hook mới của React.*
- *Ở lifecycle cũ phát sinh nhiều vấn đề nhất là naming của lifecycle hook, gây hiểu nhầm!*
- *Người ta thường dùng `constructor` `componentWillMount` `comonentWillReceiveProps` để init `state` dựa trên `props`, Vì vậy nhiều khi gây duplicate code. Đó là lý do mà `getDerivedStateFromProps` sinh ra để xoá sự khó hiểu và lằng nhằng đó đi.*
- *Hoặc bạn muốn get thông tin nào đó của các ref trước khi render chẳng hạn, và sử dụng nó sau khi nó sau khi render lại. Đó là lý do mà `getSnapshotBeforeUpdate` ra đời để thay thế `componentWillUpdate`, và `componentDidUpdate` có thêm một param mới là snapshoot.*

**☞ Tóm lại lifecycle mới sẽ có dạng tóm tắt như sau:**
- *Mounting: `constructor` → `getDerivedStateFromProps` → `render` → `componentDidMount`.*
- *Updating: `getDerivedStateFromProps` → `shouldComponentUpdate` → `render` → `getSnapshootBeforeUpdate` → `componentDidUpdate`.*
- *Unmouting: `componentWillUnmount`.*
----
### ♴ NỘI DUNG
**☞ Mounting(Sinh ra)**

**♳`contructor(props): void`**
> *Ở ES6 thì thường dùng để tạo init `state`, bind context(`this`) cho các function, event handling, createRef().*<br/>
Ví dụ:
```
class DemoComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({});
  }

  render() {
    return (
      <button onClick={this.handleClick}>Click</button>
    );
  }
}
``` 
**♴`static getDerivedStateFromProps(props, state): object`**
- *Trước đây, với lifecycle cũ, người ta thường tính toán state thông qua props trong hàm `constructor`. Và khi components update `props` thì dùng kèm với `componentWillReceiveProps` để set lại `state`. Hook này sinh ra để thay thế việc này.*
- *Return về một object chính là `state`. Và khi components update props thì dùng kèm với `componentWillReceiveProps` để set lại `state`. Ví dụ với lifecycle cũ:*
```
class DemoComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: `${props.lastName} ${props.firstName}`,
    };
  }

  componentWillReceiveProps(nextProps, state) {
    this.setState({ fullName: `${nextProps.lastName} ${nextProps.firstName}` });
  }
  ...
}

// hoặc 

class DemoComponent extends React.Component {
  componentWillMount() {}
    this.setState({ fullName: `${this.props.lastName} ${this.props.firstName}` });
  }

  componentWillReceiveProps(nextProps, state) {
    this.setState({ fullName: `${nextProps.lastName} ${nextProps.firstName}` });
  }
  ...
}
```   
> `=> Cực. Hãy chuyển sang lifecycle mới, nó sẽ trông như thế nào?. Như này:`
```
class DemoComponent extends React.Component {
  state = {};
  static getDerivedStateFromProps(props, state) {
    return {
      fullName: `${props.lastName} ${props.firstName}`,
    };
  }
  ...
}
```
**♵`render(): ReactNode`**
**♶`componentDidMount(prevProps, prevState): void`**
- *Lúc này đã render lần đầu, lúc này thích hợp để tương tác với Tree Node.*
 
**☞ Updating(Lớn lên)**

**♳`static getDerivedStateFromProps(nextProps, state): object`**
- *Khi props hoặc state thay đổi thì hook này được gọi(Từ phiên bản 16.4 trở đi thì state hay props thay đổi thì hook này được gọi).*
**♴`shouldComponentUpdate(nextProps, nextState): boolean`**
- *Khi props hoặc state thay đổi thì hook này được gọi.*
- *Với PureComponent thì dev không thể định nghĩa lại. Mặc định là shallow compare.*
- *Với Component thì dev có thể định nghĩa lại để chống render không cần thiết. Mặc định là reference compare.*
- *Nếu xác định component này chỉ render 1 lần thì return false, chống render(Đối với Component).*
- *Nếu return false thì sẽ không tới hook re-render tiếp theo. Note: Để thấy được sự khác nhau giữa `React.PureComponent` và `React.Component`, hãy vào link dưới:<br/>
[Có bao nhiêu kiểu Component React](https://github.com/nguyenvanhoang26041994/dev-experiences/blob/master/React/how_many_component_types.md)<br/>
[Component vs PureComponent](https://github.com/nguyenvanhoang26041994/dev-experiences/blob/master/React/component_vs_purecomponent.md)*.
  
**♵`render(): ReactNode`
**♶`getSnapshootBeforeUpdate(prevProps, prevState): object`**
- *Thường thì get một số thông tin của `props`, `state`, hoặc ref trước khi re-render, và sử dụng nó sau khi render.*
**♷`componentDidUpdate(prevProps, prevState, snapshoot): void`**
- *Lúc này đã re-render, thích hợp để tương tác với Tree Node.*
- *Với lifecycle mới thì có thêm param snapshoot, `snapshoot` là output của `getSnapshootBeforeUpdate` hook.*
  
**☞ Unmounting(Chết đi)**

**♳`componentWillUnmount: void`**
- *Thường thì chạy một function nào đó, ví dụ như clear interval, delete rác. Ít khi sử dụng.*
- *Không nên `setState` tại đây, Vì nó chết rồi không sống lại nữa.*
----
### ♵ CHIA SẼ THÊM
- *Hiện tại là phiên bản 16.4.1 Lifecycle hook khá nhiều vì phải hỗ trợ cả hai. Khuyến khích nên sử dụng lifecycle mới.
    [https://reactjs.org/docs/react-component.html](https://reactjs.org/docs/react-component.html)*
 
- Khuyến khích sử dụng coding standar của airbnb cho React.
    [https://github.com/airbnb/javascript/tree/master/react](https://github.com/airbnb/javascript/tree/master/react)
 
- Khuyến khích sử dụng class ES7 thay thế cho ES6 để tránh việc bind this, init `state`, `propTypes`, `defaultPropTypes`,
   `createRef()`
   
<br/>

> Tác giả: *[Nguyễn Văn Hoàng](https://www.facebook.com/nvh26041994)*
