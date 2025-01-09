import { Injectable } from '@nestjs/common'
import { CreateSettingInput } from './dto/create-setting.input'
import { UpdateSettingInput } from './dto/update-setting.input'
import { Setting } from './entities/setting.entity'
import { MongoRepository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Setting)
    private readonly settingsRepository: MongoRepository<Setting>,
  ) {}

  create(createSettingInput: CreateSettingInput) {
    return 'This action adds a new setting'
  }

  findAll() {
    return `This action returns all settings`
  }

  findOne(id: string) {
    return `This action returns a #${id} setting`
  }

  update(updateSettingInput: UpdateSettingInput) {
    return `This action updates a #${updateSettingInput.id} setting`
  }

  remove(id: string) {
    return `This action removes a #${id} setting`
  }

  // Function for seeding
  saveAll(settings: Setting[]): Promise<Setting[]> {
    return this.settingsRepository.save(settings)
  }

  truncate(): Promise<void> {
    return this.settingsRepository.clear()
  }
}
