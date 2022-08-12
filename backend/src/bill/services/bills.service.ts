import { Injectable, NotFoundException } from '@nestjs/common';
import { Bill } from '../entities/bill.entity';
import { CreateBillDto } from '../dto/create-bill.dto';
import { BillsRepository } from '../repositories/bills.repository';
import { UpdateBillDto } from '../dto/update-bill.dto';
import { EventsGateway } from 'src/events/events.gateway';
import { successMessage, errorMessage } from '../../utils'
import { ObjectID } from 'mongodb';

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
      let result = await this.billRepository.find( { id:1 } as any);
      console.log(result)
      if (result && result.length>0){
        return successMessage('Records Fetched', result);
      }
      return errorMessage('Record not found', []);
    }catch(error){
      return errorMessage('Internal server error ', null);
    }
  }
  // where: { id:new ObjectID(id) }
  async getMatch(id: string): Promise<any> {
    console.log(id)
    const match = await this.billRepository.findOne({
      _id: new ObjectID(id)
    } as any);
    
    if (!match) {
      return errorMessage('Record not found', {});
    }

    return successMessage('Records Fetched', match);
  }

  async updateMatch(
    matchId: string,
    updateBillDto: UpdateBillDto,
  ): Promise<void> {
    let updateObj = await this.billRepository.updateMatch(matchId, updateBillDto);
    this.eventsGateway.billEvent({ id: matchId, ...updateBillDto });
    return updateObj
  }
}
