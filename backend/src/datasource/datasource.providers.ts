import * as mongoose from 'mongoose';
import { DATABASE_CONNECTION } from 'src/constants/constants';

export const dataSourceProviders = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(process.env.MONGODB_CONNECTION_STRING || ''),
  },
];
