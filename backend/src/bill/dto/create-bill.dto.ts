import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMatchDto {
 
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
}
