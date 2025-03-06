import { standardDeviation, mean, variance, median } from 'simple-statistics';

const calculateMean = (data: number[]) => {
  return mean(data);
};

const calculateMedian = (data: number[]) => {
  return median(data);
};

const calculateVariance = (data: number[]) => {
  return variance(data);
};

const calculateStandardDeviation = (data: number[]) => {
  return standardDeviation(data);
};

const detectOutliersZScore = (data: number[], threshold = 2): boolean[] => {
  const avg = calculateMean(data);
  const stdDev = calculateStandardDeviation(data);

  return data.map((value) => Math.abs((value - avg) / stdDev) > threshold);
};

export {
  calculateMean,
  calculateMedian,
  calculateVariance,
  detectOutliersZScore,
};
