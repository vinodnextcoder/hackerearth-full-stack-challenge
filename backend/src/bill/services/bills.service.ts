import { Injectable, NotFoundException } from '@nestjs/common';
import { Bill } from '../entities/bill.entity';
import { CreateBillDto } from '../dto/create-bill.dto';
import { BillsRepository } from '../repositories/bills.repository';
import { UpdateBillDto } from '../dto/update-bill.dto';
import { EventsGateway } from 'src/events/events.gateway';
import { successMessage, errorMessage } from '../../utils'

@Injectable()
export class BillsService {
  constructor(
    private readonly billRepository: BillsRepository,
    private readonly eventsGateway: EventsGateway,
  ) {}

  async createMatch(createBillDto: CreateBillDto): Promise<Bill> {
    const match = await this.billRepository.createMatch(createBillDto);
    this.eventsGateway.newMatch(match);

    return match;
  }

  async getAllMatches(): Promise<any> {
    try {
      let result = await this.billRepository.find();
      if (result && result.length>0){
        return successMessage('Records Fetched', result);
      }
      return errorMessage('Record not found', []);
    }catch(error){
      return errorMessage('Internal server error ', null);
    }
  }

  async getMatch(id: string): Promise<Bill> {
    const match = await this.billRepository.findOne({
      where: { id },
      relations: ['comments'],
    });

    if (!match) {
      throw new NotFoundException(`Bill with id: ${id} not found`);
    }

    return match;
  }

  async updateMatch(
    matchId: string,
    updateBillDto: UpdateBillDto,
  ): Promise<void> {
    let updateObj = await this.billRepository.updateMatch(matchId, updateBillDto);
  // console.log(updateObj)
    // this.eventsGateway.score({ id: matchId, ...updateBillDto });

    return updateObj
  }
}
