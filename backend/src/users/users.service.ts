import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User, UserDocument } from "./users.schema";
import {hash} from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}


  // Hash password with bcrypt
  async hashPassword(password: string) {
    const saltOrRounds = 10;
    const hashedPassword = await hash(password, saltOrRounds);
    return hashedPassword
  }

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

  async updateUserByToken(user: User, updateUserDto: UpdateUserDto) {
    updateUserDto.password = await this.hashPassword(updateUserDto.password)

    return this.userModel.findByIdAndUpdate(user._id, updateUserDto);
  }

  removeUserByToken(user: any) {
    if (!user) throw new NotFoundException("User not found");

    this.userModel.findByIdAndRemove(user._id);
    return "User removed successfully";
  }
}
