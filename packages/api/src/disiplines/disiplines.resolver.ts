import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DisiplinesService } from './disiplines.service';
import { Disipline } from './entities/disipline.entity';
import { CreateDisiplineInput } from './dto/create-disipline.input';
import { UpdateDisiplineInput } from './dto/update-disipline.input';

@Resolver(() => Disipline)
export class DisiplinesResolver {
  constructor(private readonly disiplinesService: DisiplinesService) {}

  @Mutation(() => Disipline)
  createDisipline(@Args('createDisiplineInput') createDisiplineInput: CreateDisiplineInput) {
    return this.disiplinesService.create(createDisiplineInput);
  }

  @Query(() => [Disipline], { name: 'disiplines' })
  findAll() {
    return this.disiplinesService.findAll();
  }

  @Query(() => Disipline, { name: 'disipline' })
  findOne(@Args('id', { type: () => Int }) id: string) {
    return this.disiplinesService.findOne(id);
  }

  @Mutation(() => Disipline)
  updateDisipline(@Args('updateDisiplineInput') updateDisiplineInput: UpdateDisiplineInput) {
    return this.disiplinesService.update(updateDisiplineInput);
  }

  @Mutation(() => Disipline)
  removeDisipline(@Args('id', { type: () => Int }) id: string) {
    return this.disiplinesService.remove(id);
  }
}
