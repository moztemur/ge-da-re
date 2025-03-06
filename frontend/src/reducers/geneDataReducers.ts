import { GeneDataRetrievalState, GeneDataAdvancedVisualizationState, GeneDataAnalysisState, GeneDataAnomalyDetectionState } from "./geneDataStates";
import * as geneDataActions from "../actions/geneDataActionTypes";

const initialStateRetrieval: GeneDataRetrievalState = {
  data: [],
  loading: false,
  error: null,
};

const initialStateAdvancedVisualization: GeneDataAdvancedVisualizationState = {
  advancedVisualization: false,
};

const initialStateAnalysis: GeneDataAnalysisState = {
  data: null,
  loading: false,
  error: null,
};

const initialStateAnomalyDetection: GeneDataAnomalyDetectionState = {
  data: null,
  loading: false,
  error: null,
};

const geneDataReducer = (state: GeneDataRetrievalState, action: geneDataActions.GeneDataRetrievalAction): GeneDataRetrievalState => {
  switch (action.type) {
    case geneDataActions.FETCH_START:
      return { ...initialStateRetrieval, loading: true, error: null };
    case geneDataActions.FETCH_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case geneDataActions.FETCH_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const advancedVisualizeReducer = (state: GeneDataAdvancedVisualizationState, action: geneDataActions.GeneDataAdvancedVisualizationAction): GeneDataAdvancedVisualizationState => {
  switch (action.type) {
    case geneDataActions.SET_ADVANCED_VISUALIZATION:
      return { ...initialStateAdvancedVisualization, advancedVisualization: true };
    case geneDataActions.RESET_ADVANCED_VISUALIZATION:
      return { ...initialStateAdvancedVisualization, advancedVisualization: false };
    default:
      return state;
  }
}

const geneDataAnalysisReducer = (state: GeneDataAnalysisState, action: geneDataActions.GeneDataAnalysisAction): GeneDataAnalysisState => {
  switch (action.type) {
    case geneDataActions.ANALYZE_START:
      return { ...initialStateAnalysis, loading: true, error: null };
    case geneDataActions.ANALYZE_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case geneDataActions.ANALYZE_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const anomalyDetectionReducer = (state: GeneDataAnomalyDetectionState, action: geneDataActions.GeneDataAnomalyDetectionAction): GeneDataAnomalyDetectionState => {
  switch (action.type) {
    case geneDataActions.DETECT_ANOMALIES_START:
      return { ...initialStateAnomalyDetection, loading: true, error: null };
    case geneDataActions.DETECT_ANOMALIES_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case geneDataActions.DETECT_ANOMALIES_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export {
  geneDataReducer,
  advancedVisualizeReducer,
  geneDataAnalysisReducer,
  anomalyDetectionReducer,
  initialStateRetrieval,
  initialStateAdvancedVisualization,
  initialStateAnalysis,
  initialStateAnomalyDetection
}
