import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateWalletDto {
  @IsOptional()
  @IsBoolean()
  favorite?: boolean;
}
