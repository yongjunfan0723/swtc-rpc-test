const Remote = require("@swtc/rpc").Remote;
const utils = require("@swtc/utils").utils;
const jlib = require('@swtc/lib');
const Wallet = jlib.Wallet;
const BigNumber = require("bignumber.js");
const remote = new Remote({server: "https://srje115qd43qw2.swtc.top"})

const getBalance = async() => {
  try {
  const FREEZE = { reserved: new BigNumber(20), each_freezed: new BigNumber(5) };
  const processBalance = (data, condition = {}) => {
  const swt_value = new BigNumber(data.native.account_data.Balance).div(1000000);
  const linesLen = new BigNumber(data.lines.lines.length);
  const offersLen = new BigNumber(data.orders.length);
  const totalLen = new BigNumber(linesLen).plus(offersLen);
  const freeze0 = FREEZE.reserved.plus(totalLen.times(FREEZE.each_freezed));
  const swt_data = {
    value: swt_value.toString(10),
    currency: "SWT",
    issuer: "",
    freezed: freeze0.toString(10)
  }
  const _data = []
  if (
    (!condition.currency && !condition.issuer) ||
    (condition.currency && condition.currency === "SWT")
  ) {
   const filterList = data.orders.filter((item) => utils.parseAmount(item.taker_gets).currency === swt_data.currency &&  utils.parseAmount(item.taker_gets).issuer === swt_data.issuer);
    for (let item of filterList) {
      const taker_gets = utils.parseAmount(item.taker_gets)
      console.log(swt_data)
      swt_data.freezed = new BigNumber(swt_data.freezed).plus(taker_gets.value).toString(10);
      }
    }
    _data.push(swt_data);
  for (const item of data.lines.lines) {
    const tmpBal = {
      value: new BigNumber(item.balance).toString(10),
      currency: item.currency,
      issuer: item.account,
      freezed: new BigNumber(0)
    }
    let freezed = new BigNumber(0);
    data.orders.forEach(off => {
      const taker_gets = utils.parseAmount(off.taker_gets)
       if (
        taker_gets.currency === tmpBal.currency &&
        taker_gets.issuer === tmpBal.issuer
      ) {
        freezed = freezed.plus(taker_gets.value);
      }
    })
    for (const l of data.lines2.lines) {
      if (l.currency === tmpBal.currency && l.issuer === tmpBal.issuer) {
        freezed = freezed.plus(l.limit);
      }
    }
    tmpBal.freezed = tmpBal.freezed.plus(freezed).sd(16).toString(10);
    if (condition.currency && condition.currency !== tmpBal.currency) {
      continue
    }
    if (condition.issuer && condition.issuer !== tmpBal.issuer) {
      continue
    }
    _data.push(tmpBal)
  }

  const _ret = {
    balances: _data,
    sequence: data.native.account_data.Sequence
  }
  return _ret
}

const getAccountBalances = async(
  address,
  params = { account: "" }
) => {
  if (!Wallet.isValidAddress(address.trim())) {
    throw new Error("invalid address")
  }
  const p_info = remote.getAccountInfo(
    address,
    params
  )
  const p_trust = remote.getAccountTrusts(
    address,
    params
  )
  const p_freeze = remote.getAccountRelation(
    address,
    params
  )
   params.limit = 1000;
  let offerArray = [];
   while(true) {
    console.log(params);
    const accountOffers = await remote.getAccountOffers(address, params);
    offerArray = offerArray.concat(accountOffers.offers);
   if(!accountOffers.limit) {
      break;
    }
    const marker = accountOffers.marker;
    params.marker = marker;
  }
  console.log("挂单总数:", offerArray.length)
  const data = await Promise.all([p_info, p_trust, p_freeze])
  return processBalance({
    native: data[0],
    lines: data[1],
    lines2: data[2],
    orders: offerArray
  })
}
  /**
   * 获取账户资产
   * params account
   */
  const account = "jRGRHy6T5W3CeoWzpHuGnAMeF17tG6WBx";
  const accountBalance = await getAccountBalances(account);
  console.log("账户资产:", accountBalance);

  } catch(error) {
    console.log("get balance error", error);
  }
}

getBalance()