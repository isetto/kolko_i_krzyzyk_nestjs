import { Module } from '@nestjs/common';
import { GameService } from './services/game/game.service';
import { GameController } from './controlers/game/game.controller';



@Module( {
  imports: [],
  controllers: [GameController],
  providers: [GameService],
} )
export class AppModule { }
