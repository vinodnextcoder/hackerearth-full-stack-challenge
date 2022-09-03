import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { IAwsS3 } from 'src/common/aws/aws.interface';
import { IRoleDocument } from 'src/modules/role/role.interface';

export class UserGetSerialization {
    @Type(() => String)
    readonly _id: string;

    @Transform(({ value }) => ({
        name: value.name,
        permissions: value.permissions.map((val: Record<string, any>) => ({
            name: val.name,
            isActive: val.isActive,
            code: val.code,
        })),
        accessFor: value.accessFor,
        isActive: value.isActive,
    }))
    readonly role: IRoleDocument;

    readonly billStatus: string;
    readonly unitConsume: number;
    readonly isActive: boolean;
    readonly amount: string;
    readonly billDate: string;
    readonly billPaidDate?: string;



    readonly createdAt: Date;

    @Exclude()
    readonly updatedAt: Date;
}
