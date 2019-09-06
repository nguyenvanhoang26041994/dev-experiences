# TỔNG QUAN
_Bài này sẽ nói cụ thể và demo cụ thể sự khác nhau giữa hai thằng `React.Component` và `React.PureComponent`.
Chắc không ít bạn cũng đã từng bị phỏng vấn câu này rồi, nhưng không ít bạn trả lời theo kiểu lý thuyết.
OK mình sẽ giúp các bạn hiểu sâu hơn một chút._  
#### **_☞ Tóm lại thì 2 thằng này khác nhau ở một số điểm sau:_**
- _`React.Component` cho phép dev override lại `shouldComponentUpdate` hook, mặc định hook này reference compare để quyết định re-render lại hay không._
- _`React.PureComponent` không cho phép dev override lại `shouldComponentUpdate` hook, nếu bạn cố tình override thì bạn sẽ ăn ngay warning. Hook này shallow compare để quyết định re-render lại hay không._
- _Đôi khi nếu thấy `React.Component` render chậm, hãy thử set `shouldComponentUpdate` hook return true hoặc return false._
```javascript
class Demo extends React.Component {
  ...
  shouldComponentUpdate() {
    return true; // props|state thay đổi thì re-render luôn. Không cần compare nữa!
    // return false; // Sẽ chặn không bao giờ cho Component re-render. Render HTML tĩnh.
  }
  ...
}
```
# NỘI DUNG
_Để mình lấy một ví dụ đơn giản nhất, trước khi đọc bài này có lẽ bạn nên đọc một chút về [React 16.4.1 Lifecycle hook update](https://github.com/nguyenvanhoang26041994/dev-experiences/blob/master/React/lifecycle_hook)_  

**_☞ Step 1:_**
```javascript
class Demo extends React.Component {
  state = { myName: 'Hoang' };

  componentDidMount() {
    this.setState({ myName: 'Hoang' });
  }

  componentDidUpdate() {
    console.log(`Component này đã render lại với state.myName: ${this.state.myName}`);
  }

  render() {
    return (
      <span>My name is {this.state.myName}</span>
    );
  }
}
```
_Kết quả là ở màn hình console sẽ thấy dòng chữ `Component này đã render lại với state.myName: Hoang`. Rõ ràng thì trước và sau render lại thì myName vẫn là `Hoang` mà đúng không?. Tại sao phải re-render nữa làm gì cho tốn công?. Lý do nó render lại là do mặc đinh `shouldComponentUpdate` reference compare. Okay, để tránh việc render không cần thiết này, mình sẽ override lại `shouldComponentUpdate` hook._  
  
**_☞ Step 2:_**
```javascript
class Demo extends React.Component {
  state = { myName: 'Hoang' };

  componentDidMount() {
    this.setState({ myName: 'Hoang' });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.myName !== this.state.myName
  }

  componentDidUpdate() {
    console.log(`Component này đã render lại với state.myName: ${this.state.myName}`);
  }

  render() {
    return (
      <span>My name is {this.state.myName}</span>
    );
  }
}
```
_Okay!, lần này nó đã không re-render lại nữa rồi. Nhưng, nhưng mà chả nhẽ có bao nhiêu `state`, bao nhiêu `props` thì mình phải so sánh cho hết ư? Thế thì code chán lắm. hãy để `React.PureComponent` giải quyết một cách ngắn gọn._  
  
**_☞ Step 3:_**
```javascript
class Demo extends React.PureComponent {
  state = { myName: 'Hoang' };

  componentDidMount() {
    this.setState({ myName: 'Hoang' });
  }

  componentDidUpdate() {
    console.log(`Component này đã render lại với state.myName: ${this.state.myName}`);
  }

  render() {
    return (
      <span>My name is {this.state.myName}</span>
    );
  }
}
```
_Thế là xong!, đơn giản!. Vậy là đã tránh re-render không cần thiết ở mức độ shallow level. Tuy nhiên, Vì javascript là dynamic type nên bạn không biết props ở runtime là kiểu gì. Nên `React.PureComponent` vẫn compare cả những `props` mình không cần quan tâm đến, khiến render vô tội vạ. Ví dụ ở nơi nào đó sử dụng Component Demo như sau:_  
  
**_☞ Step 4:_**
```javascript
class WrapperComponent extends React.Component {
  state = { something: 'something' };

  componentDidMount() {
    this.setState({ something: 'something change' });
  }

  render() {
    return (
      <Demo something={this.state.something} /> // Demo là PureComponent như trên nhé
    );
  }
}
```
_Lúc nãy thì dòng `Component này đã render lại với state.myName: Hoang` sẽ xuất hiện ở màn hình console. Đây là một trong những nhược điểm của `React.PureComponent`. Lúc này `React.Component` sẽ là thích hợp hơn vì nó flexible, tuỳ dev._
  
# CHIA SẺ THÊM
_Hồi xưa cũng toàn dùng `React.Component` thôi chứ chả dùng `Functional Component` hay `React.PureComponent` đâu. Từ khi bật source code một số thư viện thì thấy `PureComponent` và `Functional Component` dùng nhiều nên cũng đặt câu hỏi tại sao họ code vậy? Trên đây hoàn toàn là từ kinh nghiệm cá nhân, có thể sai hoặc thiếu sót. Mong các bạn góp ý qua cho mình. Thanks!_  
  
_Tác giả: [Nguyễn Văn Hoàng](https://www.facebook.com/nvh26041994)_
