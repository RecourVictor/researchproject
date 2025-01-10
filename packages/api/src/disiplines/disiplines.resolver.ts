import { Resolver, Query, Args } from '@nestjs/graphql';
import { DisiplinesService } from './disiplines.service';
import { Disipline } from './entities/disipline.entity';

@Resolver(() => Disipline)
export class DisiplinesResolver {
  constructor(private readonly disiplinesService: DisiplinesService) {}

  @Query(() => [Disipline], { name: 'disiplines' })
  findAll() {
    return this.disiplinesService.findAll();
  }

  @Query(() => Disipline, { name: 'disipline' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.disiplinesService.findOne(id);
  }

  @Query(() => Disipline, { name: 'disiplineByName' })
  findByName(@Args('name', { type: () => String }) name: string) {
    return this.disiplinesService.findByName(name);
  }

  @Query(() => [Disipline], { name: 'disiplinesBySearchString' })
  findBySearchString(@Args('searchString', { type: () => String }) searchString: string) {
    return this.disiplinesService.findBySearchString(searchString);
  }
}
