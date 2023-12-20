import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { EtherscanBlock, EtherscanResponse, EtherscanTx } from './types';

@Injectable()
export class EtherscanService {
  constructor(private readonly configService: ConfigService) {}

  // https://docs.etherscan.io/api-endpoints/accounts#get-ether-balance-for-a-single-address
  accountBalance(address: string): Promise<EtherscanResponse<string>> {
    return this.send('account', 'balance', {
      address,
      tag: 'latest',
    });
  }

  // https://docs.etherscan.io/api-endpoints/accounts#get-a-list-of-normal-transactions-by-address
  firstTransaction(
    address: string,
  ): Promise<EtherscanResponse<Array<EtherscanTx>>> {
    return this.send('account', 'txlist', {
      address,
      startblock: '0',
      endblock: '99999999',
      page: '1',
      offset: '1',
      sort: 'asc',
    });
  }

  // https://docs.etherscan.io/api-endpoints/blocks#get-block-and-uncle-rewards-by-blockno
  blockByNumber(
    blockNumber: string,
  ): Promise<EtherscanResponse<EtherscanBlock>> {
    return this.send('block', 'getblockreward', {
      blockno: blockNumber,
    });
  }

  private async send<T>(
    module: string,
    action: string,
    queryParameters?: Record<string, string>,
  ): Promise<EtherscanResponse<T>> {
    const url = new URL('https://api.etherscan.io/api');
    url.searchParams.append('module', module);
    url.searchParams.append('action', action);
    if (queryParameters !== undefined) {
      for (const [key, value] of Object.entries(queryParameters)) {
        url.searchParams.append(key, value);
      }
    }

    url.searchParams.append(
      'apikey',
      this.configService.getOrThrow('ETHERSCAN_API_KEY'),
    );

    const response = await fetch(url.href);
    return response.json();
  }
}
