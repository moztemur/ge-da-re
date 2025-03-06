import Grid from '@mui/material/Grid2';
import { useContext } from "react";
import GeneDataContext from "../../contexts/GeneDataContext/GeneDataContext";
import Typography from '@mui/material/Typography';
import GeneDataHeatMap from './GeneDataHeatMap';

function GeneDataAdvancedVisualization() {
  const geneDataContext = useContext(GeneDataContext);

  const { retrievalState, advancedVisualizationState } = geneDataContext;
  const { data } = retrievalState;
  const { advancedVisualization } = advancedVisualizationState;

  if (!data || !advancedVisualization) {
    return null;
  }

  const graphData = data.flatMap((gene) => {
    const experimentalSamples = gene.samples.filter(sample => sample.type === 'EXPERIMENTAL');
    const controlSamples = gene.samples.filter(sample => sample.type === 'CONTROL');
  
    return [
      ...experimentalSamples.map((sample, index) => ({
        sample: `Experimental Rep ${index + 1}`,
        value: sample.value,
        gene: gene.gene,
      })),
      ...controlSamples.map((sample, index) => ({
        sample: `Control Rep ${index + 1}`,
        value: sample.value,
        gene: gene.gene,
      })),
    ]
  });

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12 }}>
        <Typography variant="body1" gutterBottom>
          Advanced Visualization
        </Typography>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <GeneDataHeatMap data={graphData} />
      </Grid>
    </Grid>
  )
}

export default GeneDataAdvancedVisualization
