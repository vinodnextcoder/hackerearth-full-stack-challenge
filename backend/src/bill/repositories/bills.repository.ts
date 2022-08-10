import { EntityRepository, Repository } from 'typeorm';
import { Bill } from '../entities/bill.entity';
import { NotFoundException } from '@nestjs/common';
import { CreateBillDto } from '../dto/create-bill.dto';
import { UpdateBillDto } from '../dto/update-bill.dto';

@EntityRepository(Bill)
export class BillsRepository extends Repository<Bill> {
  createMatch(createBillDto: CreateBillDto): Promise<Bill> {
    const match = this.create(createBillDto);

    return this.save(match);
  }

  async updateMatch(
    matchId: string,
    updateBillDto: UpdateBillDto,
  ): Promise<void> {
    const response = await this.update({ id: matchId }, updateBillDto);

    if (response.affected === 0) {
      throw new NotFoundException(`Match with id: ${matchId} not found`);
    }

    return;
  }
}
