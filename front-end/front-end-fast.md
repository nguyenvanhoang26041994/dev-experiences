# Tổng quan bài viết về performance(SPA sử dụng SSR)
Theo mình, để xây dựng một trang web chạy nhanh, mượt và đáp ứng lượng truy cập cao thì cần phải tập trung vào các điều sau:
1. api
2. Server Side Rendering vs Client Side Rendering
3. Cache trên server.
4. Cache dưới browser.
5. Mapping data từ server xuống browser
6. Chia nhỏ hoặc gộp static resource.
7. Progressive Web App(PWA)
8. nén file với gzip, minimize file size.(comming soon in chapter 2)
9. Một số UX phổ biến để tạo cảm giác mượt mà dễ chịu khi sử dụng webapp(comming soon in chapter 2)
10. Một số mẹo thường dùng(comming soon in chapter 2)
11. Một số mẹo khi code js để tối ưu(comming soon in chapter 2)
12. Một số mẹo khi code css để tối ưu(comming soon in chapter 2)
13. Một số mẹo khi code html để tối ưu(comming soon in chapter 2)
14. Chơi một vòng với React hooks

> Hey, để tiện demo thì mình giới thiệu một repo có tên là next-boilerplate tại https://www.github.com/nguyenvanhoang26041994/next-boilerplate và live tại https://youtube-musics.herokuapp.com/ nhé!

Giao diện của một trang web được xây dựng với html, css hỗ trợ việc trang trí, js hỗ trợ tương tác và một đống icon, ảnh, font, bla bla

# API
Nếu bạn đang xây dựng một trang web động, cho dù bạn code font-end giỏi đến mấy, nhất là code font-end Client Side Rendering hoàn toàn sử dụng các framework, libs như React, Vue, Angular, jQuery thì cũng không ăn thua nếu API server chạy yếu xìu!. Tại sao ư. Vì phần lớn thời gian màn hình là một đống content liên quan đến loading đợi dữ liệu.

Vì vậy, trước hết, API Server phải tốt trước đã. Và vì phần này là backend side nên mình xin dừng nhanh chóng phần này tại đây.

# Server Side Rendering(SSR) vs Client Side Rendering(CSR)
Định nghĩa ngắn gọn:
- SSR: html được render ở Server
- CSR: render trực tiếp vào DOM ở Browser

Về mặt cảm nhận SSR nhanh hơn rất nhiều so với CSR.
Lý do là SSR đã được Server render ra html string sẳn rồi và chỉ việc trả về cho người dùng thôi. Tuy nhiên khi về với browser thì cần thêm một số bước chạy js để initial thành ứng dụng SPA được. Còn về CSR sẽ chậm hơn vì phải chạy dưới browser để có giao diện được, nếu browser bạn sida thì CSR là ác mộng.

Trong thực tế, thì CSR chậm hơn SSR không phải về mặt kỹ thuật mà là về mặt tái sử dụng data của API server.
Ví dụ để vào trang chủ bạn cần ít nhất dự liệu của 1 API nào đó chẳng hạn. Điều gì xảy ra?  
CSR: access vào trang chủ => SERVER trả về html có script cho ứng dụng SPA => Browser chạy js => Browser gọi API => Browser re-render  
SSR: access vào trang chủ => SEVER gọi API => SERVER render html có script cho ứng dụng SPA => Browser chạy js

> Yeah, giờ bạn đã hiểu ra vấn đề rồi chứ?

Đúng vậy, Server Side sẻ gọi API dùm bạn. Nhưng, nhưng...  
Giả sử có 1 triệu lượt truy cập vào trang chủ mỗi ngày đi, nếu dùng CSR thì sẽ có chính xác 1 triệu request tới API server và điều này khiến API server mệt mõi và chậm.  
Còn SSR thì sao?. Server đóng vai trò kẻ trung gian cho 1 triệu request đó,
> Server: Tao thấy 1 triệu request đòi trang chủ, tao gọi 1 request tới API server, tao render html và trả về thằng đầu tiên đồng thời giữ lại html này, thằng thứ 2 trở đi dùng chung html của thằng thứ 1.

và cái `đồng thời giữ lại html này` chính là cache tại server. Vậy là chúng ta sẽ tạm dừng SSR vs CSR tại đây và đến với cache nhé.

# Cache trên server(cache dữ liệu)
Trước hết đây là server của front-end thôi nhé, đừng nhẫm lần với API server

