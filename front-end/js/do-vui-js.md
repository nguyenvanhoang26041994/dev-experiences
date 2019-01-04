Question 1:
What is the result?

var foo = function foo2() {
	console.log(foo === foo);  
};
console.log(typeof foo2);

Explain:
Khi bạn gán hàm cho 1 biến var và đặt tên hàm đó, nó sẽ không khởi tạo hàm.

Vì vậy foo2() được gán cho foo, nhưng nó không được khởi tạo toàn cục, vì (typeof foo2 = undefined)
=> 'undefined'

_________________________________________________________________

Question 4:
What is the result ?

(true + false) > 2 + true

Explain:
true ứng với 1,

false ứng với 0,

Thực hiện phép tính lớp 1:

(1 + 0) >(2 +1) === false
____________________________________________
Question 5:
What is alerted

function bar() {
	return foo;
	foo = 10;
	function foo() {}
	var foo = '11';
}
alert(typeof bar());

Explain:
Khi javascript biên dịch, nó sẽ được sắp xếp lại như sau

function bar() {
	/* Đưa khai báo biến, và khai báo hàm lên*/
	var foo;
	// Biến foo được ưu tiên đưa lên đầu
	function foo() {};
	// Tiếp theo là khai báo function
	// Vì vậy kết quả trả về sẽ là: function
	return foo;
	foo = 10;
	foo = '11';
}
alert(typeof bar());

________________________________________
Question 6:
What is the result? 

"1" - -"1";
Explain:

"1" - (-"1")
//Tự động ép kiểu -"1" thành -1 và ép luôn "1" thành 1
// => 1 - (-1) = 2

_____________________________________
Question 7:
What is the order of values alerted ?

var x = 3;
var foo = {
	x: 2,
	baz: {
		x: 1,
		bar: function() {
			return this.x;
		}
	}
}
var go = foo.baz.bar;
alert(go());
alert(foo.baz.bar());

Explain:
Trong Javascript context được liên kết với từ khóa this, nó phụ thuộc vào việc hàm được gọi như thế nào, chứ không phụ thuộc vào cách khai báo.

// Biến x toàn cục
var x = 3;
/*
	...Code above
*/
var go = foo.baz.bar;
alert(go())
/* Vì foo.baz.bar gán cho biến go, lúc này nó đang có thuộc
tính là scope global, vì vậy context lúc này chính là 
this = window, cho nên kết quả sẽ trả về là window.x, 
cái mà đã được khai báo đầu tiên.
*/
alert(foo.baz.bar());
/* hàm bar() được gọi dưới tư cách của foo.baz vì vậy context
lúc này sẽ là foo.baz và this = foo.baz cho nên kết quả trả
về là foo.baz.x
*/

____________________________________________________________
Question 9:
What is the result ?

[] + [] + 'foo'.split('');

=> "f, o, o"
______________________________________________________________
Question 11:
What is printed in the console?

var myArr = ['foo', 'bar', 'baz'];
myArr.length = 0;
myArr.push('bin');
console.log(myArr);

Explain:
Thực hiện gán myArr.length =0 đồng nghĩa với việc reset mảng.


_________________________________________________________________
Question 14:
What is the result ?

"This is a string" instanceof String;

Explain:
Để hiểu rõ hơn về instanceOf bạn vui lòng đọc bài này .

instanceOf chỉ hoạt động với kiểu dữ liệu không phải là nguyên thủy.

Kiểu dữ liệu nguyên thủy như là: String, Boolean, Number
________________________________________
Question 16:
What is the result of console.log?

var myArr = ['foo', 'bar', 'baz'];
myArr[2];
console.log('2' in myArr);

console.log('2' in myArr);
/*Kiểm tra key object '2' có tồn tại trong myArr, 
bởi vì bản chất của array trong javascript là object
myArr = ['foo', 'bar', 'baz'] tương ứng với key 1, 2, 3
Để kiểm trứng điều này bạn hãy chạy lệnh sau: */
console.log(Object.keys(myArr));
________________________________________________________________
Question 18:
What is the result ?

10 > 9 > 8 === true;

Explain:
Biểu thức được so sánh từ trái sang phải, nên ta chia như sau

var a = (10 > 9) // true = 1;
var b = a > 8 // false;
var c = (b === true) // false
__________________________________________________________________
Question 20:
What is the resullt ?

NaN === NaN
Explain:
NaN là một property có nghĩa đại điện cho giá trị "Not a number", nó chỉ ra 1 giá trị không phải là số phù hợp.

Trong Javascript NaN có điểm khác biệt là 1 giá trị duy nhất mà không phải bằng chính nó. Vì vậy chúng ta không thể so sánh NaN với NaN.

Để kiểm tra 1 giá trị có phải là NaN không, bạn nên sử dụng hàm isNaN()

http://adripofjavascript.com/blog/drips/the-problem-with-testing-for-nan-in-javascript.html
__________________________________________________________________________________


Nguồn: https://tungtung.vn/test/20-cau-trac-nghiem-chuyen-sau-Javascript-b4AWB
