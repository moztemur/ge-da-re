
import Grid from '@mui/material/Grid2';
import GeneDataAnalysis from './components/GeneDataAnalysis/GeneDataAnalysis';
import GeneDataRetrieval from './components/GeneDataRetrieval/GeneDataRetrieval';
import GeneDataProvider from './contexts/GeneDataContext/GeneDataProvider';
import GeneDataAdvancedVisualization from './components/GeneDataAdvancedVisualization/GeneDataAdvancedVisualization';

function App() {
  return (
    <GeneDataProvider>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <GeneDataRetrieval />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <GeneDataAnalysis />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <GeneDataAdvancedVisualization />
        </Grid>
      </Grid>
    </GeneDataProvider>
  );
}

export default App
