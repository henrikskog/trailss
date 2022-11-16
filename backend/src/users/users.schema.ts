import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Trip } from 'src/trips/trips.schema';
import { Vehicle } from 'src/vehicles/vehicles.schema';


export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  email: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' }] })
  vehicles: Vehicle[]

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Trip' }] })
  trips: Trip[]
}

export const UserSchema = SchemaFactory.createForClass(User);