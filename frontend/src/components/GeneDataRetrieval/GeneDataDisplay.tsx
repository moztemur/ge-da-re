import * as React from 'react';
import GeneDataTable from './GeneDataTable';
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';
import GeneDataContext from '../../contexts/GeneDataContext/GeneDataContext';

function GeneDataDisplay() {
  const geneDataContext = React.useContext(GeneDataContext);

  const { retrievalState, visualizeAdvanced, analyzeGeneData } = geneDataContext;
  const { data, loading, error } = retrievalState;

  if (loading) {
    return <LinearProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>
  }

  if (data.length === 0) {
    return null;
  }

  const handleAnalysis = (geneID: string) => {
    analyzeGeneData(geneID);
  }
  const handleAdvancedVisualization = () => {
    visualizeAdvanced();
  }

  return (
    <GeneDataTable data={data} onAnalysis={handleAnalysis} onAdvancedVisualization={handleAdvancedVisualization} />
  )
}

export default GeneDataDisplay
