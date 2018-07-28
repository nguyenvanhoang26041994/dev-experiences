### ♳ TỔNG QUAN
  > Bài này sẽ nói cụ thể và demo cụ thể sự khác nhau giữa hai thằng React.Component và React.PureComponent.
  > Chắc không ít bạn cũng đã từng bị phỏng vấn câu này rồi, nhưng không ít bạn trả lời theo kiểu lý thuyết.
  > OK mình sẽ giúp các bạn hiểu sâu hơn một chút.

  **☞ Tóm lại thì 2 thằng này khác nhau ở một số điểm sau:**
  1. React.Component cho phép dev overide lại shouldComponentUpdate hook, mặc định hook này reference compare để quyết
    định re-render lại hay không.
  2. React.PureComponent không cho phép dev overide lại shouldComponentUpdate hook, nếu bạn cố tình overide thì bạn sẽ
    ăn ngay warning. Hook này shallow compare để quyết định re-render lại hay không.
  3. Đôi khi nếu thấy Component render chậm, hãy thử set shouldComponentUpdate hook return true hoặc return false.
  `
    class Demo extends React.Component {
      ...
      shouldComponentUpdate() {
        return true; // Chỉ cần props hoặc state thay đổi thì cho tới hook re-render luôn. Không cần kiểm tra gì ở đây!
        // return false; Chỉ cho render 1 lần ở mouting. Nghĩa là component này chỉ render ra HTML tĩnh, không thay đổi
      }
      ...
    }
   `
### ♴ NỘI DUNG
### ♵ CHIA SẼ THÊM
