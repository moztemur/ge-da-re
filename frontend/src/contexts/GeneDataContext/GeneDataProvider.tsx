import React, { useReducer, ReactNode } from "react";
import GeneDataContext from "./GeneDataContext";
import { FetchResult, makeRequest } from "../../clients/backend";
import * as GeneDataActions from "../../actions/geneDataActionTypes";
import { geneDataReducer, initialStateRetrieval, advancedVisualizeReducer, initialStateAdvancedVisualization, geneDataAnalysisReducer, initialStateAnalysis, anomalyDetectionReducer, initialStateAnomalyDetection } from "../../reducers/geneDataReducers";

interface GeneDataProviderProps {
  children: ReactNode;
}

const GeneDataProvider: React.FC<GeneDataProviderProps> = ({ children }) => {
  const [retrievalState, dispatchRetrieval] = useReducer(geneDataReducer, initialStateRetrieval);
  const [advancedVisualizationState, dispatchAdvancedVisualization] = useReducer(advancedVisualizeReducer, initialStateAdvancedVisualization);
  const [analysisState, dispatchAnalysis] = useReducer(geneDataAnalysisReducer, initialStateAnalysis);
  const [anomalyDetectionState, dispatchAnomalyDetection] = useReducer(anomalyDetectionReducer, initialStateAnomalyDetection);

  const fetchGeneData = async (geneIDs: string[]) => {
    if (geneIDs.length === 0) {
      dispatchRetrieval({
        type: GeneDataActions.FETCH_ERROR, payload: 'No gene input',
      });
      return;
    }
    dispatchRetrieval({ type: GeneDataActions.FETCH_START });
    dispatchAnalysis({ type: GeneDataActions.ANALYZE_SUCCESS, payload: null });
    dispatchAdvancedVisualization({ type: GeneDataActions.RESET_ADVANCED_VISUALIZATION });
    dispatchAnomalyDetection({ type: GeneDataActions.DETECT_ANOMALIES_SUCCESS, payload: null });
    try {
      const { data }: { data: GeneData[] | null } = await makeRequest<GeneData[]>("/genedata/retrieve", {
        method: "POST",
        body: JSON.stringify({ geneIDs }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatchRetrieval({ type: GeneDataActions.FETCH_SUCCESS, payload: data || [] });
    } catch (error) {
      let message;
      if (error instanceof Error) {
        message = error.message;
      } else {
        const errorObject = (error as FetchResult<GeneData[]>).error as GeneDataBackendError;
        message = errorObject.message;
        if (errorObject.error === 'NotFoundError') {
          const errorData = errorObject.errorData as { geneIDs: string[] };
          message = message + ': ' + errorData.geneIDs.join(', ')
        }
      }
      dispatchRetrieval({ type: GeneDataActions.FETCH_ERROR, payload: message });
    }
  };

  const visualizeAdvanced = () => {
    dispatchAnalysis({ type: GeneDataActions.ANALYZE_SUCCESS, payload: null });
    dispatchAnomalyDetection({ type: GeneDataActions.DETECT_ANOMALIES_SUCCESS, payload: null });
    dispatchAdvancedVisualization({ type: GeneDataActions.SET_ADVANCED_VISUALIZATION });
  };

  const analyzeGeneData = async (geneID: string) => {
    dispatchAdvancedVisualization({ type: GeneDataActions.RESET_ADVANCED_VISUALIZATION });
    dispatchAnomalyDetection({ type: GeneDataActions.DETECT_ANOMALIES_SUCCESS, payload: null });
    dispatchAnalysis({ type: GeneDataActions.ANALYZE_START });
    try {
      const { data } = await makeRequest<GeneDataAnalysisResult>("/genedata/analyze/" + geneID);
      dispatchAnalysis({ type: GeneDataActions.ANALYZE_SUCCESS, payload: data });
    } catch (error) {
      let message;
      if (error instanceof Error) {
        message = error.message;
      } else {
        const errorObject = (error as FetchResult<GeneData[]>).error as GeneDataBackendError;
        message = errorObject.message;
        if (errorObject.error === 'NotFoundError') {
          const errorData = errorObject.errorData as { geneID: string };
          message = message + ': ' + errorData.geneID
        }
      }
      dispatchAnalysis({ type: GeneDataActions.ANALYZE_ERROR, payload: message });

    }
  };

  const detectAnomalies = async (geneID: string) => {
    dispatchAnomalyDetection({ type: GeneDataActions.DETECT_ANOMALIES_START });
    try {
      const { data } = await makeRequest<GeneDataWithOutlierInfo>("/genedata/detectanomaly/" + geneID);
      dispatchAnomalyDetection({ type: GeneDataActions.DETECT_ANOMALIES_SUCCESS, payload: data });
    } catch (error) {
      let message;
      if (error instanceof Error) {
        message = error.message;
      } else {
        const errorObject = (error as FetchResult<GeneData[]>).error as GeneDataBackendError;
        message = errorObject.message;
        if (errorObject.error === 'NotFoundError') {
          const errorData = errorObject.errorData as { geneID: string };
          message = message + ': ' + errorData.geneID
        }
      }
      dispatchAnomalyDetection({ type: GeneDataActions.DETECT_ANOMALIES_ERROR, payload: message });
    }
  };

  return (
    <GeneDataContext.Provider value={{ retrievalState, advancedVisualizationState, analysisState, anomalyDetectionState, fetchGeneData, visualizeAdvanced, analyzeGeneData, detectAnomalies }}>
      {children}
    </GeneDataContext.Provider>
  );
};

export default GeneDataProvider;
