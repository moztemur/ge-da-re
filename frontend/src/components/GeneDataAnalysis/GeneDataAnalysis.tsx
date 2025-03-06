import Grid from '@mui/material/Grid2';
import GeneDataAnalysisGraph from './GeneDataAnalysisGraph';
import GeneDataAnalysisStatistics from './GeneDataAnalysisStatistics';
import { useContext, useEffect, useState } from "react";
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';
import GeneDataContext from "../../contexts/GeneDataContext/GeneDataContext";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


function GeneDataAnalysis() {
  const geneDataContext = useContext(GeneDataContext);
  const [hasOutliers, setHasOutliers] = useState<boolean | null>(null);

  const { analysisState, anomalyDetectionState, detectAnomalies } = geneDataContext;
  const { data, loading, error } = analysisState;

  useEffect(() => {
    setHasOutliers(null);
    if (anomalyDetectionState.data) {
      const { samplesWithOutlierInfo } = anomalyDetectionState.data;
      setHasOutliers(samplesWithOutlierInfo.some(({ outlier }) => outlier))
    }
  }, [anomalyDetectionState.data])

  if (loading) {
    return <LinearProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>
  }

  if (!data) {
    return null;
  }

  const handleAnomalyDetection = () => {
    detectAnomalies(data.gene);
  }

  const { samples, statistics } = data;

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12 }}>
        <Typography variant="body1" gutterBottom>
          Gene Analysis Result: {data.gene}
        </Typography>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <GeneDataAnalysisStatistics statistics={statistics} />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <GeneDataAnalysisGraph samples={samples} anomalyDetection={anomalyDetectionState} />
      </Grid>
      <Grid container size={{ xs: 12 }}>
        <Grid size={{ xs: 3 }}>
          <Button variant="contained" color="primary" fullWidth={true} onClick={handleAnomalyDetection}>
            Detect Anomalies
          </Button>
        </Grid>
        <Grid size={{ xs: 9 }}>
          {
            hasOutliers === true ?
              <Alert severity="info">
                Outliers detected and shown in red
              </Alert> :
              hasOutliers === false ?
                <Alert severity="warning">
                  No outliers detected
                </Alert>
                : null
          }
        </Grid>
      </Grid>
    </Grid>
  )
}

export default GeneDataAnalysis
