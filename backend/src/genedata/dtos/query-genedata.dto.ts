/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsArray } from 'class-validator';
export class QueryGeneDataDto {
  @IsArray()
  @IsString({ each: true }) // Ensures every item in the array is a string
  readonly geneIDs: string[];
}
