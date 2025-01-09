import { Injectable } from '@nestjs/common';
import { CreateDisiplineInput } from './dto/create-disipline.input';
import { UpdateDisiplineInput } from './dto/update-disipline.input';

@Injectable()
export class DisiplinesService {
  create(createDisiplineInput: CreateDisiplineInput) {
    return 'This action adds a new disipline';
  }

  findAll() {
    return `This action returns all disiplines`;
  }

  findOne(id: number) {
    return `This action returns a #${id} disipline`;
  }

  update(id: number, updateDisiplineInput: UpdateDisiplineInput) {
    return `This action updates a #${id} disipline`;
  }

  remove(id: number) {
    return `This action removes a #${id} disipline`;
  }
}
