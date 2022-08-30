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
        required: true,
        default: true,
    })
    isActive: boolean;


}

export const UserDatabaseName = 'bills';
export const UserSchema = SchemaFactory.createForClass(BillEntity);

export type UserDocument = BillEntity & Document;


