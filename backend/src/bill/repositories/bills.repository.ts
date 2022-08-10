import { EntityRepository, Repository } from 'typeorm';
import { Bill } from '../entities/bill.entity';
import { NotFoundException } from '@nestjs/common';
import { CreateBillDto } from '../dto/create-bill.dto';
import { UpdateBillDto } from '../dto/update-bill.dto';
import { successMessage, errorMessage } from '../../utils'

@EntityRepository(Bill)
export class BillsRepository extends Repository<Bill> {
  async createMatch(createBillDto: CreateBillDto): Promise<any> {
    try {
      const match = await this.create(createBillDto);
      const recordSave = await this.save(match);
      return successMessage('Record created successfully', null);
    } catch (error) {
      return errorMessage('Internal server error.', null);
    }
  }


async updateMatch(
    matchId: string,
    updateBillDto: UpdateBillDto,
  ): Promise<any> {
    try {
      const response = await this.update({ id: matchId }, updateBillDto);
      if (response.affected === 0) {
        throw new NotFoundException(`Match with id: ${matchId} not found`);
      }
    } catch (error) {
      return errorMessage('Internal server error.', null);
    }
  }
}
