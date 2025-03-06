export const FETCH_START = 'FETCH_START';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_ERROR = 'FETCH_ERROR';
export const SET_ADVANCED_VISUALIZATION = 'SET_ADVANCED_VISUALIZATION';
export const RESET_ADVANCED_VISUALIZATION = 'RESET_ADVANCED_VISUALIZATION';
export const ANALYZE_START = 'ANALYZE_START';
export const ANALYZE_SUCCESS = 'ANALYZE_SUCCESS';
export const ANALYZE_ERROR = 'ANALYZE_ERROR';
export const DETECT_ANOMALIES_START = 'DETECT_ANOMALIES_START';
export const DETECT_ANOMALIES_SUCCESS = 'DETECT_ANOMALIES_SUCCESS';
export const DETECT_ANOMALIES_ERROR = 'DETECT_ANOMALIES_ERROR';

export type GeneDataRetrievalAction =
  | { type: typeof FETCH_START }
  | { type: typeof FETCH_SUCCESS; payload: GeneData[] }
  | { type: typeof FETCH_ERROR; payload: GeneDataError };

export type GeneDataAdvancedVisualizationAction =
  | { type: typeof SET_ADVANCED_VISUALIZATION }
  | { type: typeof RESET_ADVANCED_VISUALIZATION };

export type GeneDataAnalysisAction =
  | { type: typeof ANALYZE_START }
  | { type: typeof ANALYZE_SUCCESS; payload: GeneDataAnalysisResult | null }
  | { type: typeof ANALYZE_ERROR; payload: GeneDataError };

export type GeneDataAnomalyDetectionAction =
  | { type: typeof DETECT_ANOMALIES_START }
  | { type: typeof DETECT_ANOMALIES_SUCCESS; payload: GeneDataWithOutlierInfo | null }
  | { type: typeof DETECT_ANOMALIES_ERROR; payload: GeneDataError };
