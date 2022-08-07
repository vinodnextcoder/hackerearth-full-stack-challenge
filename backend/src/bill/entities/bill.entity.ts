import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'bills' })
export class Bill {
  @ApiProperty({
    type: String,
    description: 'Match id',
    example: '996829dc-4ae6-4f32-a6ed-c1c77b8d93d1',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    type: Number,
    description: 'Bill unit consumption',
    example: '23',
  })
  @Column({
    default: 0,
  })
  unitConsume: number;

  @ApiProperty({
    type: Number,
    description: 'bill amount',
    example: '12300',
  })
  @Column({
    default: 0,
  })
  amount: number;

  @Column({ type: 'timestamptz' }) // Recommended
  billDate: Date;

 @Column({ type: 'timestamptz' }) // Recommended
  billPaidDate: Date;

  @CreateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP(6)" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updated_at: Date;

}
