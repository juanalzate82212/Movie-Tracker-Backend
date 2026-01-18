import { IsEnum, IsInt, IsOptional, Min, Max } from 'class-validator';

export class UpdateMovieDto {
  @IsOptional()
  @IsEnum(['pending', 'watched'])
  status?: 'pending' | 'watched';

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(10)
  rating?: number;
}
