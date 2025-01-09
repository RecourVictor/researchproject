import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SettingsService } from './settings.service';
import { Setting } from './entities/setting.entity';
import { CreateSettingInput } from './dto/create-setting.input';
import { UpdateSettingInput } from './dto/update-setting.input';

@Resolver(() => Setting)
export class SettingsResolver {
  constructor(private readonly settingsService: SettingsService) {}

  @Query(() => [Setting], { name: 'settings' })
  findAll() {
    return this.settingsService.findAll();
  }

  @Query(() => Setting, { name: 'setting' })
  findOne(@Args('id') id: string) {
    return this.settingsService.findOneById(id);
  }

  @Mutation(() => Setting)
  updateSetting(@Args('updateSettingInput') updateSettingInput: UpdateSettingInput) {
    return this.settingsService.update(updateSettingInput);
  }
}
