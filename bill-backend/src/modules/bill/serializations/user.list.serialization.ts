import { OmitType } from '@nestjs/mapped-types';
import { Exclude } from 'class-transformer';
import { Types } from 'mongoose';
import { IAwsS3 } from 'src/common/aws/aws.interface';
import { UserGetSerialization } from './user.get.serialization';

export class UserListSerialization extends OmitType(UserGetSerialization, [] as const) {


    @Exclude()
    readonly photo?: IAwsS3;

    @Exclude()
    readonly passwordExpired: Date;
}