Như đã nói ngắn gọn trên, dùng chung cái gì thì cache cái đó. Dễ nói dễ hiểu, nên chỉ thêm một cái example nhẹ nhẹ nữa thôi:
> Browser Chorme 1: Hi Server, tôi đang muốn biết profile của Ed Sheeran?  
> Server: Well, hold on. "gọi api, render html, cache cái html mới render". Của em đây!. :))  
> Browser Safari 2: Hi Server, tôi đang muốn biết profile của Ed Sheeran?  
> Server: Oh, Ed Sheeran again? "tìm trong cache, đã tìm thấy, ko cần gọi api", Của em đây!. :))  
> Browser IE 69: Hi Server, tôi muốn biết profile của Avicii?  
> Server: Ồ IEEEE, hold on. "tìm trong cache, ko tìm thấy Avicii, gọi api, render html, cache cái html mới render", Đây, cầm lấy và đừng bao giờ quay lại nữa, Tao ghét mày.

Và rồi anh Server API đi exciter bị té bẻ cái Iphone tàu, thẻ nhớ 16Gb bị hỏng nhẹ mất dữ liệu của Avicii, Đem đi sửa điện thoại và add lại thông tin cho profile Avicii

> Browser Chrome 1: Hi Server, tôi muốn biết profile của Avicii?  
> Server: Oh, Ed Sheeran again? "tìm trong cache, đã tìm thấy, ko cần gọi api", Của em đây!. :))  

Và rồi Browser Chrome 1 chỉ xem được dữ liệu cũ của Avicci. Cache tuyệt vời nhưng rất đáng ghét!

> WOW, nghe vô lý nhưng lại rất thuyết phục.

Vì một số điều đáng ghét của cache mang lại nên sẽ có một số rule khi cache.
1. Xác định loại dữ liệu thường update như thế nào để đưa ra thời gian cache hợp lý.
2. Không cáche những dự liệu thường xuyên thay đổi và nhạy cảm.
3. cách nhẹ 1 vài giây nếu dữ liệu hường xuyên thay đổi nhưng không nhạy cảm, không quan trọng

> Mình đang suy nghỉ để handle được cái cách cache này, Mình có thể xây dựng một cách giao tiếp giữa anh API Server và Server Front-end này không nhỉ. API  Server thay đổi, API Server gọi đến Server font-end thông báo cho ổng biết để ông xoá cái cache liên quan?, Từ khoá gì nhỉ?. Socket?  

# Cache dưới browser(cache dữ liệu)
Trước hết, hãy bỏ qua không nói tới cache mặc định của trình duyệt.  

Bạn access vào https://youtube-musics.herokuapp.com/  
Bạn kéo xuống phần singers và click vào bất kì(Acivvi chẳng hạn) để sang https://youtube-musics.herokuapp.com/profile/avicii  
Bạn click vào cái icon logo để về trang chủ https://youtube-musics.herokuapp.com/  
Bạn click vào Avicii singer một lần nữa https://youtube-musics.herokuapp.com/profile/avicii  

Hãy để ý thì chỉ có một API ở lần đần tiên vào profile Acivii https://youtube-musics.herokuapp.com/profile/avicii được call, từ lần thứ 2 trở đi không hề gọi nữa, mình gọi đó là cache dữ liệu phía CSR
  
Việc bạn vừa làm, bạn không hề refresh browser url vẫn thay đổi được. Thì đó là cách nhận biết dễ dàng đó là CSR, SSR chỉ thực hiện khi bạn refesh hoặc access vào trang web mà thôi. Nên hãy nắm chắc SSR là gì và CSR là gì nhé  


Mình sẽ kể cho bạn một câu chuyện hư cấu như sau, gác qua SSR, không refesh trình duyệt.

Browser Chrome: Oida, vào được trang chủ rồi.  
User: Click vào profile của Avicii.  
Broser Chrome: call /api/profile/avicii => render profile Page  
User: Click vào logo về trang chủ  
Browser: call api chứa data cho trang chủ => render Trang chủ  
User: Click vào profile Avicii lần nữa  
Broser Chrome: call /api/profile/avicii => render profile Page  
  
  
Đây là điều bình thường mà hầu hết các develop hiện tại đều có folow như vậy. Hãy sét lại một chút thì phải đặt câu hỏi ở đây là tại sao phải call /api/profile/avicii tới 2 lần cơ chứ?. Thật là không cần thiết.  

Đây cũng chính là lý do mình viết một package nhỏ tên là `redux-cache` - một redux middlewares, không chỉ dùng cho redux và có thể dùng cache bất cứ object javascript nào(string, number, object ...)

Cứ nghỉ nó phức tạp, nhưng thật ra nó là js basic. Để miêu tả đơn giản nó hoạt động như thế nào thì hãy follow

