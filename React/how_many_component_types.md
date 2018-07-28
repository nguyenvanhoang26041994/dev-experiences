### ♳ TỔNG QUAN
**Hiện tại, React hỗ trợ 3 cách viết component đó là:**
> - *`Functional Component`*<br/>
> - *`React.Component`*<br/>
> - *`React.PureComponent`*<br/>

<br/>

**Bài viết này giúp các bạn hiểu rõ hơn về đặc điểm, cách sử dụng chúng trong dự án của mình cũng như một số thủ thuật ngắn gọn được tóm gọn như nhau:**
> - *Sử dụng `Functional Component` và `React.PureComponent` hết mức có thể, tránh lạm dụng `React.Component`.*<br/><br/>
> - *Các Component unit(những component base) thì nên sử dụng `React.PureComonent` để viết và props chỉ nên có một cấp(shallow) và nó không có `state` thì có thể sử dụng `Functional Component` cũng không sao. Vì chỉ cần thằng cha chống render tốt thì cũng không đến lượt mấy thằng con re-render.*<br/><br/>
> - *Các Component chỉ có props(hoặc chỉ render html tĩnh), không có `state`, những prop thường là truyền cứng, ít thay đổi
    thì dùng `Functional Component`.*<br/><br/>
> - *Các Component mà cần định nghĩa `shouldComponentUpdate` để chống render không cần thiết(tăng performance) thì sử dụng
    `React.Component`, nếu bạn không đụng đến `shouldComponentUpdate` thì không cần dùng. Đôi khi người ta return true hoặc
    false cho `shouldComponentUpdate` luôn để render cho nhanh. Cái này nói kỹ ở bài [Component vs PureComponent](https://github.com/nguyenvanhoang26041994/dev-experiences/blob/master/React/component_vs_purecomponent.md)*
----
### ♴ NỘI DUNG
**☞ Functional Component:**
- *Nó đơn giản chỉ là một function return về React Element mà thôi.*
- *Không implement [Lifecycle hook](https://github.com/nguyenvanhoang26041994/dev-experiences/blob/master/React/lifecycle_hook.md) nên nói về tốc độ render nó là nhanh nhất.*
- *Có 2 kiểu code functional. Ví dụ:*
```
// Cách 1:
function Demo(props) {
  return (
    <span>Hello world!</span>
  );
}

// Cách 2:
const Demo = props => <span>Hello world!</span>;
```

> *Rõ ràng thì arrow function khiến ta code lẹ hơn, gọn hơn. Tuy nhiên, bạn nên chọn một trong 2 cách để viết tránh trình trạng code không trong sạch, mỗi người mỗi kiểu. Trên ý kiến cá nhân thì mình khuyến khích normal hơn vì `normal function` đó sẽ có tên và có thể bind context(`this`), còn `arrow function` thì sẽ không có tên(anonymous). Tuỳ sở thích mỗi người. Tuy nhiên mình có nhớ airbnb recomment thằng `normal function`(chưa giải thích kỹ vì sao nên dùng), tuy nhiên mình chưa tìm lại được link, sẽ update sau.*

<br/>

**☞ React.Component**
  ☆ Để sử dụng bạn cần extends React.Component.
  ☆ Nó khác ở React.PureComponent một chổ duy nhất là shouldComponentUpdate.
  ☆ shouldComponentUpdate mặc định là references compare.
    Nghĩa là nếu nextProps === prevProps && nextState === prevState thì return false.
    return false thì sẽ không re-render.
    
    Tuy nhiên bạn có thể overide lại được để chống render không cần thiết, từ đó tăng performance.
☞ React.PureComponent
  ☆ Để sử dụng bạn cần extends React.PureComponent
  ☆ Nó là anh em sinh đôi nhưng thông minh hơn một chút nhờ sự khác biệt tại shouldComponentUpdate.
  ☆ Bạn không thể overide lại shouldComponentUpdate và nó là shallow compare
    Nghĩa là các prop con của nextProps === các prop con của prevProps
    và các state con của nextState === các state con của prevState
    thì return false, return false thì sẽ không re-render nữa.
---------------------------------------------------------------------------------------------------------------


### ♵ CHIA SẼ THÊM
  - Bài này chỉ giới thiệu các loại component có trong React và đặc điểm cũng như cách sử dụng. Nên để hiểu rõ hơn
    về anh em React.Component và React.PureComponent thì bạn đọc bài sau để hiểu hơn khi nào nên dùng React.Component
    khi nào nên dùng React.PureComponent. Thế nào là reference compare, thế nào là shallow compare, thế nào là deep compare.
      https://github.com/nguyenvanhoang26041994/dev-experiences/blob/master/React/component_vs_purecomponent
      
      
Tác giả: Nguyễn Văn Hoàng
