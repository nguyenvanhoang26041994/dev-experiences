Đây là bài chia sẽ kinh nghiệm của mình để handle một update form data.

#Bài toán:
  - Bạn có một form dùng để update thông tin cá nhân
  - Khi bạn vào form update khi nó phải tải dữ liệu củ (Dữ liệu cũ thì tên tôi là `Nguyễn Văn Hoàng`)
  - Update thành công thì form cũng phải thanh đổi đúng.

=> Ý tưởng: 
- Render form update. Phải render trước để thấy cái form chứ không để fetch xong mới đổ render form.
- Fetch data rồi đổ vào redux store state.
- Re-render form update(state thay đổi thì form tự re-render)
- Thay đổi dữ liệu
- Submit form.

#Vấn đề xảy ra với uncontroller component
Để dử dụng uncontroller thì chúng ta luôn luôn có code
  ```javascript
  <input
    style={{
      width: '100%',
      outline: 'none',
      height: '50px',
      border: '1px solid black',
      borderRadius: '5px',
    }}
    defaultValue={this.props.detail.name}
    ref={node => this.inputRef = node}
  />
  ```
- Render lần đầu sẽ không có dữ liệu gì hết.
- Sau khi fetch dữ liệu xong => thay đổi redux store state. => re-render Update Form
- Bạn hãy yên tâm vì sau khi re-render lần thứ 2 hoặc n lần đi nưã cũng không thấy dữ liệu vì mình sử dụng defaultValue chỉ chạy 1 lần lúc render lần đầu thôi. 

=> Chuyển sang controller component

#Vấn đề xảy ra với controller component
  ```javascript
  <input
    style={{
      width: '100%',
      outline: 'none',
      height: '50px',
      border: '1px solid black',
      borderRadius: '5px',
    }}
    value={this.props.detail.name}
    onChange={this.handleChange}
  />
  ```
- Render lần đầu không thấy dữ liệu
- Sau khi fetch xong => thay đổi store state => re-render Update Form
- Bạn hãy yên tâm thực sự đi vì sau khi render dữ liệu luôn luôn mapping với redux store state.
- Những vấn đề bạn thực sự ở đây là bạn không thể edit cái input của mình được nếu bạn không thay đổi store state bằng cái `this.handleChange` kia. Nếu bạn muốn edit value của input được thì bặt buộc this.handleChange phải thay đổi được store state chứa `detail.name` kia đi. Nói đi cũng phải nói lại, để mà handle cái edit này mà lúc nào cũng update store state thì đúng cực hơn dev backend code css.

=> Ý tưởng của mình đưa ra là:
- Lưu trữ đồng thời dữ liệu detail trên cả redux store và component state.
- redux store chỉ chứa dữ liệu chính xác so với API trả về.
- component state sẽ chứa thông tin mà người dùng edit. Chỉ khi nào redux store update thì mới mapping component state = redux store lại từ đầu => Dùng để khi POST thành công redux store thay đổi thì state cũng thay đổi y hệt hay nói cách khác là UPDATE xong cho phép re-edit.

LƯU Ý: Với lifecycle mới thì chưa tìm được cách nào. Cách này chỉ áp dụng với lifecycle cũ.
=> Thấy lifecycle mới nó đỡ code lặp hơn nhưng có vẻ nó không linh hoạt lắm. Nghe nói lên v17 vứt hẳn luôn thì sống sao?.

Tuy nhiên mình biết còn nhiều cách khác nhưng đây là cách duy nhất mình nghĩ ra. Cách này là sử dụng controller component, Cách hay nhấy vẫn là sử dụng uncontroller vì tốt về performace.

