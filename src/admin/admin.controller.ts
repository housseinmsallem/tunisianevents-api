import { CreateEventDto } from './../event/dto/create-event.dto';
import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';
import { AdminService } from './admin.service';


@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  @Get()
  findOne(@Param('username') username: string) {
    return this.adminService.findOne(username);
  }

}
