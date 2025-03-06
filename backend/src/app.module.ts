import { Module } from '@nestjs/common';
import { GeneDataModule } from './genedata/genedata.module';

@Module({
  imports: [GeneDataModule],
})
export class AppModule {}
