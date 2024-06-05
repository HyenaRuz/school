import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const ipAddress = '192.168.31.168';

  app.setGlobalPrefix('api');
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Backend for school website')
    .setDescription('REST API documentation')
    .setVersion('1.0.0')
    .addTag('ULBI TV')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  // await app.listen(3002, ipAddress);
  await app.listen(3002);
}
bootstrap();
