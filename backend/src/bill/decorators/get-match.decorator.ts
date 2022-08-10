import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Bill } from '../entities/bill.entity';

export const GetMatch = createParamDecorator(
  (_data, ctx: ExecutionContext): Bill => {
    const request = ctx.switchToHttp().getRequest();

    return request.bill;
  },
);
