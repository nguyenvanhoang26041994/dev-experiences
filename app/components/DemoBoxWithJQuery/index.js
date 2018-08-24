/* eslint-disable prettier/prettier, no-undef */
import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { Checkbox } from 'antd';
import Love from 'components/Love';

const DemoWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 500px;
  margin: 0 auto;
`;

export default class Demo extends React.PureComponent {
  state = {
    loves: [],
  };

  jQueryLove = null;

  componentDidMount() {
    this.jQueryLove = $('.love');
    setInterval(() => {
      this.jQueryLove
        .fadeOut(500)
        .fadeIn(500);
    }, 2000);
  }

  // componentDidUpdate() {
  //   this.jQueryLove
  //     .fadeOut(500)
  //     .fadeIn(500);
  //   console.log('this.jQueryLove vs $(.love)', this.jQueryLove === $('.love'));
  //   console.log('this.jQueryLove.length vs $(.love).length', this.jQueryLove.length, $('.love').length);
  //   console.log('----------------------------------------------------------');
  // }

  onAddLove = (love) => {
    this.setState(prevState => ({
      ...prevState,
      loves: [
        ...prevState.loves,
        love,
      ],
    }));
  };

  onRemoveLove = (key) => {
    this.setState(prevState => ({
      ...prevState,
      loves: _.filter(prevState.loves, item => {
        if (item.key === key) {
          return false
        }
        return true;
      }),
    }))
  };

  onChangeLove = (e, payload) => {
    if (e.target.checked) {
      return this.onAddLove(payload);
    }
    return this.onRemoveLove(payload.key)
  };

  render() {
    return (
      <DemoWrapper>
        <div className="what-you-love">
          <Checkbox onChange={(e) => this.onChangeLove(e, { key: 'red', content: 'Màu đỏ' })}>Đỏ</Checkbox>
          <Checkbox onChange={(e) => this.onChangeLove(e, { key: 'pink', content: 'Màu hồng' })}>Hồng</Checkbox>
          <Checkbox onChange={(e) => this.onChangeLove(e, { key: 'green', content: 'Màu lá' })}>Xanh lá</Checkbox>
          <Checkbox onChange={(e) => this.onChangeLove(e, { key: 'purple', content: 'Màu tím' })}>Tím</Checkbox>
        </div>
        <div className="list-loves">
          <Love key="yellow" content="Màu vàng" color="yellow" />
          <Love key="blue" content="Màu xanh" color="blue" />
          {this.state.loves.map(love => (
            <Love key={love.key} content={love.content} color={love.key} />
          ))}
        </div>
      </DemoWrapper>
    );
  }
}
