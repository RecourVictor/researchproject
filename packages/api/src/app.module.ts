import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { AthletesModule } from './athletes/athletes.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SeedModule } from './seed/seed.module';
import { CountryModule } from './country/country.module';
import { DisiplinesModule } from './disiplines/disiplines.module';
import { SettingsModule } from './settings/settings.module';
import { SimulationsModule } from './simulations/simulations.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
      entities: [__dirname + '/**/*.entity.{js,ts}'],
      synchronize: process.env.NODE_ENV == 'production' ? false : true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),    
    AthletesModule,
    SeedModule,
    CountryModule,
    DisiplinesModule,
    SettingsModule,
    SimulationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
