// Copy all of this file and paste to console. then enter
function good_xrp_finance_formular({
  your_birth_date,
  current_date,
  your_age_what_you_suppose_to_run_out_of_xrp,
  your_current_xrp_amount,
  current_xrp_usd_price,
  current_usd_vnd_price,
  vnd_amount_you_want_to_get_monthy,
  your_xrp_wallet_address,
}) {
  const current_xrp_vnd_price = current_xrp_usd_price * current_usd_vnd_price;
  const your_current_age = current_date.getFullYear() - your_birth_date.getFullYear();
  const your_current_xrp_worth_as_usd = your_current_xrp_amount * current_xrp_usd_price;
  const your_current_xrp_worth_as_vnd = your_current_xrp_worth_as_usd * current_usd_vnd_price;
  const the_date_that_you_suppose_to_run_out_of_xrp = (() => {
    const date = new Date(your_birth_date.getTime());
    date.setFullYear(current_date.getFullYear() + your_age_what_you_suppose_to_run_out_of_xrp - your_current_age);
    return date;
  })();
  const day_count_till_you_suppose_to_run_out_of_xrp =
    (the_date_that_you_suppose_to_run_out_of_xrp.getTime() - current_date.getTime()) / (1000 * 60 * 60 * 24);
  const month_count_till_you_suppose_to_run_out_of_xrp =
    (day_count_till_you_suppose_to_run_out_of_xrp / 365) * 12;

  const the_idealy_vnd_amount_that_you_need_to_keep_finance_plan_still_look_good =
    (month_count_till_you_suppose_to_run_out_of_xrp * vnd_amount_you_want_to_get_monthy);
  const the_idealy_xrp_usd_price_that_you_need_to_keep_finance_plan_still_look_good =
    (the_idealy_vnd_amount_that_you_need_to_keep_finance_plan_still_look_good / current_usd_vnd_price) / your_current_xrp_amount;

  const current_total_vnd_amount_that_you_need_add_to_keep_good_finance =
    the_idealy_vnd_amount_that_you_need_to_keep_finance_plan_still_look_good - your_current_xrp_worth_as_vnd;
  const current_xrp_that_you_can_sell_to_keep_good_finance =
    -current_total_vnd_amount_that_you_need_add_to_keep_good_finance / current_xrp_vnd_price;

  const current_month = current_date.getMonth() + 1;
  const current_xrp_that_you_can_sell_this_month_to_keep_good_finance =
    current_xrp_that_you_can_sell_to_keep_good_finance / (12 - current_month + 1);
  const current_xrp_worth_as_vnd_that_you_can_sell_this_month_to_keep_good_finance =
    current_xrp_that_you_can_sell_this_month_to_keep_good_finance * current_xrp_vnd_price;
  const current_xrp_need_to_get_vnd_amount_you_want_to_get_monthy = vnd_amount_you_want_to_get_monthy / current_xrp_vnd_price;
  const current_selling_xrp_amount_monthly_till_you_run_out_of_xrp = your_current_xrp_amount / month_count_till_you_suppose_to_run_out_of_xrp;
  const current_vnd_amount_monthly_till_you_run_out_of_xrp = current_selling_xrp_amount_monthly_till_you_run_out_of_xrp * current_xrp_vnd_price;

  const vnd = (amount) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  const usd = (amount) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 3 }).format(amount);
  console.log(`%c
    Bạn hiện tại đã ${your_current_age} tuổi và đang có ${your_current_xrp_amount.toFixed(0)} XRP(${vnd(your_current_xrp_worth_as_vnd)})
    Với giá XRP hiện tại là ${usd(current_xrp_usd_price)}, bạn sẽ nhận ${vnd(current_vnd_amount_monthly_till_you_run_out_of_xrp)}(bằng cách bán ${current_selling_xrp_amount_monthly_till_you_run_out_of_xrp.toFixed(2)} XRP) mỗi tháng cho đến khi bạn đủ ${your_age_what_you_suppose_to_run_out_of_xrp} tuổi.
    Giá XRP phải từ ${usd(the_idealy_xrp_usd_price_that_you_need_to_keep_finance_plan_still_look_good)} trở lên để nhận tối thiểu ${vnd(vnd_amount_you_want_to_get_monthy)} mỗi tháng cho đến khi bạn đủ ${your_age_what_you_suppose_to_run_out_of_xrp} tuổi.

    Để thực hiện an toàn mục tiêu này, bạn cần:
    ${(() => {
      const xrp_amount = Math.abs(current_xrp_that_you_can_sell_to_keep_good_finance.toFixed(2));
      const xrp_amount_worth_as_vnd = Math.abs(current_total_vnd_amount_that_you_need_add_to_keep_good_finance);
      if (current_xrp_that_you_can_sell_to_keep_good_finance > 0) {
        const first_line = `=> Bạn chỉ được bán tối đa ${xrp_amount} XRP(${vnd(xrp_amount_worth_as_vnd)}) vào thời điểm này!`
        const second_line = `=> Bạn chỉ được bán tối đa ${Math.abs(current_xrp_that_you_can_sell_this_month_to_keep_good_finance.toFixed(2))} XRP(${vnd(Math.abs(current_xrp_worth_as_vnd_that_you_can_sell_this_month_to_keep_good_finance))}) mỗi tháng cho đến hết năm này!`;
        const third_line = `=> Bạn chỉ cần bán ${current_xrp_need_to_get_vnd_amount_you_want_to_get_monthy.toFixed(2)} XRP tháng này là sẽ đủ ${vnd(vnd_amount_you_want_to_get_monthy)}`;
        return `${first_line}
    ${second_line}
    ${third_line}`;
      }
      return `=> Bạn cần mua thêm ${xrp_amount} XRP(${vnd(xrp_amount_worth_as_vnd)}) vào thời điểm này!`
    })()}


    Quick link:
    - Your XRP balance: https://xrpscan.com/account/${your_xrp_wallet_address}
    - XRP/USD: https://www.binance.com/vi/trade/XRP_USDT
    - USD/VND: https://www.google.com/finance/quote/USD-VND
    `, `color: ${current_xrp_that_you_can_sell_to_keep_good_finance > 0 ? '#10d853' : '#f3083a'}; font-size: 18px`)
}

good_xrp_finance_formular({
  your_birth_date: new Date('06/05/1994'), // mm/DD/yyyy
  current_date: new Date(Date.now()), // new Date('03/15/2023')
  your_age_what_you_suppose_to_run_out_of_xrp: 80, // age of retirement
  your_current_xrp_amount: 50000, // LONG TERM AMOUNT
  current_xrp_usd_price: 15, // LONG TERM PRICE
  current_usd_vnd_price: 23500,
  vnd_amount_you_want_to_get_monthy: 20000000,
  your_xrp_wallet_address: localStorage.getItem('MY_XRP_WALLET_ADDRESS'),
});
