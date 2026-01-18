import { IsEnum, IsInt, IsOptional, Min, Max } from 'class-validator';

export class CreateMovieDto {
  @IsInt()
  tmdbId: number;

  @IsEnum(['pending', 'watched'])
  status: 'pending' | 'watched';

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(10)
  rating?: number;
}
