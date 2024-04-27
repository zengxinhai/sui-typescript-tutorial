import { TransactionBlock } from '@mysten/sui.js/transactions';
import { suiClient, signer } from './sui-elements';

async function defiPtb() {
  // 合约信息
  const pkgId = '0xa815b831a8f62e5511f304b7e8c047002e50e1084be5315dfb408a574bf0dc3f';
  const dexModuleName = 'dex';
  const flashLoanModuleName = 'flash_loan';

  // 参与交易的Objects
  const poolId = '0x3c8f5b5c5dab4f361beeca9a2092a15d81a72dadd02749151d02e6ea580efea3';

  // 组织交易数据
  const tx = new TransactionBlock();
  const borrowYAmount = 100;
  let [coinY, loanY] = tx.moveCall({
    target: `${pkgId}::${flashLoanModuleName}::borrow_y`,
    arguments: [tx.object(poolId), tx.pure(borrowYAmount)]
  });
  const coinX = tx.moveCall({
    target: `${pkgId}::${dexModuleName}::swap_from_y_to_x`,
    arguments: [tx.object(poolId), coinY]
  });
  const finalCoinY = tx.moveCall({
    target: `${pkgId}::${dexModuleName}::swap_from_x_to_y`,
    arguments: [tx.object(poolId), coinX]
  });
  const [repayCoinY] = tx.splitCoins(finalCoinY, [borrowYAmount]);
  tx.moveCall({
    target: `${pkgId}::${flashLoanModuleName}::repay_y`,
    arguments: [tx.object(poolId), repayCoinY, loanY]
  });
  tx.transferObjects([finalCoinY], signer.toSuiAddress());

  // 发起交易
  const result = await suiClient.signAndExecuteTransactionBlock({
    signer,
    transactionBlock: tx,
  });
  return result;
}
defiPtb().then(console.log).catch(console.error);
