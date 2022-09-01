import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { AuthModule } from 'src/common/auth/auth.module';
import { AwsModule } from 'src/common/aws/aws.module';
import { SettingController } from 'src/common/setting/controllers/setting.controller';
import { HealthController } from 'src/health/controllers/health.controller';
import { HealthModule } from 'src/health/health.module';
import { PermissionModule } from 'src/modules/permission/permission.module';
import { RoleModule } from 'src/modules/role/role.module';
import { UserController } from 'src/modules/user/controllers/user.controller';
import { UserModule } from 'src/modules/user/user.module';
import { AuthController } from '../../common/auth/controllers/auth.controller';
import { BillController } from '../../modules/bill/controllers/bill.controller';
import { BillModule } from 'src/modules/bill/bill.module'

@Module({
    controllers: [
        SettingController,
        UserController,
        HealthController,
        AuthController,
        BillController
    ],
    providers: [],
    exports: [],
    imports: [
        UserModule,
        AuthModule,
        AwsModule,
        PermissionModule,
        RoleModule,
        HealthModule,
        TerminusModule,
        HttpModule,
        BillModule
    ],
})
export class RoutesModule {}
