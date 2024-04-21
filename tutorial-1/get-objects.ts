import { SuiClient, getFullnodeUrl } from '@mysten/sui.js/client';

async function getObjects() {
  // 初始化一个SuiClient实例
  const fullNodeUrl = getFullnodeUrl('mainnet');
  const client = new SuiClient({ url: fullNodeUrl });

  // 调用SuiClient获取一系列Object
  const objectIds = [
    '0xfff7c613d39a609ff58ff460c370feb1882eccf903dedb107b08d9cec1ac1b63',
    '0xcf994611fd4c48e277ce3ffd4d4364c914af2c3cbb05f7bf6facd371de688630',
    '0x6'
  ];
  const objects = await client.multiGetObjects({
    ids: objectIds,
    options: { showContent: true, showOwner: true }
  });
  return objects;
}

getObjects().then(console.log).catch(console.error);
