import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { GeneDataService } from './genedata.service';
import {
  GeneData,
  GeneDataAnalysisResult,
  GeneDataAnomalyDetectionResult,
} from './interfaces/genedata.interface';
import { QueryGeneDataDto } from './dtos/query-genedata.dto';
import { AnalyzeGeneDataDto } from './dtos/analyze-genedata.dto';
import NotFoundError from 'src/exceptions/NotFoundError';

@Controller('genedata')
export class GeneDataController {
  constructor(private readonly geneDataService: GeneDataService) {}

  @Post('retrieve')
  async retrieveData(
    @Body() queryGeneDataDto: QueryGeneDataDto,
  ): Promise<GeneData[]> {
    try {
      const result = await this.geneDataService.retrieveData(
        queryGeneDataDto.geneIDs,
      );
      return result;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundException(error);
      }
      throw error;
    }
  }

  @Get('analyze/:geneID')
  async analyzeData(
    @Param() analyzeGeneDataDto: AnalyzeGeneDataDto,
  ): Promise<GeneDataAnalysisResult> {
    try {
      const result = await this.geneDataService.analyzeData(
        analyzeGeneDataDto.geneID,
      );

      return result;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundException(error);
      }
      throw error;
    }
  }

  @Get('detectanomaly/:geneID')
  async detectAnomaly(
    @Param() analyzeGeneDataDto: AnalyzeGeneDataDto,
  ): Promise<GeneDataAnomalyDetectionResult> {
    try {
      const result = await this.geneDataService.detectAnomaly(
        analyzeGeneDataDto.geneID,
      );
      return result;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundException(error);
      }
      throw error;
    }
  }
}
