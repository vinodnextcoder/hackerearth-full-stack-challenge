import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { BillService } from '../services/bill.service';
// import { IUserDocument } from '../user.interface';

@Injectable()
export class UserPutToRequestGuard implements CanActivate {
    constructor(private readonly billService: BillService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
       
        return true;
    }
}
