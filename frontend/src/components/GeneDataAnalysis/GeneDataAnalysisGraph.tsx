
import { GeneDataAnomalyDetectionState } from "../../reducers/geneDataStates";
import GeneExpressionScatterPlot from "./GeneDataScatterPlot";
import { Backdrop, CircularProgress } from "@mui/material";

type GeneDataAnalysisGraphProps = {
  samples: GeneDataSample[];
  anomalyDetection: GeneDataAnomalyDetectionState;
};

const GeneDataAnalysisGraph: React.FC<GeneDataAnalysisGraphProps> = ({ samples, anomalyDetection }) => {
  const experimentalSamples = samples.filter(sample => sample.type === 'EXPERIMENTAL');
  const controlSamples = samples.filter(sample => sample.type === 'CONTROL');


  let outlierMap = new Map();

  if (anomalyDetection.data) {
    const { samplesWithOutlierInfo } = anomalyDetection.data;
    outlierMap = new Map(samplesWithOutlierInfo.map(({ id, outlier }) => [id, outlier]));
  }

  const graphData = [
    ...experimentalSamples.map((sample, index) => ({
      sample: `Experimental Rep ${index + 1}`,
      value: sample.value,
      outlier: outlierMap.get(sample.id),
    })),
    ...controlSamples.map((sample, index) => ({
      sample: `Control Rep ${index + 1}`,
      value: sample.value,
      outlier: outlierMap.get(sample.id),
    })),
  ];

  return <>
    <GeneExpressionScatterPlot data={graphData} />
    <Backdrop
      sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
      open={anomalyDetection.loading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  </>;
}

export default GeneDataAnalysisGraph
