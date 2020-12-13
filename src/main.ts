import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { connectDb } from './mongodb';


export async function app() {
  const app = await NestFactory.create( AppModule );
  await app.listen( 3000 );
  await connectDb()
}

app();
