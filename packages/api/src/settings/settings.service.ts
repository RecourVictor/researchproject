import { Injectable } from '@nestjs/common'
import { CreateSettingInput } from './dto/create-setting.input'
import { UpdateSettingInput } from './dto/update-setting.input'
import { Setting } from './entities/setting.entity'
import { MongoRepository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { ObjectId } from 'mongodb'

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Setting)
    private readonly settingsRepository: MongoRepository<Setting>,
  ) {}

  findAll() {
    return this.settingsRepository.find()
  }

  findOneById(id: string) {
    if (!ObjectId.isValid(id)) {
      throw new Error('Invalid id')
    }

    const objId = new ObjectId(id)
    return this.settingsRepository.findOneBy({ _id: objId })
  }

  update(updateSettingInput: UpdateSettingInput) {
    if (!ObjectId.isValid(updateSettingInput.id)) {
      throw new Error('Invalid id')
    }

    const objId = new ObjectId(updateSettingInput.id)
    return this.settingsRepository.findOneBy({ _id: objId }).then(setting => {
      if (!setting) {
        throw new Error('Setting not found')
      }

      setting.value = updateSettingInput.value
      return this.settingsRepository.save(setting)
    })
  }

  // Function for seeding
  saveAll(settings: Setting[]): Promise<Setting[]> {
    return this.settingsRepository.save(settings)
  }

  truncate(): Promise<void> {
    return this.settingsRepository.clear()
  }
}
