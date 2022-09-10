import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Query,
    InternalServerErrorException,
    Param,
    Req
} from '@nestjs/common';
import { ENUM_AUTH_PERMISSIONS } from 'src/common/auth/constants/auth.enum.permission.constant';
import { AuthAdminJwtGuard } from 'src/common/auth/decorators/auth.jwt.decorator';
import { ENUM_ERROR_STATUS_CODE_ERROR } from 'src/common/error/constants/error.status-code.constant';
import { PaginationService } from 'src/common/pagination/services/pagination.service';
import {
    Response,
    ResponsePaging,
} from 'src/common/response/decorators/response.decorator';
import {
    IResponse,
    IResponsePaging,
} from 'src/common/response/response.interface';
import { BillCreateDto } from '../dtos/bill.create.dto';
import { BillListDto } from '../dtos/bill.list.dto';
import { BillService } from '../services/bill.service';
import { IBillDocument } from '../bill.interface';
import moment from 'moment';
import { Request } from 'express';

@Controller({
    version: '1',
    path: '/bill',
})
export class BillController {
    constructor(
        private readonly paginationService: PaginationService,
        private readonly billService: BillService
    ) { }
    /**
     * 
     * @param body 
     * @returns 
     */

    @ResponsePaging('bill.list')
    @AuthAdminJwtGuard(ENUM_AUTH_PERMISSIONS.USER_READ)
    @Get('/list')
    async list(
        @Query()
        {
            page,
            perPage,
            sort,
            search,
            availableSort,
            availableSearch,
        }: BillListDto
    ): Promise<IResponsePaging> {
        
        const skip: number = await this.paginationService.skip(page, perPage);
        const find: Record<string, any> = {
            ...search,
        };

        const bills: IBillDocument[] = await this.billService.findAll(find, {
            limit: perPage,
            skip: skip,
            sort,
        });
        const totalData: number = await this.billService.getTotal(find);
        const totalPage: number = await this.paginationService.totalPage(
            totalData,
            perPage
        );

        return {
            totalData,
            totalPage,
            currentPage: page,
            perPage,
            availableSearch,
            availableSort,
            data: bills,
        };
    }


    @Response('bill.create')
    @AuthAdminJwtGuard(
        ENUM_AUTH_PERMISSIONS.USER_READ,
        ENUM_AUTH_PERMISSIONS.USER_CREATE
    )
    @Post('/createBill')
    async create(
        @Body()
        body: BillCreateDto,
        @Req() request: Request
    ): Promise<IResponse> {


        try {
            let createdBy: any
            createdBy = request.user

            let amount: number = body.unitConsume * 2;

            const create = await this.billService.create({
                billDate: moment().format(),
                unitConsume: body.unitConsume,
                billStatus: body.billStatus,
                amount,
                createdBy: createdBy._id,
                customerId: body.customerId
            });

            return {
                _id: create._id,
                message: 'Bill created successfully'
            };
        } catch (err: any) {
            throw new InternalServerErrorException({
                statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_UNKNOWN,
                message: 'http.serverError.internalServerError',
                error: err.message,
            });
        }
    }


    @Response('bill.update')
    @AuthAdminJwtGuard(
        ENUM_AUTH_PERMISSIONS.USER_READ,
        ENUM_AUTH_PERMISSIONS.USER_UPDATE
    )
    @Put('/update/:id')
    async update(

        @Body()
        body: any,
        @Param('id') id
    ): Promise<IResponse> {
        try {
            await this.billService.updateOneById(id, body);
        } catch (err: any) {
            throw new InternalServerErrorException({
                statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_UNKNOWN,
                message: 'http.serverError.internalServerError',
                error: err.message,
            });
        }
        return {
            _id: 'Record Updated Successfully',
        };
    }


    @Response('bill.get')
    @AuthAdminJwtGuard(
        ENUM_AUTH_PERMISSIONS.USER_READ
    )
    @Get('/:id')
    async GetBill(
        @Param('id') id
    ): Promise<any> {
        let result;
        try {
            result= await this.billService.findOne(id);
        } catch (err: any) {
            throw new InternalServerErrorException({
                statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_UNKNOWN,
                message: 'http.serverError.internalServerError',
                error: err.message,
            });
        }
        return {
            ...result._doc
        };
    }

}