```
const cacheStorage = {};

const getProfile = id => async (dispatch, getState) => {
  const dataFromCache = cacheStorage[`getProfileSuccess(${id})`];
  if (dataFromCache) {
    return dispatch(actions.getProfileSuccess(dataFromCache));
  }

  try {
    const data = await API.getProfile(id);
    cacheStorage[`getProfileSuccess(${id})`] = data;
    dispatch(actions.getProfileSuccess(data));
  } catch(e) {}
}
```

> Đúng vậy, tưởng có vẻ cao siêu nhưng nó đơn giản đến không tưởng!

Phát triển nó lên một chút là viết một cái middleware cho redux, khá đơn giản:
```
module.exports = function(store) {
  return function(next) {
    return function(action) {
      if (action[cacheKey]) {
        next(action);
        cacheStorage[action[cacheKey]] = action;
      }
    
      return next(action);
    }
  }
}
```

Bạn có thể lên next-boilerplate của mình để rõ hơn cách dùng nhé.

# Mapping data từ server xuống browser

Bạn hãy tưởng tượng, tất cả mọi page đều có topnavbar nhung đó là navbar động, hay selectbox có dữ liệu được lấy từ API. Ví dụ như selectbox chọn thể loại nhạc đi chắc hạn. thể loại nhạc gồm có ['nhac-song', 'edm', 'rock'...] và nó trong database. Và vì nó quá common đi, chổ nào cũng dùng, 10 page hết 7 page dùng rồi. Thì mình sẽ gọi API trước trên server đi và format nó dưới dạng json và đính kèm vào chuỗi html. Tuy nhiên hạn chế của việc này là tất cả các page đều có dữ liệu này và 3 page còn lại page mà ko cần đến dữ liệu đều có dữ liệu này nếu lười viết thêm code.


Idea là đây
```
<html>
  <body>
    <script data-mapping="__NEXT__DATA__">
      var __NEXT__DATA__ = {
        musicTypes: ['nhac-song', 'edm', 'rock' ]
      }
    </script>
    <script src="app.js" />
  </body>
</html>
```

và khi js excute sẽ sử dụng biến __NEXT__DATA__ như là initial data. và vậy, bạn không cần phải gọi API cho những thứ common nữa.
> Mình đã sử dụng React và Vue, Bạn đầu thì Vue thấy đơn giản hơn, nhưng sau cùng thì vẫy là ReactJS vì có thể control tốt. Vue dễ học dễ làm hơn nhưng có cái gì đó không tự tin handle được những case khó. việc mapping data đối với SSR của vue(Sử dụng nuxtjs) là tự động và bạn không cần phải viết code gì thêm, khi app excute js, nuxt sẽ đưa những data mapping vào VueX(store state) luôn, còn đối với SSR React(Nextjs) thì bạn phải viết một cái HOC để làm việc đó. Rất may mình đã config sẳn rồi nên bạn có thể tìm cách config tại next-boilerplate search with-redux-store.

Việc mapping redux store từ server xuống client gần như là chưa đủ, bạn nhớ phần cacheStorage chứ?. mình cũng muốn mapping cacheStorage của server xuống client thì sao?. cũng cùng repo next-boilerplate, tìm with-cache  
  
Xong!, tất cả những điều vừa trên hoàn toàn nói về data nên sẽ không có nhiều code demo đính kèm, chủ yếu là đưa ra idea mà folow. Bây giờ để check lại tất cả những điều mình nói có sạo hay không thì hãy test xem nhé.
- 1: Vào https://youtube-musics.herokuapp.com/profile/avicii
- 2: Click logo icon để sang trang chủ
- 3: Click vào singer Acivii để vào lại https://youtube-musics.herokuapp.com/profile/avicii
- 4: Cick vào logo icon lần nữa để về trang chủ
- 5: Refesh trình duyệt

Hãy suy nghỉ đơn giản thế này nhé  

> Lần (1) là SSR vì mình access vào web nên API sẽ được gọi từ phía Server chứ ko phải Browser  
> Lần (2) là CSR về trang chủ, browser sẽ call một số API để đổ vào home page  
> Lần (3) là CSR về lại trang profile Avicci đúng không, mà mình nghĩ là mình đã có dữ liệu ở lần (1) rồi nhỉ  
> Lần (4) là CSR về trang chỉ, một lần nữa, mình chắc chắn đã có dữ liệu ở lần (2) rồi nên sẽ không call api nữa nhé.  
> Lần (5) Hiện tại đang ở trang chủ và refresh nên sẽ là SSR. À ở lần (1) mình chắc chắc rằng đã cache tốt ở Server nên Sever lần này ko gọi api nữa  


