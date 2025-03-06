import * as React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import TextField from '@mui/material/TextField';
import GeneDataContext from '../../contexts/GeneDataContext/GeneDataContext';

function GeneDataQueryInput() {
  const [inputValue, setInputValue] = React.useState('');

  const geneDataContext = React.useContext(GeneDataContext);

  if (!geneDataContext) {
    return <p>Error: DataContext not found.</p>;
  }

  const { fetchGeneData } = geneDataContext;

  const handleClick = () => {
    const geneIDs = inputValue.split('\n').map(geneID => geneID.trim()).filter(geneID => geneID.length > 0)
    fetchGeneData(geneIDs);
  }

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12 }}>
        <TextField
          id="outlined-multiline-static"
          label="Gene IDs (One Per Line)"
          multiline
          rows={10}
          fullWidth={true}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </Grid>
      <Grid size={{ xs: 12 }} alignItems={'center'}>
        <Button variant="contained" color="primary" onClick={handleClick}>
          Retrieve Gene Data
        </Button>
      </Grid>
    </Grid>
  )
}

export default GeneDataQueryInput
