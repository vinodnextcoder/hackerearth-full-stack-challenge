import { Injectable, NotFoundException } from '@nestjs/common';
import { Bill } from '../entities/bill.entity';
import { CreateBillDto } from '../dto/create-bill.dto';
import { BillsRepository } from '../repositories/bills.repository';
import { UpdateBillDto } from '../dto/update-bill.dto';
import { EventsGateway } from 'src/events/events.gateway';

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

  getAllMatches(): Promise<Bill[]> {
    return this.billRepository.find();
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
    await this.billRepository.updateMatch(matchId, updateBillDto);

    this.eventsGateway.score({ id: matchId, ...updateBillDto });

    return;
  }
}
