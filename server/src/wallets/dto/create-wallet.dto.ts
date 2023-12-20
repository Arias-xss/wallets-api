import { Matches } from 'class-validator';

export class CreateWalletDto {
  @Matches(/^0x[a-fA-F0-9]{40}$/, { message: 'Invalid wallet address' })
  address: string;
}
