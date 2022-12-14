import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { BillDocument, BillEntity } from '../schemas/bill.schema';
import {
    IDatabaseFindAllOptions
} from 'src/common/database/database.interface';
import { IBillDocument } from '../bill.interface';
import { DatabaseEntity } from 'src/common/database/decorators/database.decorator';
import moment from 'moment';


@Injectable()
export class BillService {
    constructor(
        @DatabaseEntity(BillEntity.name)
        private readonly billModel: Model<BillDocument>,
    ) {
    
    }

    async findAll(
        find?: Record<string, any>,
        options?: IDatabaseFindAllOptions
    ): Promise<IBillDocument[]> {
        const users = this.billModel.find(find);

        if (
            options &&
            options.limit !== undefined &&
            options.skip !== undefined
        ) {
            users.limit(options.limit).skip(options.skip);
        }

        if (options && options.sort) {
            users.sort(options.sort);
        }

        return users.lean();
    }

    async getTotal(find?: Record<string, any>): Promise<number> {
        return this.billModel.countDocuments(find);
    }


   
    async create({
        billDate,
        unitConsume,
        billStatus,
        amount,
        createdBy,
        customerId
    }: any): Promise<BillDocument> {
        const bill = {
        billDate,
        unitConsume,
        billStatus,
        amount,
        createdBy,
        customerId
        };
        const create: BillDocument = new this.billModel(bill);
        return create.save();
    }

    async deleteOneById(_id: string): Promise<any> {
        return this.billModel.findByIdAndDelete(_id);
    }

    // async deleteOne(find: Record<string, any>): Promise<UserDocument> {
    //     return this.userModel.findOneAndDelete(find);
    // }
    async findOne(  id: object): Promise<any> {
        return this.billModel.findById(id);
    }

    async updateOneById(
        _id: string,
        body : any
    ): Promise<any> {
        const filter = { _id: _id };
      const update = body;

     let doc = await this.billModel.findOneAndUpdate(filter, update);
       console.log(doc);  
        return doc
    }  
}
