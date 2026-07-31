import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita CORS para permitir peticiones desde el frontend Angular
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
  });

  // Pipe global de validación basado en class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,          // elimina propiedades no declaradas en el DTO
      forbidNonWhitelisted: true, // lanza error si llegan propiedades extra
      transform: true,          // transforma los datos al tipo TypeScript esperado
    }),
  );

  await app.listen(3000);
  console.log('Backend corriendo en http://localhost:3000');
}

bootstrap();