Đây là cách mình giảm thiểu request tới API server, từ đó xây dựng một trang web đáng ứng lượt truy cập cao. Tất nhiên còn nhiều yếu tố nữa để xây dưng trang web tốc độ cao nữa nhưng ít nhất bạn đã ít làm phiền đến API server. Một ngày nào đó BE Lead sẽ mời bạn một lon Heniken :)


# Chia nhỏ hoặc gộp static resource(Code spliting)
Như đã nói ở trên, trang web của bạn được tạo nên bởi html, css, js. Bài toán ở đây là làm sao chỉ tải và chạy những resoure(js, css) có liên quan cho từng page.  
Ví dụ, ở trang chủ bạn chỉ cần load phần js của trang chủ, css của trang chủ còn những trang khác bạn không quan tâm, không tải resource thừa.  
Đó là tiền đề cho code splitting  
Hồi SPA chưa phổ biến, hầu hết trang web là chia nhỏ source rồi. Ví dụ  
```
  <html>
    <head>
      <link rel="stylesheet" src="/css/trang-chu.css">
    </head>
    <body>
      ...
      <script src="/js/trang-chu.js" />
    </body>
  </html>
```

Những đây là một trang sử dụng SPA
```
  <html>
    <head>
        <link rel="stylesheet" src="/css/app.css">
      </head>
      <body>
        ...
        <script src="/js/app.js" />
      </body>
  </html>
```

Thì trong file app.js có tất cả js của trang chủ cần và cả những trang khác nữa, tương tự với app.css. Điêu này khiến file trở nên nặng nề và mất thời gian tải xuống. hãy tưởng tượng app của bạn nặng 3Mb đi thì thôi ông mobile chào thua!. Làm sao để spliting được nó nhỉ?. Đây là idea

```
  <html>
    <head>
        <link rel="stylesheet" src="/css/app.css">
      </head>
      <body>
        ...
        <script src="/js/vendors.js" />
        <script>
          if (page === 'trang-chủ') {
            include <script src="/js/trang-chu.js" />
          }
          if (page === 'trang-profile') {
            include <script src="/js/trang-profile.js" />
          }
        </script>
        
      </body>
  </html>
```

Đấy là idea. Tất nhiên chỉ là mã giã.  
Nghĩa là chúng ta chỉ tải vendors.js(chứa core js như reactjs) thôi. Còn phụ thuộc vào đó là trang gì để tải thêm resoure tương ứng.
Để rõ hơn bạn searh https://reactjs.org/docs/code-splitting.html dành cho React.
> Funfact: một file.js cũng có thể được tải về và excute bởi js khác, không nhất thiết là phải gắn vào thẻ `<script src="/file.js" />` nên code splitting có thể áp dụng cho vue, angular không nhất thiết phải react.

Còn splitting css như thế nào? Cũng tương tự như js nhưng cách mình làm nó sẽ hơi khác một chút. Thay vì mình thêm một `<link rel="stylesheet" src="/css/trang-chu.css" />` thì mình sẽ format tất cả code css về js và mình chỉ còn care đến js spliting nữa thôi. Trong thực tế thì vẫn spliting css dưới dạng link tới external css được và nó sẽ giúp code bạn nhỏ lại hơn so với format css về js. Nhưng cơ mà mình quan tâm hơn đến việc tránh đụng độ css naming nên mình sẽ đưa về js, chấp nhận nặng hơn chút. và tất nhiên khi format css về js thì nó sẽ render css dưới dạng internal css hoặc inline css.  
`styled-components` là tất cả những gì bạn đang tìm kiếm. và tại `next-boilerplate` mình đã config chuẩn và handle được SSR rồi nên bạn có thể tham khảo.

> Ủa, có là tách resource rồi, còn vụ gộp resource là gì sao không thấy nhắc?. Thật ra đây là mẹo nên mình sẽ để dành nói ở phần 8, 9, 10. Vì nó cũng không phải big deal nên sẽ viết tiếp sau

# Progressive Web App(PWA)
> "Web của chúng tôi sẽ được install vào browser của bạn, bất kể mạng yếu, mất mạng bạn vẫn có thể access vào trang web của chúng tôi!"

Bạn hãy thử tắt mạng(máy tính thôi nhé, serive worker có thể ko chạy đc trên mobile) và vào https://youtube-musics.herokuapp.com  
Giật mình chưa, vẫn vào được đúng không, đó là một trong những sức mạnh của PWA.  

Về PWA mình sẽ nghiên cứu và nói tiếp những feature hay ho sau nhé. thật may là mình có fix một chút config cho NextJS, bạn có thể tham khảo tại next-boilerplate

> Bye, see you!

Nguồn: https://github.com/nguyenvanhoang26041994/dev-experiences/tree/master/front-end/front-end-fast.md
