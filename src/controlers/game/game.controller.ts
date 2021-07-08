import { Controller, Get, Post, Param, Put, Body, Res, HttpStatus, HttpException, Next, HttpCode } from '@nestjs/common';
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
    @HttpCode( 201 )
    async start( @Body() game: GameState ) {
        const constructGame = Object.assign( game, { _id: uniqid.time() } )
        const createdGame = await this.gameService.startGame( constructGame )
        return createdGame
    }

    @Get( ':id' )
    @HttpCode( 200 )
    async find( @Param( 'id' ) id: string, @Next() next ) {
        try {
            const foundGame = await this.gameService.findGame( id )
            if ( foundGame ) {
                return foundGame
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
