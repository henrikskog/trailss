import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('MongoDB Carbon tracker REST API')
    .setDescription('API REST para el carbon tracker')
    .setVersion('1.0')
    .build();

  app.enableCors()
  await app.listen(5000);
}
bootstrap();
