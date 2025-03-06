import { SampleType } from '../enums/sampletype.enum';

interface GeneDataSample {
  type: SampleType;
  id: string;
  value: number;
}

interface GeneDataSampleWithOutlierInfo extends GeneDataSample {
  outlier: boolean;
}
export interface GeneData {
  readonly gene: string;
  readonly transcripts: string[];
  readonly samples: GeneDataSample[];
}

export interface GeneDataAnalysisResult extends GeneData {
  readonly statistics: {
    readonly mean: number;
    readonly median: number;
    readonly variance: number;
  };
}

export interface GeneDataAnomalyDetectionResult {
  readonly gene: string;
  readonly transcripts: string[];
  readonly samplesWithOutlierInfo: GeneDataSampleWithOutlierInfo[];
}
