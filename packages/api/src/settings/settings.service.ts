import { Injectable } from '@nestjs/common';
import { CreateSettingInput } from './dto/create-setting.input';
import { UpdateSettingInput } from './dto/update-setting.input';

@Injectable()
export class SettingsService {
  create(createSettingInput: CreateSettingInput) {
    return 'This action adds a new setting';
  }

  findAll() {
    return `This action returns all settings`;
  }

  findOne(id: string) {
    return `This action returns a #${id} setting`;
  }

  update(updateSettingInput: UpdateSettingInput) {
    return `This action updates a #${updateSettingInput.id} setting`;
  }

  remove(id: string) {
    return `This action removes a #${id} setting`;
  }
}
