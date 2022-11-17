import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User, UserDocument, UserFromDB } from "./users.schema";
import {hash} from 'bcrypt'
import { CreateUserDto } from "./dto/create-user.dto";


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

  async createUser(createUserDto: CreateUserDto) {
    createUserDto.password = await this.hashPassword(createUserDto.password)

    return this.userModel.create(createUserDto);
  }

  async getUserById(id: string): Promise<User> {
    return this.userModel.findById(id);
  }

  async getUserByUserName(query: { username: string }): Promise<User> {
    return this.userModel.findOne(query);
  }

  async getUserByEmail(query: { email: string }): Promise<User> {
    return this.userModel.findOne(query);
  }

  async updateUserByToken(user: UserFromDB, updateUserDto: UpdateUserDto) {
    updateUserDto.password = await this.hashPassword(updateUserDto.password)

    return this.userModel.findByIdAndUpdate(user._id, updateUserDto);
  }

  deleteUser(user: UserFromDB) {
    if (!user) throw new NotFoundException("User not found");

    return this.userModel.findByIdAndRemove(user._id);
  }
}
