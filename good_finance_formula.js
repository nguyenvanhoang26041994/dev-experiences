const fetch = require('cross-fetch');
const chalk = require('chalk');

const vnd = (amount) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
const usd = (amount) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 3 }).format(amount);

function amm_finance_formular({
  start_date,
  current_date,
  vnd_amount_that_you_used,
  current_usd_vnd_price,
  initial_lp,
  initial_total_lp,
  initial_xrp_pool_amount,
  initial_usd_pool_amount,
  next_total_lp,
  next_xrp_pool_amount,
  next_usd_pool_amount,
}) {
  const initial_lp_percentage=initial_lp/initial_total_lp
  const next_lp_percentage=initial_lp/next_total_lp
  const initial_my_xrp_in_pool=initial_xrp_pool_amount*initial_lp_percentage
  const initial_my_usd_in_pool=initial_usd_pool_amount*initial_lp_percentage
  const initial_my_worth_as_usd_in_pool=2*initial_my_usd_in_pool
  const initial_XRP_USD_rate = initial_my_usd_in_pool/initial_my_xrp_in_pool
  const next_my_xrp_in_pool=next_xrp_pool_amount*next_lp_percentage
  const next_my_usd_in_pool=next_usd_pool_amount*next_lp_percentage
  const next_my_my_worth_as_usd_in_pool=2*next_my_usd_in_pool
  const next_my_XRP_USD_rate = next_my_usd_in_pool/next_my_xrp_in_pool
  const ROI = (next_my_my_worth_as_usd_in_pool - initial_my_worth_as_usd_in_pool)/initial_my_worth_as_usd_in_pool

  const k2 = next_my_xrp_in_pool*next_my_usd_in_pool
  const k1 = initial_my_xrp_in_pool*initial_my_usd_in_pool
  const intertest_rate = Math.sqrt(k2/k1)-1

  const your_worth_as_vnd = next_my_my_worth_as_usd_in_pool*current_usd_vnd_price
  const show_log = () => console.log(`
    ${chalk.green('AMM Analysis')}
    Với giá XRP/USD lúc đầu là: ${chalk.yellow(usd(initial_XRP_USD_rate))},  và giá hiện tại là ${chalk.yellow(usd(next_my_XRP_USD_rate))}
    Bạn đang có ${vnd(your_worth_as_vnd)}(~${(next_lp_percentage*100).toFixed(2)}% AMM pool) và ${ROI > 0 ? 'lãi' : 'lỗ' } ${chalk[ROI > 0 ? 'green' : 'red'](vnd(vnd_amount_that_you_used - next_my_my_worth_as_usd_in_pool* current_usd_vnd_price))}

    Từ ngày ${start_date.toDateString()} - ${current_date.toDateString()}
    Lợi nhuận từ fee là ~${(intertest_rate*100).toFixed(2)}% = ${chalk.green(vnd((Math.sqrt(k2/k1)-1)*initial_my_worth_as_usd_in_pool*current_usd_vnd_price))}
  `);
  return {
    data: {
      your_worth_as_vnd
    },
    show_log,
  };
}
function hold_xrp_finance_formular({
  your_birth_date,
  current_date,
  your_age_that_you_suppose_to_run_out_of_xrp,
  your_current_xrp_amount,
  current_xrp_usd_price,
  current_usd_vnd_price,
  vnd_amount_you_want_to_get_monthy,
  your_target_xrp_usd_price,
  vnd_amount_that_you_used_to_buy_xrp,
}) {
  const current_xrp_vnd_price = current_xrp_usd_price * current_usd_vnd_price;
  const your_current_age = current_date.getFullYear() - your_birth_date.getFullYear();
  const your_current_xrp_worth_as_usd = your_current_xrp_amount * current_xrp_usd_price;
  const your_current_xrp_worth_as_vnd = your_current_xrp_worth_as_usd * current_usd_vnd_price;
  const your_average_xrp_vnd_price = vnd_amount_that_you_used_to_buy_xrp / your_current_xrp_amount;
  const your_average_xrp_usd_price = your_average_xrp_vnd_price / current_usd_vnd_price;
  const your_lose_as_vnd = vnd_amount_that_you_used_to_buy_xrp - your_current_xrp_worth_as_vnd;
  const the_date_that_you_suppose_to_run_out_of_xrp = (() => {
    const date = new Date(your_birth_date.getTime());
    date.setFullYear(current_date.getFullYear() + your_age_that_you_suppose_to_run_out_of_xrp - your_current_age);
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

  const xrp_amount_that_you_need_to_buy_until_xrp_reach_to_target_price =
    (((vnd_amount_you_want_to_get_monthy * month_count_till_you_suppose_to_run_out_of_xrp) / (your_target_xrp_usd_price * current_usd_vnd_price)) - your_current_xrp_amount);
  const xrp_amount_you_need_to_buy_monthly_in_next_12_months_until_you_reach_good_finance =
    xrp_amount_that_you_need_to_buy_until_xrp_reach_to_target_price / 12;
  const xrp_amount_worth_as_vnd_you_need_to_buy_monthly_in_next_12_months_until_you_reach_good_finance =
    xrp_amount_you_need_to_buy_monthly_in_next_12_months_until_you_reach_good_finance * current_xrp_vnd_price;
    const show_log = () => console.log(`
    ${chalk.green('HOLDING Analysis')}
    ${current_date.toDateString()} - ${the_date_that_you_suppose_to_run_out_of_xrp.toDateString()}.
    
    Bạn hiện tại đang có ${chalk.green(your_current_xrp_amount.toFixed(0))} XRP(${vnd(your_current_xrp_worth_as_vnd)}) với trung bình giá là ${chalk.yellow(usd(your_average_xrp_usd_price))}. Với giá XRP hiện tại là ${chalk.yellow(usd(current_xrp_usd_price))}, đang ${your_lose_as_vnd > 0 ? `lỗ ${chalk.red(vnd(Math.abs(your_lose_as_vnd)))}`: `lãi ${chalk.green(vnd(Math.abs(your_lose_as_vnd)))}`}
 
    Bạn sẽ nhận ${vnd(current_vnd_amount_monthly_till_you_run_out_of_xrp)}(bằng cách bán ${current_selling_xrp_amount_monthly_till_you_run_out_of_xrp.toFixed(2)} XRP) mỗi tháng cho đến khi bạn đủ ${your_age_that_you_suppose_to_run_out_of_xrp} tuổi(${month_count_till_you_suppose_to_run_out_of_xrp.toFixed(0)} tháng nữa).
    Giá XRP phải từ ${usd(the_idealy_xrp_usd_price_that_you_need_to_keep_finance_plan_still_look_good)} trở lên để nhận tối thiểu ${vnd(vnd_amount_you_want_to_get_monthy)} mỗi tháng cho đến khi bạn đủ ${your_age_that_you_suppose_to_run_out_of_xrp} tuổi(${month_count_till_you_suppose_to_run_out_of_xrp.toFixed(0)} tháng nữa).

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
    
      const first_line = `=> Bạn cần mua thêm ${xrp_amount} XRP(${vnd(xrp_amount_worth_as_vnd)}) vào thời điểm này!`;
      const second_line = xrp_amount_you_need_to_buy_monthly_in_next_12_months_until_you_reach_good_finance > 0
        ? `=> Hoặc với target giá XRP là ${usd(your_target_xrp_usd_price)} thì bạn cần mua ${Math.abs(xrp_amount_you_need_to_buy_monthly_in_next_12_months_until_you_reach_good_finance.toFixed(2))} XRP(${vnd(xrp_amount_worth_as_vnd_you_need_to_buy_monthly_in_next_12_months_until_you_reach_good_finance)}) mỗi tháng trong suốt 12 tháng tiếp theo để đạt sở hữu tổng cộng ${(your_current_xrp_amount + xrp_amount_that_you_need_to_buy_until_xrp_reach_to_target_price).toFixed(0)} XRP!`
        : '';
      return `${first_line}
    ${second_line}`;
    })()}`);

  return {
    data: {
      your_current_xrp_worth_as_vnd,
    },
    show_log,
  };
}

Promise.all([
  fetch("https://api.xrpscan.com/api/v1/account/..."),
  fetch("https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=XRP", {
    headers: {
      Accept: "application/json",
      "X-Cmc_pro_api_key": "2da4294d-b035-418d-8111-0f4566eab3fe"
    }
  }),
  fetch("https://api.xrpscan.com/api/v1/account/.../assets"),
  fetch("https://api.xrpscan.com/api/v1/amm/rs9ineLqrCzeAGS1bxsrW8x2n3bRJYAh3Q"),
])
.then(async ([r1, r2, r3, r4]) => [await r1.json(), await r2.json(), await r3.json(), await r4.json()])
.then(([wallet1, data2, assetwallet2, ammPoolData]) => {
  const current_usd_vnd_price = 26000
  const { data: { your_current_xrp_worth_as_vnd }, show_log: show_log_1 } = hold_xrp_finance_formular({
    your_birth_date: new Date(''), // mm/DD/yyyy
    current_date: new Date(Date.now()),
    your_age_that_you_suppose_to_run_out_of_xrp: 60,
    your_current_xrp_amount: +wallet1.Balance / 1000000,
    current_xrp_usd_price: data2.data.XRP.quote.USD.price,
    current_usd_vnd_price,
    vnd_amount_you_want_to_get_monthy: 1000000 * 30,
    vnd_amount_that_you_used_to_buy_xrp: 0,
    your_target_xrp_usd_price: 5.89, // LONG TERM PRICE
  });
  
  const amm = assetwallet2[assetwallet2.findIndex(item => item.counterparty === 'rs9ineLqrCzeAGS1bxsrW8x2n3bRJYAh3Q')]
  const { data: { your_worth_as_vnd }, show_log: show_log_2 } = amm_finance_formular({
    start_date: new Date('03/27/2024'),
    current_date: new Date(Date.now()),
    vnd_amount_that_you_used: 0,
    current_usd_vnd_price,
    initial_lp: amm.value,
    initial_total_lp: 11222518.217677,
    initial_xrp_pool_amount: 14737.944086,
    initial_usd_pool_amount: 9190.613056,
    next_total_lp: ammPoolData.lp_token.value,
    next_xrp_pool_amount: +ammPoolData.amount/1000000,
    next_usd_pool_amount: +ammPoolData.amount2.value,
  });
  const cash_worth_as_vnd = 0;
  const for_borrow_worth_as_vnd = 0 + 0 + 0;
  console.log(chalk.green(`    Current VND/USD rate: ${vnd(current_usd_vnd_price)}`))
  console.log(chalk.green(`    Tổng tài sản: ${vnd(your_worth_as_vnd + your_current_xrp_worth_as_vnd + cash_worth_as_vnd + for_borrow_worth_as_vnd)}`))
  console.log(chalk.green(`------------------------------------------------------------------------------------------------------------------------------------------------`))
  show_log_1();
  console.log(chalk.green(`------------------------------------------------------------------------------------------------------------------------------------------------`))
  show_log_2();
  console.log(chalk.green(`------------------------------------------------------------------------------------------------------------------------------------------------`))
  console.log(chalk.green(`    Tiền mặt: ${vnd(cash_worth_as_vnd)}`))
  console.log(chalk.green(`    Nợ: ${vnd(for_borrow_worth_as_vnd)}`))
});
