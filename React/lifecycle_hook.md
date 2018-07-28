### _♳ TỔNG QUAN_
- _Từ phiên bản 16.3 trở đi, React đã có lifecycle mới tuy nhiên vẫn hỗ trợ life cycle cũ. Từ phiên bản 17 thì lifecycle cũ không được hỗ trợ nữa nên ở bài này chỉ để cập đến lifecyle hook mới của React._
- _Ở lifecycle cũ phát sinh nhiều vấn đề nhất là naming của lifecycle hook, gây hiểu nhầm!._
- _Người ta thường dùng `constructor` `componentWillMount` `comonentWillReceiveProps` để init `state` dựa trên `props`, Vì vậy nhiều khi gây duplicate code. Đó là lý do mà `getDerivedStateFromProps` sinh ra để xoá sự khó hiểu và lằng nhằng đó đi._
- _Hoặc bạn muốn get thông tin nào đó của các ref trước khi render chẳng hạn, và sử dụng nó sau khi nó sau khi render lại. Đó là lý do mà `getSnapshotBeforeUpdate` ra đời để thay thế `componentWillUpdate`, và `componentDidUpdate` có thêm một param mới là snapshoot._

**_☞ Tóm lại lifecycle mới sẽ có dạng tóm tắt như sau:_**
- _**Mounting**: `constructor` → `getDerivedStateFromProps` → `render` → `componentDidMount`._
- _**Updating**: `getDerivedStateFromProps` → `shouldComponentUpdate` → `render` → `getSnapshootBeforeUpdate` → `componentDidUpdate`._
- _**Unmouting**: `componentWillUnmount`._
### _♴ NỘI DUNG_
**_☞ Mounting(Sinh ra)_**

**:one: _`contructor(props): void`_**
> _Ở ES6 thì thường dùng để tạo init `state`, bind context(`this`) cho các function, event handling, createRef()._  
  
_Ví dụ:_
```javascript
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
**:two: _`static getDerivedStateFromProps(props, state): object`_**
- _Trước đây, với lifecycle cũ, người ta thường tính toán `state` thông qua `props` trong hàm `constructor`. Và khi components update `props` thì dùng kèm với `componentWillReceiveProps` để set lại `state`. Hook này sinh ra để thay thế việc này._
- _Return về một object chính là `state`. Và khi components update `props` thì dùng kèm với `componentWillReceiveProps` để set lại `state`. Ví dụ với lifecycle cũ:_
```javascript
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
```javascript
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
**:three: _`render(): ReactNode`_**  
**:four: _`componentDidMount(prevProps, prevState): void`_**
- _Lúc này đã render lần đầu, lúc này thích hợp để tương tác với Tree Node._  
  
**_☞ Updating(Lớn lên)_**  
**:one: _`static getDerivedStateFromProps(nextProps, state): object`_**
- _Khi props hoặc state thay đổi thì hook này được gọi._  
> _Ở phiên bản 16.3.x `state` thay đổi thì hook này không được gọi)_
  
**:two: _`shouldComponentUpdate(nextProps, nextState): boolean`_**
- _Khi `props` hoặc `state` thay đổi thì hook này được gọi._
- _Với `React.PureComponent` thì dev không thể override. Mặc định là shallow compare._
- _Với `React.Component` thì dev có thể override để chống render không cần thiết. Mặc định là reference compare._
- _Nếu xác định component này chỉ render 1 lần thì return false, chống render(Đối với `React.Component`)._
- _Nếu return false thì sẽ không tới hook re-render tiếp theo. Note: Để thấy được sự khác nhau giữa `React.PureComponent` và `React.Component`, hãy vào link dưới:  
[Có bao nhiêu kiểu Component React](https://github.com/nguyenvanhoang26041994/dev-experiences/blob/master/React/how_many_component_types.md)  
[Component vs PureComponent](https://github.com/nguyenvanhoang26041994/dev-experiences/blob/master/React/component_vs_purecomponent.md)._  
  
**:three: _`render(): ReactNode`_**  
**:four: _`getSnapshootBeforeUpdate(prevProps, prevState): object`_**
- _Thường thì get một số thông tin của `props`, `state`, hoặc ref trước khi re-render, và sử dụng nó sau khi render._

**:five: _`componentDidUpdate(prevProps, prevState, snapshoot): void`_**
- _Lúc này đã re-render, thích hợp để tương tác với Tree Node._
- _Với lifecycle mới thì có thêm param snapshoot, `snapshoot` là output của `getSnapshootBeforeUpdate` hook._  
  
**_☞ Unmounting(Chết đi)_**  
**:one: _`componentWillUnmount: void`_**
- _Thường thì chạy một function nào đó, ví dụ như clear interval, delete rác. Ít khi sử dụng._
- _Không nên `setState` tại đây, Vì nó chết rồi không sống lại nữa._  
  
### _♵ CHIA SẼ THÊM_
- _Hiện tại là phiên bản 16.4.1 Lifecycle hook khá nhiều vì phải hỗ trợ cả hai. Khuyến khích nên sử dụng lifecycle mới.  
[https://reactjs.org/docs/react-component.html](https://reactjs.org/docs/react-component.html)_
 
- _Khuyến khích sử dụng coding standar của airbnb cho React_  
[https://github.com/airbnb/javascript/tree/master/react](https://github.com/airbnb/javascript/tree/master/react)
 
- _Khuyến khích sử dụng class ES7 thay thế cho ES6 để tránh việc bind this, init `state`, `propTypes`, `defaultPropTypes`,
   `createRef()`._  
  
> _Tác giả: [Nguyễn Văn Hoàng](https://www.facebook.com/nvh26041994)_
