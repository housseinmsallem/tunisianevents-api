import { Injectable } from '@nestjs/common';
import { CreateOrganisationDto } from './dto/create-organisation.dto';
import { UpdateOrganisationDto } from './dto/update-organisation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Organisation } from './entities/organisation.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class OrganisationService {
  constructor(
    @InjectRepository(Organisation)
    private organisationRepository: Repository<Organisation>,
    private datasource: DataSource, 
  ) {}
  create(createOrganisationDto: CreateOrganisationDto) {
    return this.organisationRepository.create(createOrganisationDto);
  }

  findAll() {
    return this.organisationRepository.find();
  }

  findOne(id: number) {
    return this.organisationRepository.findOneBy({ id });
  }

  update(id: number, updateOrganisationDto: UpdateOrganisationDto) {
    return this.organisationRepository.update({ id }, updateOrganisationDto);
  }

  remove(id: number) {
    return this.organisationRepository.delete({ id });
  }
}
