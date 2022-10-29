import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    example: 'John Deer'
  })
  readonly name: string;
  @ApiProperty({
    example: 'password1'
  })
  readonly password: string;
}