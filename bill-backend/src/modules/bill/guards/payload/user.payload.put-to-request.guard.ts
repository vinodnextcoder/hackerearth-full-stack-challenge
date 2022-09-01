import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { BillService } from '../../services/bill.service';
// import { IUserDocument } from '../../user.interface';

@Injectable()
export class UserPayloadPutToRequestGuard implements CanActivate {
    constructor(private readonly billService: BillService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
    //     const request = context.switchToHttp().getRequest();
    //     const { user } = request;

    //     const check: IUserDocument =
    //         await this.userService.findOneById<IUserDocument>(user._id, {
    //             populate: {
    //                 role: true,
    //                 permission: true,
    //             },
    //         });
    //     request.__user = check;

        return true;
    }
}
