export interface GeneDataRetrievalState {
  data: GeneData[];
  loading: boolean;
  error: GeneDataError | null;
}

export interface GeneDataAdvancedVisualizationState {
  advancedVisualization: boolean;
}

export interface GeneDataAnalysisState {
  data: GeneDataAnalysisResult | null;
  loading: boolean;
  error: GeneDataError | null;
}

export interface GeneDataAnomalyDetectionState {
  data: GeneDataWithOutlierInfo | null;
  loading: boolean;
  error: GeneDataError | null;
}
