
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { env } from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api')

  app.useGlobalPipes(
    new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    })

   );
  const options = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API documentation for test backend for api DigiWorld')
    .setVersion('1.0')
    .addTag('DigiWorld')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.enableCors();
   
  await app.listen(process.env.PORT);
}
bootstrap();
