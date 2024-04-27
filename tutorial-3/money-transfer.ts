/** 从SUI SDK 引入TransactionBlock **/
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { suiClient, signer } from './sui-elements';

async function moneyTransfer() {
  /** 组织交易数据 **/
  const tx = new TransactionBlock();
  // 将要转移归属权的Object ID
  const coinId = '';
  // 接收方账户地址
  const recipient = '0x79101f65f7a6812f21972ff779768086e5b57c8ecab703f66e10f09edb49bf77';
  // 转移金额, 这里要考虑Coin的精度
  const amount = 1e4;
  // 从现有的Coin中拆分出新的Coin
  const [newCoinObject] = tx.splitCoins(coinId, [amount]);
  // 把新的Coin转移给接收方
  tx.transferObjects([newCoinObject], recipient); // 支持一次性转移多个Object

  /** 发起交易 **/
  // 签名并执行交易
  const result = await suiClient.signAndExecuteTransactionBlock({
    signer,
    transactionBlock: tx,
  });
  return result;
}

moneyTransfer().then(console.log).catch(console.error);

