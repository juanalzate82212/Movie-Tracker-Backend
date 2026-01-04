import { IsEnum, IsOptional } from 'class-validator';

export class QueryMoviesDto {
  @IsOptional()
  @IsEnum(['pending', 'watched'])
  status?: 'pending' | 'watched';
}
