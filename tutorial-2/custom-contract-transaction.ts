import { TransactionBlock } from '@mysten/sui.js/transactions';
import { suiClient, signer } from './sui-elements';


async function customContractTransaction() {

  /** 输入合约调用相关信息 **/
  const pkgId = '0x941a014e9254f98dbe43fe5ed2224d6cf0f60a1476a460fd4549962da043700a'; // 合约包ID
  const moduleName = 'counter'; // 合约模块名
  const funcName = 'increment'; // 方法名

  /** 参与交易的Objects **/
  const counterObjectId = '0x1d3732428ef81e079e2703003fd647c2a1716cdffd693bdf16dbcfe17eb24ead';

  /** 组织交易数据 **/
  const tx = new TransactionBlock();
  // const target = `${pkgId}::${moduleName}::${funcName}`;
  tx.moveCall({
    target: `${pkgId}::${moduleName}::${funcName}`,
    arguments: [tx.object(counterObjectId)]
  });

  /** 发起交易 **/
  const result = await suiClient.signAndExecuteTransactionBlock({
    signer,
    transactionBlock: tx,
  });
  return result;
}

customContractTransaction().then(console.log).catch(console.error);

