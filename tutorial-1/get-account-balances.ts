import { SuiClient, getFullnodeUrl } from '@mysten/sui.js/client';

async function getAccountBalances() {
  // 初始化一个SuiClient实例
  const fullNodeUrl = getFullnodeUrl('mainnet');
  const client = new SuiClient({ url: fullNodeUrl });

  // 调用SuiClient获取账户下的代币余额
  const accountAddress = '0x784aeb9820c266e80b480ad3d4e9b54cbcdaecfc53f64d45f8390bd4733d299d';
  const balance = await client.getAllBalances({
    owner: accountAddress,
  });
  return balance;
}

getAccountBalances().then(console.log).catch(console.error);
