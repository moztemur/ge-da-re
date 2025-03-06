import { createContext } from "react";
import { GeneDataRetrievalState, GeneDataAdvancedVisualizationState, GeneDataAnalysisState, GeneDataAnomalyDetectionState,  } from "../../reducers/geneDataStates";

interface GeneDataContextType {
  retrievalState: GeneDataRetrievalState,
  advancedVisualizationState: GeneDataAdvancedVisualizationState,
  analysisState: GeneDataAnalysisState,
  anomalyDetectionState: GeneDataAnomalyDetectionState,
  fetchGeneData: (geneIDs: string[]) => void;
  visualizeAdvanced: () => void;
  analyzeGeneData: (geneID: string) => void;
  detectAnomalies: (geneID: string) => void;
}

const GeneDataContext = createContext<GeneDataContextType>({} as GeneDataContextType);

export default GeneDataContext;
