import { Move } from "src/models/move"
import { GameState } from "src/models/game-state"
import { GameAction } from "src/models/game-action"

export class GameLogic {
    async checkIsFieldEmpty( id: string, move: Move, previousGameState: GameState ): Promise<boolean> {
        let isEmpty = true
        previousGameState.state.forEach( ( m: Move ) => {
            if ( m.field === move.field ) {
                isEmpty = false
            }
        } )
        return isEmpty
    }

    async checkIsBoardFull( id: string, move: Move, gameState: GameState ): Promise<boolean> {
        if ( gameState.state.length === 9 ) return true
        else return false
    }
    winResult( game: GameState ): GameAction {
        const xMoves = game.state.filter( ( move: Move ) => {
            return move.player === 'x'
        } )
        const yMoves = game.state.filter( ( move: Move ) => {
            return move.player === 'y'
        } )

        let xFields = []
        let yFields = []
        xMoves.forEach( ( move: Move ) => {
            xFields.push( move.field )
        } )
        yMoves.forEach( ( move: Move ) => {
            yFields.push( move.field )
        } )

        const xResult = this.winConditions( xFields )
        if ( xResult ) return GameAction.xWin
        const YResult = this.winConditions( yFields )
        if ( YResult ) return GameAction.yWin
        if ( !xResult && !YResult ) return GameAction.moved
    }

    winConditions( fields: Number[] ): boolean {
        let isWin = false
        const winArray =
            [
                [11, 12, 13],
                [21, 22, 23],
                [31, 32, 33],
                [11, 21, 31],
                [12, 22, 32],
                [13, 23, 33],
                [11, 22, 33],
                [31, 22, 13],
            ]

        for ( let i = 0; i < winArray.length; i++ ) {
            if ( fields.includes( winArray[i][0] ) && fields.includes( winArray[i][1] ) && fields.includes( winArray[i][2] ) ) {
                isWin = true
                break;
            }
        }
        return isWin

    }
}
