export type EtherscanResponse<T> =
  | { status: '0'; message: 'NOTOK'; result: string }
  | { status: '1'; message: 'OK'; result: T };

export type EtherscanTx = {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  nonce: string;
  blockHash: string;
  transactionIndex: string;
  from: string;
  to: string;
  value: string;
  gas: string;
  gasPrice: string;
  isError: string;
  txreceipt_status: string;
  input: string;
  contractAddress: string;
  cumulativeGasUsed: string;
  gasUsed: string;
  confirmations: string;
  methodId: string;
  functionName: string;
};

export type EtherscanBlock = {
  blockNumber: string;
  timeStamp: string;
  blockMiner: string;
  blockReward: string;
  uncles: Array<EtherscanBlockUncle>;
  uncleInclusionReward: string;
};

export type EtherscanBlockUncle = {
  miner: string;
  unclePosition: string;
  blockreward: string;
};
