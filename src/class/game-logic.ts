import { Move } from "../models/move"
import { GameState } from "../models/game-state"
import { GameAction } from "../models/game-action"

export class GameLogic {
    checkIsFieldEmpty( move: Move, state: Move[] ): boolean {
        let isEmpty = true
        state.forEach( ( m: Move ) => {
            if ( m.field === move.field ) {
                isEmpty = false
            }
        } )
        return isEmpty
    }

    getResponseForGameAction( gameResult: GameAction ): { code: Number, message: String } {
        const response = {
            code: 0,
            message: ''
        }
        if ( gameResult === GameAction.finished ) {
            response.code = 200
            response.message = "Game is finished"
            return response
        }
        if ( gameResult === GameAction.moved ) {
            response.code = 200
            response.message = "Move was made"
            return response
        } else if ( gameResult === GameAction.block ) {
            response.code = 400
            response.message = "This field is taken"
            return response
        }
        else if ( gameResult === GameAction.xWin ) {
            response.code = 200
            response.message = "Player X Wins!"
            return response
        }
        else if ( gameResult === GameAction.yWin ) {
            response.code = 200
            response.message = "Player Y Wins!"
            return response
        }
        else if ( gameResult === GameAction.draw ) {
            response.code = 200
            response.message = "Draw"
            return response
        }
    }

    checkIsBoardFull( length: Number ): boolean {
        if ( length === 9 ) return true
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
        const YResult = this.winConditions( yFields )
        return this.moveOutcome( xResult, YResult )
    }

    moveOutcome( xResult: boolean, YResult: boolean ): GameAction {
        if ( xResult ) return GameAction.xWin
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
