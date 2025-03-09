/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString } from 'class-validator';

export class AnalyzeGeneDataDto {
  @IsString()
  readonly geneID: string;
}
