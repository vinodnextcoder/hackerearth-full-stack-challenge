import { Type } from 'class-transformer';
import {
    IsNotEmpty
} from 'class-validator';


export class BillCreateDto {


    @IsNotEmpty()
    readonly billStatus: string;

    
    @Type(() => Date)
    readonly billDate: Date;


    @IsNotEmpty()
    readonly unitConsume: number;

    readonly customerId:string
    readonly createdBy:string
}
