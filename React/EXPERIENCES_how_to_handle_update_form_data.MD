Hi guys. Đây là bài chia sẽ kinh nghiệm của mình để handle một update form data.

#Bài toán:
  - Bạn có một form dùng để update thông tin cá nhân
  - Khi bạn vào form update khi nó phải tải dữ liệu củ (Dữ liệu cũ thì tên tôi là `Nguyễn Văn Hoàng`)
  - Update thành công thì form cũng phải thanh đổi đúng.

=> Ý tưởng: Mình thay đổi những gì đã có trên input rồi POST là xong.
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
Những ngặt nỗi, Mỗi khi componentDidUpdate(Thằng cha render lại prop `detail`) thì value của input không được update vì defaulValue chỉ init 1 lần cho thôi. => Chuyển sang sử dụng controller component.

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
  
Vấn đề đã được giải quyết nhưng prop `detail.name` là của thằng cha passing vào nên muốn input mình thay đổi thì this.handleChange phải thay đổi được `detail.name`. Nếu `detail.name` là state của thằng cha code cũng khó đọc rồi, chưa để nếu `detail.name` là từ thàng cha của thằng cha ông nội nữa thì chắc nhức não luôn, Và đăc biệt. Vì case ở đây là update form data nên có thể `detail.name` được lấy từ store state của redux. Chả nhẽ chỉ để handle controller component bạn luôn luôn change redux store state khi bạn gõ bất cứ thứ gì vào input sao?. Vậy thì quá nguy hiểm.
```javascript
import React from 'react';

class Child extends React.Component {
  state = {
    detail: {
      name: '',
    },
  };

  componentDidMount() {
    this.setState({ detail: this.props.detail });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.detail !== this.props.detail) {
      this.setState({ detail: nextProps.detail });
    }
  }
  
  changeChildValue = name => this.setState({ detail: { name } });

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
          value={name || this.props.detail.name}
          onChange={e => this.changeChildValue(e.target.value)}
        />
        <button
          style={{
            margin: '20px',
            outline: 'none',
            border: '1px solid black',
            borderRadius: '5px',
          }}
          onClick={() => this.props.onChangeStateParent('Nguyễn Văn Minh')}
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
          onClick={() => this.props.onChangeStateParent('Nguyễn Văn Thắng')}
        >
          Tôi là Nguyễn Văn Thắng
        </button>
      </div>
    );
  }
}


export default class Parent extends React.PureComponent {
  state = { name: 'Nguyễn Văn Hoàng' };

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
