import { Module } from '@nestjs/common';
import { GameService } from './services/game/game.service';
import { MongooseModule } from '@nestjs/mongoose';
import { GameStateSchema } from './models/game-state';
import { GameController } from './controlers/game/game.controller';



@Module( {
  imports: [],
  controllers: [GameController],
  providers: [GameService],
} )
export class AppModule { }
