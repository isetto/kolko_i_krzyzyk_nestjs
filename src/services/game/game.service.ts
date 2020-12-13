import { Injectable, HttpException } from '@nestjs/common';
import { GameStateSchema, GameState } from '../../models/game-state';
import { Move } from '../../models/move';
import { GameAction } from '../../models/game-action';
import { GameLogic } from '../../class/game-logic';

const GameClass = new GameLogic()
@Injectable()
export class GameService {
    async startGame( game: GameState ): Promise<GameState> {
        return await GameStateSchema.create( game )
    }
    async findGame( id: string ): Promise<GameState> {
        const gameState = await GameStateSchema.findOne( { '_id': id } )
        return gameState
    }
    async makeMove( id: string, move: Move, previousGameState: GameState, isFieldEmpty: boolean ): Promise<GameAction> {
        let gameAction
        if ( previousGameState.isFinished ) {
            return GameAction.finished
        }
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
        const isBoardFull = await GameClass.checkIsBoardFull( currentGameState.state.length )
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
