import {
    Controller,
    Get,
    Post,
    Body,
    Delete,
    Put,
    Query,
    InternalServerErrorException,
    BadRequestException,
    Patch,
    NotFoundException,
    UploadedFile,
    Param,
} from '@nestjs/common';
import { ENUM_AUTH_PERMISSIONS } from 'src/common/auth/constants/auth.enum.permission.constant';
import { AuthAdminJwtGuard } from 'src/common/auth/decorators/auth.jwt.decorator';
import { AuthService } from 'src/common/auth/services/auth.service';
import { ENUM_ERROR_STATUS_CODE_ERROR } from 'src/common/error/constants/error.status-code.constant';
import { UploadFileSingle } from 'src/common/file/decorators/file.decorator';
import { IFileExtract } from 'src/common/file/file.interface';
import { FileExtractPipe } from 'src/common/file/pipes/file.extract.pipe';
import { FileRequiredPipe } from 'src/common/file/pipes/file.required.pipe';
import { FileSizeExcelPipe } from 'src/common/file/pipes/file.size.pipe';
import { FileTypeExcelPipe } from 'src/common/file/pipes/file.type.pipe';
import { FileValidationPipe } from 'src/common/file/pipes/file.validation.pipe';
import { PaginationService } from 'src/common/pagination/services/pagination.service';
import { RequestParamGuard } from 'src/common/request/decorators/request.decorator';
import {
    Response,
    ResponsePaging,
} from 'src/common/response/decorators/response.decorator';
import {
    IResponse,
    IResponsePaging,
} from 'src/common/response/response.interface';
import { ENUM_ROLE_STATUS_CODE_ERROR } from 'src/modules/role/constants/role.status-code.constant';
import { RoleService } from 'src/modules/role/services/role.service';
import { ENUM_USER_STATUS_CODE_ERROR } from '../constants/user.status-code.constant';
import {
    // UserDeleteGuard,
    // UserGetGuard,
    // UserUpdateActiveGuard,
    UserUpdateGuard,
    // UserUpdateInactiveGuard,
} from '../decorators/bill.admin.decorator';
// import { GetUser } from '../decorators/user.decorator';
import { BillCreateDto } from '../dtos/bill.create.dto';
// import { UserImportDto } from '../dtos/user.import.dto';
// import { UserListDto } from '../dtos/user.list.dto';
// import { UserRequestDto } from '../dtos/user.request.dto';
// import { UserUpdateDto } from '../dtos/user.update.dto';
// import { UserGetSerialization } from '../serializations/user.get.serialization';
// import { UserListSerialization } from '../serializations/user.list.serialization';
import { BillService } from '../services/bill.service';
// import { IUserCheckExist, IUserDocument } from '../user.interface';
import moment from 'moment';

@Controller({
    version: '1',
    path: '/bill',
})
export class BillController {
    constructor(
        private readonly authService: AuthService,
        private readonly paginationService: PaginationService,
        private readonly billService: BillService,
        private readonly roleService: RoleService
    ) {}
    /**
     * 
     * @param body 
     * @returns 
     */

    // @ResponsePaging('user.list', {
    //     classSerialization: UserListSerialization,
    // })
    // @AuthAdminJwtGuard(ENUM_AUTH_PERMISSIONS.USER_READ)
    // @Get('/list')
    // async list(
    //     @Query()
    //     {
    //         page,
    //         perPage,
    //         sort,
    //         search,
    //         availableSort,
    //         availableSearch,
    //     }: UserListDto
    // ): Promise<IResponsePaging> {
    //     const skip: number = await this.paginationService.skip(page, perPage);
    //     const find: Record<string, any> = {
    //         ...search,
    //     };

    //     const users: IUserDocument[] = await this.userService.findAll(find, {
    //         limit: perPage,
    //         skip: skip,
    //         sort,
    //     });
    //     const totalData: number = await this.userService.getTotal(find);
    //     const totalPage: number = await this.paginationService.totalPage(
    //         totalData,
    //         perPage
    //     );

    //     return {
    //         totalData,
    //         totalPage,
    //         currentPage: page,
    //         perPage,
    //         availableSearch,
    //         availableSort,
    //         data: users,
    //     };
    // }
//******************************** */
    // @Response('user.get', {
    //     classSerialization: UserGetSerialization,
    // })
    // @UserGetGuard()
    // @RequestParamGuard(UserRequestDto)
    // @AuthAdminJwtGuard(ENUM_AUTH_PERMISSIONS.USER_READ)
    // @Get('get/:user')
    // async get(@GetUser() user: IUserDocument): Promise<IResponse> {
    //     return user;
    // }

