import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ObjectIdColumn, CreateDateColumn,UpdateDateColumn  } from 'typeorm';

@Entity({
  name: 'users',
})
export class User {
  @ApiProperty({
    type: String,
    description: 'User id',
    example: '996829dc-4ae6-4f32-a6ed-c1c77b8d93d1',
  })
  @ObjectIdColumn()
  id: string;

  @ApiProperty({
    type: String,
    description: 'User email',
    example: 'sample',
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    type: String,
    description: 'User password',
    example: 'sample',
  })
  @Column()
  password: string;

  @ApiProperty({
    type: String,
    description: 'User name',
    example: 'sample',
  })
  @Column()
  name: string;

  @ApiProperty({
    type: String,
    description: 'User mobile no',
    example: '9999999',
  })
  @Column()
  mobileNo: number;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  created_at: Date;

@UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
 updated_at: Date;
}
