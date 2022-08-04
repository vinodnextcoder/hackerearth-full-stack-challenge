import { string } from '@hapi/joi';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { CreateDateColumn,UpdateDateColumn  } from 'typeorm';

export class AuthCredentialsDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    type: string,
    description: 'Email to register',
    example: 'sample@sample.com',
  })
  email: string;

  @IsNotEmpty()
  @Length(8)
  @ApiProperty({
    type: string,
    description: 'Password to register',
    example: 'SamplePassword123',
  })
  password: string;

  @ApiProperty({
    type: string,
    description: 'name',
    example: 'test',
  })
  name: string;

  @ApiProperty({
    type: string,
    description: 'mobile number',
    example: '99999999',
  })
  mobileNo: number;

  @ApiProperty({ type: Date, default: Date.now() })
  createdAt: Date;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  created_at: Date;

@UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
 updated_at: Date;


}
