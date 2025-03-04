import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

const server = express();  // Dit maakt een express server aan die Vercel zal gebruiken

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  app.enableCors({
    origin: [`http://${process.env.URL_FRONTEND}`, `http://localhost:${process.env.PWA_PORT}`],
    credentials: true,
  })

  // Voor development
  // await app.listen(process.env.PORT ?? 3000);
  // Deployment via vercen
  await app.init(); // <--- Gebruik init() ipv listen()
  
  console.info(`Server is running on: ${await app.getUrl()}`)
  console.info(`GraphQL is running on: ${await app.getUrl()}/graphql`)
}
bootstrap();
