import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Vehicle } from 'src/vehicles/vehicles.schema';
import { Trip } from 'src/trips/trips.model';


export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  email: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' })
  vehicles: [Vehicle]

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Trip' })
  trips: [Trip]
}

export const UserSchema = SchemaFactory.createForClass(User);