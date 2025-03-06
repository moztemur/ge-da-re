type GeneDataSampleType = 'EXPERIMENTAL' | 'CONTROL';

type GeneDataSample = {
  type: GeneDataSampleType;
  id: string;
  value: number;
}

type GeneDataSampleWithOutlierInfo = GeneDataSample & {
  outlier: boolean;
}

type GeneData = {
  gene: string;
  transcripts: string[];
  samples: GeneDataSample[];
};

type GeneDataAnalysisResult = GeneData & {
  statistics: {
    mean: number;
    median: number;
    variance: number;
  }
};

type GeneDataWithOutlierInfo =  {
  gene: string;
  transcripts: string[];
  samplesWithOutlierInfo: GeneDataSampleWithOutlierInfo[];
};
