import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNECTION_NAME } from 'src/common/database/constants/database.constant';
import {
    BillDatabaseName,
    BillEntity,
    BillSchema,
} from './schemas/bill.schema';
import { BillBulkService } from './services/bill.bulk.service';
import { BillService } from './services/bill.service';
@Module({
    imports: [
        MongooseModule.forFeature(
            [
                {
                    name: BillEntity.name,
                    schema: BillSchema,
                    collection: BillDatabaseName,
                },
            ],
            DATABASE_CONNECTION_NAME
        ),
    ],
    exports: [BillService, BillBulkService],
    providers: [BillService, BillBulkService],
    controllers: [],
})
export class BillModule {}
