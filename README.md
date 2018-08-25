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
```javascript
/* eslint-disable prettier/prettier */
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
```javascript
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
    this.jQueryLove
      .fadeOut(500)
      .fadeIn(500);
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
            <Love key={love.key} content={love.content} color={love.key} /> // render className="love"
          ))}
        </div>
      </DemoWrapper>
    );
  }
}
```

Hãy chú ý đến đoạn code này
```javascript
componentDidMount() {
  this.jQueryLove = $('.love');
  this.jQueryLove
    .fadeOut(500)
    .fadeIn(500);
}
```

Vì jQuey tương tác với `Real DOM` nên bạn phải sử dụng trong hook `componentDidMount` của React. Nghĩa là phải render ra DOM thật đã thì jQuery mới tương tác được. Đó là lý do bạn thấy hiệu ứng fade của jQuery khi load xong trang.
 
Bãn hãy thử check vào bất kỳ checkbox nào để thêm màu vào danh sách màu. Và tất nhiên sẽ không có bất kì hiệu ứng fade của jQuery nào xảy ra. Rõ ràng mình đã $('.love') rồi cơ mà. Nghĩa là bất kì element nào có class="love" sẽ nhận được hiệu ứng mà?. Đó là vì dòng jQuery đó chỉ chạy 1 lần lúc `componentDidMout` thôi, mỗi lần bạn render lại thì nó không vào `componentDidMout` nữa mà nó sẽ vào `componentDidUpdate`. Vì vậy bạn phải đặt thêm code jQuery vào `componentDidUpdate` nữa.
 
Bạn vào file `components/DemoBoxWithJQuery/index` và bật componentDidUpdate lên cho mình với nhé.

```javascript
componentDidUpdate() {
  this.jQueryLove
    .fadeOut(500)
    .fadeIn(500);
  console.log('this.jQueryLove vs $(.love)', this.jQueryLove === $('.love'));
  console.log('this.jQueryLove.length vs $(.love).length', this.jQueryLove.length, $('.love').length);
  console.log('----------------------------------------------------------');
}
```

Truy cập lại link http://localhost:3000/why-should-not-use-jquery-with-react/react-jquery
 
Bạn hãy check vào bất kì checkbox nào để thêm màu. Thì bạn sẽ nhận ra BUG to chà bá xảy ra là chỉ có 2 màu `xanh` và `vàng` có hiệu ứng. Còn những màu khác vừa thêm sẽ không có hiệu ứng. Rõ ràng tất cả các màu đều có `<div class="love">` nhưng sao chỉ có 2 màu đầu có hiệu ứng nhỉ. Lý do là khi `componentDidMount` thì jQuery chỉ get được 2 Node Element trong RealDOM thôi, còn khi React re-render thì đã update lại `Real DOM` tức là thêm những Node Element, tuy có cùng `class="love"` những jQuery cần phải get lại từ đầu mới get được `Real DOM` mới nhất được. Đó là lý do performance rất kém, rất rất kèm.
 
Nếu bạn code jQuery đặt ở global cũng vô ích thôi, vì nó chỉ get được `Real DOM` sau khi ứng dụng React render lần đầu.
 
OK!, Bạn đã hiểu vì sao không nên hoặc tuyệt đối không dùng jQuery trong React rồi đấy!. Tuy nhiên nếu bạn là người "BẢO THỦ" hoặc "NGHỊCH NGỢM" thì bạn có thể đọc tiếp để fix đống shit này!.

#### Cách fix khi sử dụng jQuery(Có nhiều cách fix nhưng mình chỉ cách fix đúng nhất ở đây, nếu bạn xem nhưng cách fix khác thì bạn có thể thây code ở component)
Bạn truy cập link http://localhost:3000/why-should-not-use-jquery-with-react/react-jquery-fix-3
 
Lúc này bạn sẽ thấy tất cả mọi thứ đều OK.

```javascript
// DemoBoxWithJQueryFix3/index.js
/* eslint-disable prettier/prettier */
import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { Checkbox } from 'antd';
import Love from 'components/Love3';

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

```javascript
// Love3/index.js
/* eslint-disable prettier/prettier, no-undef */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const LoveWrapper = styled.div`
  display: flex;
  margin: 4px 0;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: 500;
  padding: 30px 15px;
  border-radius: 8px;
  background-color: ${props => props.color};
`;

class Love extends React.PureComponent {
  that = React.createRef();

  componentDidMount() {
    console.log(this.that.current);
    $(this.that.current).fadeOut(500).fadeIn(500);
  }
  render() {
    const { color, content } = this.props;
    return (
      <div ref={this.that}>
        <LoveWrapper className="love" color={color}>
          {content}
        </LoveWrapper>
      </div>
    );
  }
};

Love.propTypes = {
  content: PropTypes.string,
  color: PropTypes.string,
};

export default Love;
```

Bạn hãy chú ý đến đoạn code
```javascript
class Love extends React.PureComponent {
  that = React.createRef();

  componentDidMount() {
    console.log(this.that.current);
    $(this.that.current).fadeOut(500).fadeIn(500);
  }
  render() {
    const { color, content } = this.props;
    return (
      <div ref={this.that}>
        <LoveWrapper className="love" color={color}>
          {content}
        </LoveWrapper>
      </div>
    );
  }
};
```

Thì mình một div bọc lại và truyền `ref` cho nó. Mục đích là mình muốn lấy Node Element của nó để truyền vào jQuery(`ref` là một kỹ thuật thường dùng để tạo ra các `uncontroller component`). Vì vậy khi component mới sinh ra thì jQuery sẽ chạy đoạn hiệu ứng. Mọi thứ đã OK.
 



Thank you!