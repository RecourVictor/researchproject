import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [`http://${process.env.URL_FRONTEND}`, `http://localhost:${process.env.PWA_PORT}`],
    credentials: true,
  })

  await app.listen(process.env.PORT ?? 3000);
  
  console.info(`Server is running on: ${await app.getUrl()}`)
  console.info(`GraphQL is running on: ${await app.getUrl()}/graphql`)
}
bootstrap();
