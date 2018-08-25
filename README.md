_Mọi chuyện đều có khởi đầu, không ai biết ngay từ đầu. Trước kia bản thân mình có một thời gian ngắn sử dụng jQuery để xây dựng các ứng dụng web. Rồi Angular ra đời, React ra đời, tuổi trẻ hừng hức háo hức với bất kì mới những thứ công nghệ mới mẻ. Có học thử Angular 1 cơ mà thấy cách đổ dữ liệu quá sida nên chuyển ngay qua React và mê mẩn bợi sự tiện dụng của React. Cũng như các newbie khác. Khi code React thì chỉ tập trung vào đổ dữ liệu, logic chứ không biết có nhiều thư viện React làm trang web lung linh. Và đây, là lý do mình sử dụng jQuery trong React nhằm tạo những hiệu ứng đẹp đẻ mà jQuery đã từng rất nổi tiếng với nó. Và từ đó, bug bay lung tung bay lên không trung!._
 
#### Tóm lại thì lý do không nên dùng jQuery trong ReactJS bởi vì:
- React tương tác với `Vitural DOM` còn jQuery tương tác với `Real DOM` nên có nhiều bug sinh ra.
- Có nhiều thư viện dành riêng cho React có thể thay thế thậm chí useful hơn jQuery.
 
#### Với tiêu chí là live demo, thực tế, các bạn hãy clone source bài viết mình về máy:
- `git clone https://github.com/nguyenvanhoang26041994/dev-experiences.git`
- `cd dev-experiences`
- `git checkout why-should-not-use-jquery-with-react`
- `npm i`
- `npm start`
- Truy cập vào link http://localhost:3000/why-should-not-use-jquery-with-react/react

#### Sử dụng React bình thường
Truy cập vào link http://localhost:3000/why-should-not-use-jquery-with-react/react
 
![alt text](https://github.com/nguyenvanhoang26041994/dev-experiences/blob/why-should-not-use-jquery-with-react/images/react.png) 
Khi nhấn vào các checkbox tương ứng thì có các màu được thêm vào danh sách màu. Rất simple.
```
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
```
#### Sử dụng jQuery trong React
Truy cập vào link http://localhost:3000/why-should-not-use-jquery-with-react/react-jquery
