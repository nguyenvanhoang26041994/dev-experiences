THANK TO [REACT-BOILERPLATE](https://github.com/react-boilerplate/react-boilerplate)

- Với mục đích ghi chép kinh nghiệm trong quá trình làm việc để lưu trữ
cho các bạn tìm hiểu sau này cũng như phục vụ công việc mentor của bản thân sau này!
- Bài viết hoàn toàn từ kinh nghiệm nên sẽ không phải là bài viết lý thuyết xuông
mà còn đưa ra ví dụ cụ thể.

Các bài viết về React
- Tại sao không nên sử dụng jQuery trong React: https://github.com/nguyenvanhoang26041994/dev-experiences/tree/why-should-not-use-jquery-with-react
- Vòng đợi/life cycle của React Compoennt: https://github.com/nguyenvanhoang26041994/dev-experiences/blob/master/React/lifecycle_hook.md
- Tất tật tật các cách tối đa performace cho ứng dụg React: https://github.com/nguyenvanhoang26041994/dev-experiences/blob/master/React/how_to_make_best_performance.md
- Những loại component trong React và cách sử dụng đúng: https://github.com/nguyenvanhoang26041994/dev-experiences/blob/master/React/how_many_component_types.md
- PureComponent vs Component: https://github.com/nguyenvanhoang26041994/dev-experiences/blob/master/React/component_vs_purecomponent.md

Draff:
- Check eslint trước khi commit
  pre-commit
  husky
  lint-staged
- Client HTML to PDF: https://github.com/MrRio/jsPDF
  live demo: https://rawgit.com/MrRio/jsPDF/master/#
- Client export excel: https://github.com/SheetJS/js-xlsx

- Tìm kiếm HTML symbold: http://graphemica.com/search?page=5&q=down
- https://github.com/akiran/react-slick
- Coding standar: http://airbnb.io/javascript/
- Ở webpack 4 không thể parse file json bình thường như webpack 3 vẫn làm được. Nên phải config lại một chút như này:
```javascript
{
  test: /\.json/,
  type: 'javascript/auto',
  exclude: /node_modules|bower_components/,
  use: [require.resolve('json-loader')],
},
```

- https://github.com/ckeditor/ckeditor5
- https://www.pdfonline.com/convert-pdf-to-html/
- https://templates.mailchimp.com/resources/inline-css/
- https://babeljs.io/blog/2018/08/27/7.0.0
 
babel 7 có nhiều thứ hay ho như <></> render React.Fragment, suport TS. 
- babel-plugin-proposal-optional-chaining cái này siêu hay, trước phải a && a.b && a.b.c thì bây giờ chỉ cần a?.b?.c thôi hoặc onHandle && onHandle() thì chỉ cần onHandle?.()
- babel-plugin-proposal-logical-assignment-operators cũng khá ngầu nhưng chắc ít dùng
 trước: a = a || b, thì bây giơ sẽ chỉ cần a ||= b, tương tự, a = a && b thì chỉ cần a &&= b;, khá cool.
- @babel/preset-typescript cái này setting thương tự @babel/preset-flow, vậy là từ đây, React ngày càng flexible
- <></> ????.
