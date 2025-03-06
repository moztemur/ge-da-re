import * as mongoose from 'mongoose';
import { SampleType } from '../enums/sampletype.enum';

const GeneDataSampleSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: [SampleType.EXPERIMENTAL, SampleType.CONTROL],
    },
    id: String,
    value: Number,
  },
  { _id: false },
);

export const GeneDataSchema = new mongoose.Schema(
  {
    gene: String,
    transcripts: [String],
    samples: [GeneDataSampleSchema],
  },
  { collection: 'GeneData' },
);
