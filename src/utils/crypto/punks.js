const BigNumber = require('bignumber.js');
const { web3 } = require('./web3');
const { punksContract } = require('./contracts');
const { punksCall, punksSend } = require('./utils');
const config = require('../../config');

// Getters
export const totalTokensCount = async () => {
  const count = await punksCall("totalTokensCount", []);
  return Number(count);
}

export const tokenDataInfo = async (tokenId) => {
  const res = await punksCall("tokenDataInfo", [tokenId]);
  return res;
}

export const getAllTokenList = async () => {
  const decimalBN = new BigNumber(10).pow(config.decimals);
  let total = await punksCall("totalTokensCount");
  const data = [];
  for (let i = 0; i < total; i++) {
    try {
      const res = await punksCall("tokenMainInfo", [i]);
      data.push({ ...res, tokenId: i, price: Number(BigNumber(res.price).dividedBy(decimalBN)) });
    } catch (err) {
      total++;
    }
  }
  return { total, data };
}

export const getMyTokenList = async (owner) => {
  const { count, tokenIds } = await punksCall("getProductsByOwner", [owner]);
  const data = [];
  for (let i = 0; i < count; i++) {
    const res = await punksCall("tokenMainInfo", [tokenIds[i]]);
    data.push(res);
  }
  return { total: count, data };
}
