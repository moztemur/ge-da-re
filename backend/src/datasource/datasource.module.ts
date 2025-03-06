import { Module } from '@nestjs/common';
import { dataSourceProviders } from './datasource.providers';

@Module({
  providers: [...dataSourceProviders],
  exports: [...dataSourceProviders],
})
export class DataSourceModule {}
