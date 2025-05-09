import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
export type Admin = any;
@Injectable()
export class AdminService {
  private readonly admins = [
    {
      adminID: 1,
      username: 'admin',
      password: 'admin',
    },
  ];
  async findOne(username: string): Promise<Admin | undefined> {
    return this.admins.find((admin) => admin.username === username);
  }
}