```javascript
// Cach su dung uncontroller
import React from 'react';

class Child extends React.Component { // Giả sử đây là cái Form Update
  state = {
    detail: {
      name: '',
    },
  };

  componentDidMount() {
    this.setState({ detail: this.props.detail }); // Render lần đầu
  }

  componentWillReceiveProps(nextProps) { // Mỗi khi redux store có chứa sate liên quan thay đổi thì state lại thay đổi theo.
    if (nextProps.detail !== this.props.detail) {
      this.setState({ detail: nextProps.detail });
    }
  }
  
  changeChildValue = name => this.setState({ detail: { name } }); // thằng này chứa dữ liệu edit.

  render() {
    const { name } = this.state.detail;
    return (
      <div style={{
        display: 'flex',
        flexFlow: 'column nowrap',
      }}>
        <input
          style={{
            width: '100%',
            outline: 'none',
            height: '50px',
            border: '1px solid black',
            borderRadius: '5px',
          }}
          value={name || this.props.detail.name} // Khi xoá hết thì quay về dư liệu trước khi edit.
          onChange={e => this.changeChildValue(e.target.value)}
        />
        <button
          style={{
            margin: '20px',
            outline: 'none',
            border: '1px solid black',
            borderRadius: '5px',
          }}
          onClick={() => this.props.onChangeStateParent('Nguyễn Văn Minh')} // Giả dử đây là API Update với name thay đổi là Nguyễn Văn Minh
        >
          Tôi là Nguyễn Văn Minh
        </button>
        <button
          style={{
            margin: '20px',
            outline: 'none',
            border: '1px solid black',
            borderRadius: '5px',
          }}
          onClick={() => this.props.onChangeStateParent('Nguyễn Văn Thắng')} // Giả dử đây là API Update với name thay đổi là Nguyễn Văn Thắng
        >
          Tôi là Nguyễn Văn Thắng
        </button>
      </div>
    );
  }
}


export default class Parent extends React.PureComponent { // Giả sử đây là thằng Redux store chứa state.
  state = { name: '' };

  componentDidMount() {
    this.setState({ name: 'Nguyễn Văn Hoàng' }); // Giả dử lifecycle này là sau khi fetch API xong rôi đổ dữ liệu vào redux store
  }

  changeValue = name => this.setState({ name });

  render() {
    return (
      <h1>
        <div>
          <Child
            detail={{ name: this.state.name }}
            onChangeStateParent={this.changeValue}
          />
        </div>
      </h1>
    );
  }
}

```

```javascript
import React from 'react';

class Child extends React.Component { // Giả sử đây là cái Form Update
  // state = {
  //   detail: {
  //     name: '',
  //   },
  // };

  // componentDidMount() {
  //   this.setState({ detail: this.props.detail }); // Render lần đầu
  // }

  // componentWillReceiveProps(nextProps) { // Mỗi khi redux store có chứa sate liên quan thay đổi thì state lại thay đổi theo.
  //   if (nextProps.detail !== this.props.detail) {
  //     this.setState({ detail: nextProps.detail });
  //   }
  // }
  
  // changeChildValue = name => this.setState({ detail: { name } }); // thằng này chứa dữ liệu edit.
  inputRef = React.createRef();

  render() {
    // const { name } = this.props.detail;
    return (
      <div style={{
        display: 'flex',
        flexFlow: 'column nowrap',
      }}>
        <input
          style={{
            width: '100%',
            outline: 'none',
            height: '50px',
            border: '1px solid black',
            borderRadius: '5px',
          }}
          ref={this.inputRef}
          defaultValue={this.props.detail.name}
        />
        <button
          style={{
            margin: '20px',
            outline: 'none',
            border: '1px solid black',
            borderRadius: '5px',
          }}
          onClick={() => this.props.onChangeStateParent('Nguyễn Văn Minh')} // Giả dử đây là API Update với name thay đổi là Nguyễn Văn Minh
        >
          Tôi là Nguyễn Văn Minh
        </button>
        <button
          style={{
            margin: '20px',
            outline: 'none',
            border: '1px solid black',
            borderRadius: '5px',
          }}
          onClick={() => this.props.onChangeStateParent('Nguyễn Văn Thắng')} // Giả dử đây là API Update với name thay đổi là Nguyễn Văn Thắng
        >
          Tôi là Nguyễn Văn Thắng
        </button>
      </div>
    );
  }
}


export default class Parent extends React.PureComponent { // Giả sử đây là thằng Redux store chứa state.
  state = { name: '', isFetching: true };

  componentDidMount() {
    setTimeout(() => this.setState({ name: 'Nguyễn Văn Hoàng', isFetching: false }), 2000)
  }

  changeValue = name => setTimeout(() => this.setState({ isFetching: true }, () => this.setState({ name, isFetching: false })), 2000)

  render() {
    return (
      <h1>
        <div>
          {this.state.isFetching
            ? <div>Loading...</div>
            : <Child
                detail={{ name: this.state.name }}
                onChangeStateParent={this.changeValue}
              />
          }
        </div>
      </h1>
    );
  }
}

```
