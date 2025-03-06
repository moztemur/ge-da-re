import { Injectable } from '@nestjs/common';
import {
  GeneData,
  GeneDataAnalysisResult,
  GeneDataAnomalyDetectionResult,
} from './interfaces/genedata.interface';
import {
  calculateMean,
  calculateMedian,
  calculateVariance,
  detectOutliersZScore,
} from 'src/utils/calculations.util';
import { GeneDataRepository } from './genedata.repository';
import NotFoundError from 'src/exceptions/NotFoundError';

@Injectable()
export class GeneDataService {
  constructor(private readonly geneDataRepository: GeneDataRepository) {}

  async retrieveData(geneIDs: string[]): Promise<GeneData[]> {
    const result = await this.geneDataRepository.find(geneIDs);

    const notFoundGeneIDs = geneIDs.filter(
      (geneID) => !result.some((geneData) => geneData.gene === geneID),
    );

    if (notFoundGeneIDs.length > 0) {
      throw new NotFoundError(`Gene datas not found for some genes`, {
        geneIDs: notFoundGeneIDs,
      });
    }

    return result;
  }

  async analyzeData(geneID: string): Promise<GeneDataAnalysisResult> {
    const result = await this.geneDataRepository.findByGeneID(geneID);

    if (!result) {
      throw new NotFoundError('Gene data not found', {
        geneID,
      });
    }

    const { samples, gene, transcripts } = result;
    const sampleValues = samples.map((sample) => sample.value);
    const mean = calculateMean(sampleValues);
    const median = calculateMedian(sampleValues);
    const variance = calculateVariance(sampleValues);

    return {
      statistics: {
        mean,
        median,
        variance,
      },
      samples,
      gene,
      transcripts,
    };
  }

  async detectAnomaly(geneID: string): Promise<GeneDataAnomalyDetectionResult> {
    const result = await this.geneDataRepository.findByGeneID(geneID);

    if (!result) {
      throw new NotFoundError('Gene data not found', {
        geneID,
      });
    }

    const { samples, gene, transcripts } = result;
    const sampleValues = samples.map((sample) => sample.value);
    const outliers = detectOutliersZScore(sampleValues);
    const samplesWithOutlierInfo = samples.map((sample, index) => {
      return {
        ...sample,
        outlier: outliers[index],
      };
    });

    return {
      gene,
      transcripts,
      samplesWithOutlierInfo,
    };
  }
}
