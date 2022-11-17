import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { Trip } from 'src/trips/trips.schema';
import { Vehicle } from 'src/vehicles/vehicles.schema';

export type UserFromDB = User & { _id: string };

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  email: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Trip' }] })
  trips: Trip[]

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' }] })
  vehicles: Vehicle[]
}

export const UserSchema = SchemaFactory.createForClass(User);