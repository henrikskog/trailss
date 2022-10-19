<<<<<<< HEAD
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
=======
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
>>>>>>> c229fb0ade82dafc0631eb5f3b9bb9341f81c24e

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

<<<<<<< HEAD
  const options = new DocumentBuilder()
    .setTitle('MongoDB Carbon tracker REST API')
    .setDescription('API REST para el carbon tracker')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

=======
  const config = new DocumentBuilder()
    .setTitle("Nest API")
    .setDescription("")
    .setVersion("0.0.1")
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("/", app, document);
>>>>>>> c229fb0ade82dafc0631eb5f3b9bb9341f81c24e
  await app.listen(3000);
}
bootstrap();