    @Response('bill.create')
    @AuthAdminJwtGuard(
        ENUM_AUTH_PERMISSIONS.USER_READ,
        ENUM_AUTH_PERMISSIONS.USER_CREATE
    )
   
    @Post('/createBill')
    async create(
        @Body()
        body: BillCreateDto
    ): Promise<IResponse> {
      
        try {
            
            let amount: number =  body.unitConsume * 2;

            const create = await this.billService.create({
                billDate: moment().format(),
                unitConsume: body.unitConsume,
                billStatus: body.billStatus,
                amount
            });

            return {
                _id: create._id,
                message:'Bill created successfully'
            };
        } catch (err: any) {
            throw new InternalServerErrorException({
                statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_UNKNOWN,
                message: 'http.serverError.internalServerError',
                error: err.message,
            });
        }
    }

    // @Response('user.delete')
    // @UserDeleteGuard()
    // @RequestParamGuard(UserRequestDto)
    // @AuthAdminJwtGuard(
    //     ENUM_AUTH_PERMISSIONS.USER_READ,
    //     ENUM_AUTH_PERMISSIONS.USER_DELETE
    // )
    // @Delete('/delete/:user')
    // async delete(@GetUser() user: IUserDocument): Promise<void> {
    //     try {
    //         await this.userService.deleteOneById(user._id);
    //     } catch (err: any) {
    //         throw new InternalServerErrorException({
    //             statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_UNKNOWN,
    //             message: 'http.serverError.internalServerError',
    //             error: err.message,
    //         });
    //     }

    //     return;
    // }

    @Response('user.update')
    // @UserUpdateGuard()
    // @RequestParamGuard(UserRequestDto)
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
            // console.log(id,body)
            await this.billService.updateOneById(id, body);
        } catch (err: any) {
            throw new InternalServerErrorException({
                statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_UNKNOWN,
                message: 'http.serverError.internalServerError',
                error: err.message,
            });
        }
        return {
            _id: 'test',
        };
    }

    // @Response('user.inactive')
    // @UserUpdateInactiveGuard()
    // @RequestParamGuard(UserRequestDto)
    // @AuthAdminJwtGuard(
    //     ENUM_AUTH_PERMISSIONS.USER_READ,
    //     ENUM_AUTH_PERMISSIONS.USER_UPDATE
    // )
    // @Patch('/update/:user/inactive')
    // async inactive(@GetUser() user: IUserDocument): Promise<void> {
    //     try {
    //         await this.userService.inactive(user._id);
    //     } catch (err: any) {
    //         throw new InternalServerErrorException({
    //             statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_UNKNOWN,
    //             message: 'http.serverError.internalServerError',
    //             error: err.message,
    //         });
    //     }

    //     return;
    // }

    // @Response('user.active')
    // @UserUpdateActiveGuard()
    // @RequestParamGuard(UserRequestDto)
    // @AuthAdminJwtGuard(
    //     ENUM_AUTH_PERMISSIONS.USER_READ,
    //     ENUM_AUTH_PERMISSIONS.USER_UPDATE
    // )
    // @Patch('/update/:user/active')
    // async active(@GetUser() user: IUserDocument): Promise<void> {
    //     try {
    //         await this.userService.active(user._id);
    //     } catch (err: any) {
    //         throw new InternalServerErrorException({
    //             statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_UNKNOWN,
    //             message: 'http.serverError.internalServerError',
    //             error: err.message,
    //         });
    //     }

    //     return;
    // }

    // @Response('user.import')
    // @UploadFileSingle('file')
    // @AuthAdminJwtGuard(
    //     ENUM_AUTH_PERMISSIONS.USER_READ,
    //     ENUM_AUTH_PERMISSIONS.USER_CREATE,
    //     ENUM_AUTH_PERMISSIONS.USER_IMPORT
    // )
    // @Post('/import')
    // async import(
    //     @UploadedFile(
    //         FileRequiredPipe,
    //         FileSizeExcelPipe,
    //         FileTypeExcelPipe,
    //         FileExtractPipe,
    //         new FileValidationPipe<UserImportDto>(UserImportDto)
    //     )
    //     file: IFileExtract<UserImportDto>
    // ): Promise<IResponse> {
    //     return { file };
    // }
}
