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

  findOne(id: string) {
    return `This action returns a #${id} disipline`;
  }

  update(updateDisiplineInput: UpdateDisiplineInput) {
    return `This action updates a #${updateDisiplineInput.id} disipline`;
  }

  remove(id: string) {
    return `This action removes a #${id} disipline`;
  }
}
