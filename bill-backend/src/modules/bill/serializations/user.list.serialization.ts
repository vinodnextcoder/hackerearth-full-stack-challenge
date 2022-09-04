import { OmitType } from '@nestjs/mapped-types';
import { Exclude } from 'class-transformer';

import { UserGetSerialization } from './user.get.serialization';

export class UserListSerialization extends OmitType(UserGetSerialization, [] as const) {

    @Exclude()
    readonly passwordExpired: Date;
}
