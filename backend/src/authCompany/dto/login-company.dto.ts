import { ApiProperty } from '@nestjs/swagger';

export class LoginCompanyDto {
  @ApiProperty({
    example: 'Trailss'
  })
  readonly companyname: string;
  @ApiProperty({
    example: 'password1'
  })
  readonly password: string;
}