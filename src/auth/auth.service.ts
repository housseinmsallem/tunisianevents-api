import { AdminService } from './../admin/admin.service';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private adminService: AdminService,
    private jwtService: JwtService,
  ) {}
  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const admin = await this.adminService.findOne(username);
    if (admin?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = {
      sub: admin.userId,
      username: admin.username,
      role: admin,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
