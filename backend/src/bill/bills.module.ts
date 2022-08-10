import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { BillsService } from './services/bills.service';
import { BillsController } from './controllers/bills.controller';
import { BillsRepository } from './repositories/bills.repository';
import { EventsModule } from '../events/events.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BillsRepository]),
    AuthModule,
    EventsModule,
  ],
  controllers: [BillsController],
  providers: [BillsService],
  exports: [BillsService],
})
export class BillsModule {}
