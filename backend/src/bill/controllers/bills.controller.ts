import { HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  Body,
  Controller,
  Post,
  UseGuards,
  Get,
  Param,
  Put,
  HttpCode,
} from '@nestjs/common';
import { Bill } from '../entities/bill.entity';
import { CreateBillDto } from '../dto/create-bill.dto';
import { BillsService } from '../services/bills.service';
import { UpdateBillDto } from '../dto/update-bill.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Bills')
@Controller('/api/v1/bill')
export class BillsController {
  constructor(private readonly billsService: BillsService) {}

  @ApiCreatedResponse({
    description: 'Bill created.',
    type: Bill,
  })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Post('createBill')
  async createBill(@Body() createBillDto: CreateBillDto): Promise<any> {
    return this.billsService.createMatch(createBillDto);
  }
  @ApiOkResponse({
    description: 'Get all matches',
    type: Bill,
    isArray: true,
  })
  @Get()
  getMatches(): Promise<Bill[]> {
    return this.billsService.getAllMatches();
  }

  @ApiOkResponse({
    description: 'Get match',
    type: Bill,
  })
  @Get(':id')
  getMatch(@Param('id') id: string): Promise<Bill> {
    return this.billsService.getMatch(id);
  }

  @ApiNoContentResponse({
    description: 'Update match',
  })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Put(':id')
  updateMatch(
    @Param('id') id: string,
    @Body() updateBillDto: UpdateBillDto,
  ): Promise<void> {
    return this.billsService.updateMatch(id, updateBillDto);
  }
}
