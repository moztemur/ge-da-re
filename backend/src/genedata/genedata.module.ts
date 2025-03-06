import { Module } from '@nestjs/common';
import { GeneDataController } from './genedata.controller';
import { GeneDataService } from './genedata.service';
import { DataSourceModule } from 'src/datasource/datasource.module';
import { geneDataProviders } from './genedata.providers';
import { GeneDataRepository } from './genedata.repository';

@Module({
  imports: [DataSourceModule],
  controllers: [GeneDataController],
  providers: [GeneDataService, GeneDataRepository, ...geneDataProviders],
})
export class GeneDataModule {}
