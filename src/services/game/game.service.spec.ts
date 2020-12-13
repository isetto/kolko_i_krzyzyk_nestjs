import { Test, TestingModule } from '@nestjs/testing';
import { GameService } from './game.service';
import { GameState } from '../../models/game-state';
import { GameAction } from '../../models/game-action';

describe( 'GameService', () => {
    let service: GameService;

    beforeEach( async () => {
        const module: TestingModule = await Test.createTestingModule( {
            providers: [GameService],
        } ).compile();

        service = module.get<GameService>( GameService );
    } );

    it( 'should be defined', () => {
        expect( service ).toBeDefined();
    } );

    describe( 'GameSerive.makeMove', () => {
        it( "if previous game state is finished return GameAction.finished", async () => {
            const id = 'asdqwds23wes'
            const moveObject = {
                player: 'x',
                field: 22
            }
            const previousGameState: GameState = {
                _id: "asdasd",
                isFinished: true,
                state: []
            };
            const isFieldEmpty = true
            const result = await service.makeMove( id, moveObject, previousGameState, isFieldEmpty )
            expect( result ).toBe( GameAction.finished )
        } );

    } );
} );


