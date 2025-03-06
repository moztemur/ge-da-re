import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

type GeneDataAnalysisResultProps = {
  statistics: {
    mean: number,
    median: number,
    variance: number,
  },
};

const GeneDataAnalysisResult: React.FC<GeneDataAnalysisResultProps> = ({ statistics }) => {
  const {
    mean,
    median,
    variance,
  } = statistics;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Mean</TableCell>
            <TableCell>Median</TableCell>
            <TableCell>Variance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>{mean}</TableCell>
            <TableCell>{median}</TableCell>
            <TableCell>{variance}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default GeneDataAnalysisResult;
