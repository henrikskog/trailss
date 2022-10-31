import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Vehicle } from "src/vehicles/vehicles.schema";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User, UserDocument } from "./users.model";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel("user") private readonly userModel: Model<UserDocument>
  ) {}

  async createUser(username: string, password: string, email: string) {
    return this.userModel.create({
      username,
      password,
      email
    });
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userModel.findById(id);
    return user;
  }

  async getUserByUserName(query: { username: string }): Promise<User> {
    return this.userModel.findOne(query);
  }

  async getUserByEmail(query: { email: string }): Promise<User> {
    return this.userModel.findOne(query);
  }

  getUserByToken(user: any) {
    return { username: user.username, email: user.email };
  }

  updateUserByToken(user: any, updateUserDto: UpdateUserDto) {
    if (!user) throw new NotFoundException("User not found");

    this.userModel.findByIdAndUpdate(user._id, updateUserDto);
    return "User updated successfully";
  }

  removeUserByToken(user: any) {
    if (!user) throw new NotFoundException("User not found");

    this.userModel.findByIdAndRemove(user._id);
    return "User removed successfully";
  }
}
