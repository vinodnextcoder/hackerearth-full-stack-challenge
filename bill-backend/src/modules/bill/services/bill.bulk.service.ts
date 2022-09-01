import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { DeleteResult } from 'mongodb';
import { BillDocument, BillEntity } from '../schemas/bill.schema';
import { DatabaseEntity } from 'src/common/database/decorators/database.decorator';

@Injectable()
export class BillBulkService {
    constructor(
        @DatabaseEntity(BillEntity.name)
        private readonly userModel: Model<BillDocument>
    ) {}

    async deleteMany(find: Record<string, any>): Promise<DeleteResult> {
        return this.userModel.deleteMany(find);
    }
}
