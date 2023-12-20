import { IsOptional, IsIn } from 'class-validator';

export class FindAllWalletsDto {
  @IsOptional()
  @IsIn(['favorite', 'new', 'first'])
  sort?: 'favorite' | 'new' | 'first';
}
