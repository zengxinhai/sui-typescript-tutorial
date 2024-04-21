import { SuiClient, getFullnodeUrl } from '@mysten/sui.js/client';

// const SuiNsType = '0xd22b24490e0bae52676651b4f56660a5ff8022a2576e0089f79b3c88d44e08f0::suins_registration::SuinsRegistration';
async function getOwnedObjects() {
  // 初始化一个SuiClient实例
  const fullNodeUrl = getFullnodeUrl('mainnet');
  const client = new SuiClient({ url: fullNodeUrl });

  // 调用SuiClient获取某个账户下的Object
  const accountAddress = '0x51bfd0bf129e9323d891ccc66ec8a8c9a9947ee8dd1ae3742d33dfcca8b1e667';
  const objects = await client.getOwnedObjects({
    owner: accountAddress,
    options: { showType: true }
    // filter: { StructType: SuiNsType },
  });
  return objects.data.map(object => object.data);
}

getOwnedObjects().then(console.log).catch(console.error);
