import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';

type GeneDataTableProps = {
  data: GeneData[],
  onAnalysis: (geneID: string) => void
  onAdvancedVisualization: () => void
};

const GeneDataTable: React.FC<GeneDataTableProps> = ({ data, onAnalysis, onAdvancedVisualization }) => {
  const numberOfExperiments = data[0].samples.length / 2;

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12 }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Gene</TableCell>
                <TableCell>Transcripts</TableCell>
                {
                  Array.from({ length: numberOfExperiments }, (_, i) => i).map((_, index) => (
                    <TableCell key={`e${_}`}>Experimental Rep {index + 1}</TableCell>
                  ))
                }
                {
                  Array.from({ length: numberOfExperiments }, (_, i) => i).map((_, index) => (
                    <TableCell key={`c${_}`}>Control Rep {index + 1}</TableCell>
                  ))
                }
                <TableCell>Analysis</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                data.map(geneData => {
                  const experimentalSamples = geneData.samples.filter(sample => sample.type === 'EXPERIMENTAL');
                  const controlSamples = geneData.samples.filter(sample => sample.type === 'CONTROL');

                  return <TableRow key={geneData.gene}>
                    <TableCell>
                      {geneData.gene}
                    </TableCell>
                    <TableCell>
                      {geneData.transcripts.join(', ')}
                    </TableCell>
                    {
                      experimentalSamples.map((sample) => (
                        <TableCell key={sample.id}>{sample.value}</TableCell>
                      ))
                    }
                    {
                      controlSamples.map((sample) => (
                        <TableCell key={sample.id}>{sample.value}</TableCell>
                      ))
                    }
                    <TableCell >
                      <Button variant="contained" color="primary" onClick={() => onAnalysis(geneData.gene)}>
                        Analyze
                      </Button>
                    </TableCell>
                  </TableRow>
                })
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Button variant="contained" color="primary" onClick={onAdvancedVisualization}>
          Advanced Visualization (Heatmap)
        </Button>
      </Grid>
    </Grid>
  )
}

export default GeneDataTable
