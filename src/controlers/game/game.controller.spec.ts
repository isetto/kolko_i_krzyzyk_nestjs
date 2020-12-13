import { Test, TestingModule } from '@nestjs/testing';
import { GameController } from './game.controller';
import * as httpMocks from "node-mocks-http"
import { GameState } from '../../models/game-state';
import { GameService } from '../../services/game/game.service';
import { HttpException } from '@nestjs/common';
jest.mock( '../../services/game/game.service' )

let req, res, next;
let gameController: GameController;
let gameService: GameService;
const mockResponse: GameState = {
  _id: "asdasd",
  isFinished: true
};
const mockResponseStart: GameState = {
  _id: "asdasd",
  isFinished: true,
  state: []
};
const moveObject = {
  player: 'x',
  field: 22
}
const parameter = '3wesp1d'
beforeEach( async () => {
  req = httpMocks.createRequest()
  res = httpMocks.createResponse( {
    eventEmitter: require( 'events' ).EventEmitter
  } );
  next = jest.fn()
  const module: TestingModule = await Test.createTestingModule( {
    controllers: [GameController],
    providers: [
      GameService,
    ],
    imports: [
    ]
  } ).compile();

  gameController = module.get<GameController>( GameController );
  gameService = module.get<GameService>( GameService );

} );
describe( 'GameController.find', () => {

  it( "should have a find function", () => {
    expect( typeof gameController.find ).toBe( 'function' )
  } );


  it( "should call controller.find with route parameter", async () => {
    const result = jest.spyOn( gameController, "find" ).mockResolvedValue( mockResponse )
    await gameController.find( res, parameter, next )
    expect( result ).toBeCalledWith( res, parameter, next )
  } );

  it( "should return 404 code and game not found text", async ( done ) => {
    try {
      await gameController.find( res, parameter, next )
      done()
    } catch ( e ) {
      expect( e ).toBeInstanceOf( HttpException );
      expect( e.message ).toBe( 'Game not found' );
      expect( e.status ).toBe( 404 );
      done()
    }
  } );


  it( 'returns game state object', async () => {
    jest.spyOn( gameController, "find" ).mockResolvedValue( mockResponse )
    const result = await gameController.find( res, parameter, next );
    expect( result ).toBe( mockResponse );
  } );
} );


describe( 'GameController.start', () => {

  it( "should have a start function", () => {
    expect( typeof gameController.start ).toBe( 'function' )
  } );


  it( "should call controller.start with parameters", async () => {
    const result = jest.spyOn( gameController, "start" ).mockResolvedValue( mockResponse )
    await gameController.start( res, mockResponse, next )
    expect( result ).toBeCalledWith( res, mockResponse, next )
  } );


  it( 'returns game state object', async () => {
    jest.spyOn( gameController, "start" ).mockResolvedValue( mockResponseStart )
    const result = await gameController.start( res, mockResponseStart, next );
    expect( result ).toBe( mockResponseStart );
  } );
} );

describe( 'GameController.move', () => {
  it( "should have a start function", () => {
    expect( typeof gameController.move ).toBe( 'function' )
  } );


  it( "should call controller.start with parameters", async () => {
    const result = jest.spyOn( gameController, "move" )
    await gameController.move( res, parameter, moveObject, next )
    expect( result ).toBeCalledWith( res, parameter, moveObject, next )
  } );

  it( 'returns game state object', async () => {
    const response = 'Move was made'
    jest.spyOn( gameController, "move" ).mockResolvedValue( response )
    const result = await gameController.move( res, parameter, moveObject, next );
    expect( result ).toBe( response );
  } );
} );






