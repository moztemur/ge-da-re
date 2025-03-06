import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { GENE_DATA_MODEL } from 'src/constants/constants';
import { GeneData } from './interfaces/genedata.interface';

@Injectable()
export class GeneDataRepository {
  constructor(
    @Inject(GENE_DATA_MODEL) private readonly geneDataModel: Model<GeneData>,
  ) {}

  async find(geneIDs: string[]): Promise<GeneData[]> {
    const result = await this.geneDataModel
      .find({
        gene: { $in: geneIDs },
      })
      .lean()
      .exec();

    return result;
  }

  async findByGeneID(geneID: string): Promise<GeneData | null> {
    const result = await this.geneDataModel
      .findOne({
        gene: geneID,
      })
      .exec();

    if (!result) {
      return null;
    }

    return result.toJSON();
  }
}
