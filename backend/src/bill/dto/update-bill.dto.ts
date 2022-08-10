import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateBillDto {
  @IsNumber()
  @ApiProperty({
    type: Number,
    description: 'Bill unit consumption',
    example: '23',
  })
  unitConsume: number;

  @IsNumber()
  @ApiProperty({
    type: Number,
    description: 'bill amount',
    example: '12300',
  })
  amount: number;


  @IsString()
  @ApiProperty({
    type: String,
    description: 'Bill unit consumption',
    example: 'pending',
  })
  billStatus: String;
}
