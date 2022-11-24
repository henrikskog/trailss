import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtCompanyAuthGuard extends AuthGuard('jwt-company') {}