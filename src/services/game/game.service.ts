import { Injectable, HttpException } from '@nestjs/common';
import { GameStateSchema, GameState } from 'src/models/game-state';
import { Move } from 'src/models/move';
import { GameAction } from 'src/models/game-action';
import { GameLogic } from 'src/class/game-logic';

const GameClass = new GameLogic()
@Injectable()
export class GameService {
    async startGame( game: GameState ): Promise<GameState> {
        return await GameStateSchema.create( game )
    }
    async findGame( id: string ): Promise<GameState> {
        const gameState = await GameStateSchema.findOne( { '_id': id } )
        if ( !gameState ) {
            throw new HttpException( "No such game", 404 )
        }
        return gameState
    }
    async makeMove( id: string, move: Move ): Promise<GameAction> {
        let gameAction
        const previousGameState = await this.findGame( id )
        if ( previousGameState.isFinished ) {
            gameAction = GameAction.finished
            return gameAction
        }

        const isFieldEmpty = await GameClass.checkIsFieldEmpty( id, move, previousGameState )
        if ( isFieldEmpty ) {
            await GameStateSchema.updateOne( { '_id': id }, { $push: { state: move } } )
            const gameState = await this.findGame( id )
            gameAction = GameClass.winResult( gameState )
            if ( gameAction === GameAction.xWin || gameAction === GameAction.yWin ) {
                this.setGameFinished( id )
                return gameAction
            }
        } else {
            gameAction = GameAction.block
        }
        const currentGameState = await this.findGame( id )
        const isBoardFull = await GameClass.checkIsBoardFull( id, move, currentGameState )
        if ( isBoardFull ) {
            gameAction = GameAction.draw
            this.setGameFinished( id )
        }
        return gameAction
    }

    async setGameFinished( id: string ): Promise<Number> {
        const res = await GameStateSchema.updateOne( { '_id': id }, { $set: { isFinished: true } } )
        return res.nModified
    }

}
