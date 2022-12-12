import { Module } from "@nestjs/common";
import { UsersModule } from "../users/users.module";
import { AuthService } from "./auth.service";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { UsersService } from "../users/users.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "../users/users.schema";
import { LocalStrategy } from "./local.auth";
import { JwtStrategy } from "./jwt.strategy";

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: "" + process.env.SECRET_KEY,
      signOptions: { expiresIn: "604800s" }, // expires in 7 days
    }),
    MongooseModule.forFeature([{ name: "user", schema: UserSchema }]),
  ],
  providers: [AuthService, UsersService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
