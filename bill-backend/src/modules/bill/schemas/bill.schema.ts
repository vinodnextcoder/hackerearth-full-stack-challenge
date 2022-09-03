import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class BillEntity {

    @Prop({
        required: true,
    })
    billStatus: string;

    @Prop({
        required: true,
    })
    billDate: Date;

    @Prop({
        index: true,
        default: null,
    })
    billPaidDate: Date;

    @Prop({
        index: true,
        trim: true,
        required: true
    })
    unitConsume: number;

    @Prop({
        index: true,
        trim: true
    })
    amount: number;

    @Prop({
        index: true,
    })
    customerId: string;

    @Prop({
        index: true,
    })
    createdBy: string;

    @Prop({
        index: true,
        required: true,
        default: true,
    })
    isActive: boolean;


}

export const BillDatabaseName = 'bills';
export const BillSchema = SchemaFactory.createForClass(BillEntity);

export type BillDocument = BillEntity & Document;


