import { Controller, Get, Post, Param, Put, Body, Res, HttpStatus, HttpException } from '@nestjs/common';
import { Move } from '../../models/move'
import { GameStateSchema, GameState } from '../../models/game-state'
import { GameService } from 'src/services/game/game.service';
import * as uniqid from 'uniqid';
import { GameAction } from 'src/models/game-action';

@Controller( '/api/v1/game' )
export class GameController {
    constructor( private readonly gameService: GameService ) { }


    @Post( '/' )
    async start( @Res() res, @Body() game: GameState ) {
        const constructGame = Object.assign( game, { _id: uniqid.time() } )
        try {
            const createdGame = await this.gameService.startGame( constructGame )
            return res.status( 201 ).json( createdGame );
        }
        catch ( err ) {
            return res.status( err.status ).json( err.response )
        }
    }

    @Get( ':id' )
    async find( @Res() res, @Param( 'id' ) id: string ) {
        try {
            const foundGame = await this.gameService.findGame( id )
            return res.status( 200 ).json( foundGame );
        }
        catch ( err ) {
            return res.status( err.status ).json( err.response )
        }
    }

    @Put( ':id/board' )
    async move( @Res() res, @Param( 'id' ) id: string, @Body() move: Move ) {
        try {
            const gameResult = await this.gameService.makeMove( id, move )
            if ( gameResult === GameAction.finished ) {
                return res.status( 200 ).send( "Game is finished" )
            }
            if ( gameResult === GameAction.moved ) {
                return res.status( 200 ).send( "Move was made" )
            } else if ( gameResult === GameAction.block ) {
                throw new HttpException( "This field is taken", 400 )
            }
            else if ( gameResult === GameAction.xWin ) {
                return res.status( 200 ).send( "Player X Wins!" )
            }
            else if ( gameResult === GameAction.yWin ) {
                return res.status( 200 ).send( "Player Y Wins!" )
            }
            else if ( gameResult === GameAction.draw ) {
                return res.status( 200 ).send( "Draw" )
            }
        }
        catch ( err ) {
            return res.status( err.status ).json( err.response )
        }
    }
}
