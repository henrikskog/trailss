import { NestFactory } from '@nestjs/core';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter(), {
    cors: true,
    logger: ['error', 'warn', 'log', 'debug'] // <--- Add this line in options object
});


  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('MongoDB Carbon tracker REST API')
    .setDescription('API REST para el carbon tracker')
    .setVersion('1.0')
    .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

  app.enableCors()
  await app.listen(process.env.PORT || 5000);
}
bootstrap();
