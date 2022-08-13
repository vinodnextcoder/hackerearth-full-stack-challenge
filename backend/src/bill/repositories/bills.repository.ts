import { EntityRepository, Repository } from 'typeorm';
import { Bill } from '../entities/bill.entity';
import { CreateBillDto } from '../dto/create-bill.dto';
import { UpdateBillDto } from '../dto/update-bill.dto';
import { successMessage, errorMessage } from '../../utils'
import { ObjectID } from 'mongodb';

@EntityRepository(Bill)
export class BillsRepository extends Repository<Bill> {
  async createMatch(createBillDto: CreateBillDto): Promise<any> {
    try {
      const match = await this.create(createBillDto);
      const recordSave = await this.save(match);
      return successMessage('Record created successfully', null);
    } catch (error) {
      console.log(error)
      return errorMessage('Internal server error.', null);
    }
  }


async updateMatch(
    id: string,
    updateBillDto: UpdateBillDto,
  ): Promise<any> {
    try {
      const response = await this.update({id:new ObjectID(id)}, updateBillDto);
      if (response.affected === 0) {
        return errorMessage('Record not updated', null);
      }
      return successMessage('Record updated successfully', null);
    } catch (error) {
      return errorMessage('Internal server error.', null);
    }
  }
}
