import { Mongoose } from 'mongoose';
import { GeneDataSchema } from './schemas/genedata.schema';
import { DATABASE_CONNECTION, GENE_DATA_MODEL } from 'src/constants/constants';

export const geneDataProviders = [
  {
    provide: GENE_DATA_MODEL,
    useFactory: (mongoose: Mongoose) =>
      mongoose.model('GeneData', GeneDataSchema),
    inject: [DATABASE_CONNECTION],
  },
];
