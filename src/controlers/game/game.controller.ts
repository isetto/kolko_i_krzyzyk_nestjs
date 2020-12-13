import { Controller, Get, Post, Param, Put, Body, Res, HttpStatus, HttpException, Next } from '@nestjs/common';
import { Move } from '../../models/move'
import { GameState } from '../../models/game-state'
import { GameService } from '../../services/game/game.service';
import * as uniqid from 'uniqid';
import { GameLogic } from '../../class/game-logic';

const GameClass = new GameLogic()
@Controller( '/api/v1/game' )
export class GameController {
    constructor( private readonly gameService: GameService ) { }


    @Post( '/' )
    async start( @Res() res, @Body() game: GameState, @Next() next ) {
        const constructGame = Object.assign( game, { _id: uniqid.time() } )
        try {
            const createdGame = await this.gameService.startGame( constructGame )
            return res.status( 201 ).json( createdGame );
        }
        catch ( err ) {
            next( err )
        }
    }

    @Get( ':id' )
    async find( @Res() res, @Param( 'id' ) id: string, @Next() next ) {
        try {
            const foundGame = await this.gameService.findGame( id )
            if ( foundGame ) {
                return res.status( 200 ).json( foundGame );
            } else {
                throw new HttpException( "Game not found", 404 )
            }
        } catch ( err ) {
            next( err )
        }

    }

    @Put( ':id/board' )
    async move( @Res() res, @Param( 'id' ) id: string, @Body() move: Move, @Next() next ) {
        try {
            const previousGame = await this.gameService.findGame( id )
            if ( !previousGame ) throw new HttpException( "Game not found", 404 )
            const isFieldEmpty = GameClass.checkIsFieldEmpty( move, previousGame.state )
            const gameResult = await this.gameService.makeMove( id, move, previousGame, isFieldEmpty )
            const response = GameClass.getResponseForGameAction( gameResult )
            return res.status( response.code ).json( response.message );
        }
        catch ( err ) {
            next( err )
        }
    }
}
