```javascript
import React from 'react';

class Child extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: {
        value: '',
      },
    };
  }

  componentDidMount() {
    this.setState({ input: this.props.input });
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.input !== this.props.input) {
      this.setState({ input: nextProps.input });
    }
  }
  
  changeChildValue = value => this.setState({ input: { value } });

  render() {
    const { value } = this.state.input;
    return (
      <div style={{
        display: 'flex',
        flexFlow: 'column nowrap',
      }}>
        <input
          style={{
            width: '100%',
            outline: 'none',
            border: '1px solid black',
            borderRadius: '5px',
          }}
          value={value || this.props.input.value}
          onChange={e => this.setState({ input: { value: e.target.value }})}
        />
        <button
          style={{
            margin: '20px',
            outline: 'none',
            border: '1px solid black',
            borderRadius: '5px',
          }}
          onClick={() => this.props.onChangeStateParent('onChangeStateParent')}
        >
          onChangeStateParent
        </button>
        <button
          style={{
            margin: '20px',
            outline: 'none',
            border: '1px solid black',
            borderRadius: '5px',
          }}
          onClick={() => this.props.onChangeStateParent('onChangeStateParent2')}
        >
          onChangeStateParent2
        </button>
      </div>
    );
  }
}


export default class Parent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { value: 'valueDefaultFromParent' };

    window.changeValue = this.changeValue;
  }

  changeValue = value => this.setState({ value });

  render() {
    return (
      <h1>
        <div>
          <Child
            input={{ value: this.state.value }}
            onChangeStateParent={(value) => this.setState({ value })}
          />
        </div>
      </h1>
    );
  }
}
```
