const regex = {
  sats: [/([\d\.]+)\ ?SAT/gi, /((satoshis?)|(sats?))\ ?([\d\.]+)/gi],
  btc: [
    /(\d[\.\,]\d{1,10})\ ?((btc)|(bitcoin))/gi,
    /((btc)|(bitcoins?))\ ?(\d[\.\,]\d{1,10})/gi,
  ],
};

function parseSatsOrBtc(text) {
  let sats, btc;
  if ((sats = findSats(text))) {
    return sats;
  }
  if ((btc = findBtc(text))) {
    return btc * 100000000;
  }
  return null;
}

function findSats(text) {
  let res, tmp;
  for (const k in regex.sats) {
    if ((res = regex.sats[k].exec(text))) {
      tmp = k == 0 ? res[1] : res[4];
      return parseInt(tmp.replace(/\./g, ''));
    }
  }
  return null;
}

function findBtc(text) {
  let res, tmp;
  for (const k in regex.btc) {
    if ((res = regex.btc[k].exec(text))) {
      tmp = k == 0 ? res[1] : res[4];
      return parseFloat(tmp.replace(/\,/g, '.'));
    }
  }
  return null;
}

module.exports = { parseSatsOrBtc };
