Với webpack 4. Sử dụng mode="development" khi ở chế độ dev. Vì khi change code thì sẽ build rất nhanh.
Nếu để mode="production" thì lại rất chậm

Ví dụ ở lần build đầu mất 60s. Chạy ở dev(Với mode="development") thì mất từ 1=>3s để re build những code change
Còn với mode="production" thì mất tầm tầm thời gian build lần đâu khi change code(60s)

Lý do là do ở mode="production" phải chạy UglyPlugin để minimize code

