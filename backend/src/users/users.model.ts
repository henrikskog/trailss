import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = User & Document;

@Schema()
export class User {
  @ApiProperty({
    example: 'John Deer'
  })
  readonly name: string;
  @ApiProperty({
    example: 'password1'
  })
  readonly password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);