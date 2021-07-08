import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { connectDb } from './mongodb';
import { ValidationPipe } from '@nestjs/common';


export async function app() {
  const app = await NestFactory.create( AppModule );
  app.useGlobalPipes( new ValidationPipe( { whitelist: true } ) );
  await app.listen( 3000 );
  await connectDb()
}

app();
