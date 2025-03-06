import GeneDataDisplay from './GeneDataDisplay';
import GeneDataQueryInput from './GeneDataQueryInput';
import Grid from '@mui/material/Grid2';

function GeneDataRetrieval() {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12 }}>
        <GeneDataQueryInput />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <GeneDataDisplay />
      </Grid>
    </Grid>
  )
}

export default GeneDataRetrieval
