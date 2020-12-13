import { GameLogic } from './game-logic';
import { GameAction } from '../models/game-action';
import { Move } from '../models/move';
import { GameState } from '../models/game-state';

const GameClass = new GameLogic()
describe( 'GameLogic', () => {
    it( 'should be defined', () => {
        expect( new GameLogic() ).toBeDefined();
    } );
} );

describe( 'GameLogic.getResponseForGameAction', () => {
    it( "with GameAction.finished parameter should return { code: 200, message: 'Game is finished' }", () => {
        const expectedResult = { code: 200, message: 'Game is finished' }
        const result = GameClass.getResponseForGameAction( GameAction.finished )
        expect( result ).toEqual( expectedResult )
    } );
    it( "with GameAction.moved parameter should return { code: 200, message: 'Move was made' }", () => {
        const expectedResult = { code: 200, message: 'Move was made' }
        const result = GameClass.getResponseForGameAction( GameAction.moved )
        expect( result ).toEqual( expectedResult )
    } );
    it( "with GameAction.block parameter should return { code: 400, message: 'This field is taken' }", () => {
        const expectedResult = { code: 400, message: 'This field is taken' }
        const result = GameClass.getResponseForGameAction( GameAction.block )
        expect( result ).toEqual( expectedResult )
    } );
    it( "with GameAction.block parameter should return { code: 200, message: 'Player X Wins!' }", () => {
        const expectedResult = { code: 200, message: 'Player X Wins!' }
        const result = GameClass.getResponseForGameAction( GameAction.xWin )
        expect( result ).toEqual( expectedResult )
    } );
    it( "with GameAction.block parameter should return { code: 200, message: 'Draw' }", () => {
        const expectedResult = { code: 200, message: 'Draw' }
        const result = GameClass.getResponseForGameAction( GameAction.draw )
        expect( result ).toEqual( expectedResult )
    } );
} );

describe( 'GameLogic.checkIsBoardFull', () => {
    it( "if length is 9 return true", () => {
        const length = 9
        const result = GameClass.checkIsBoardFull( length )
        expect( result ).toBeTruthy()
    } );

    it( "if length is different than 9 return false", () => {
        const length = 8
        const result = GameClass.checkIsBoardFull( length )
        expect( result ).toBeFalsy()
    } );

} );

describe( 'GameLogic.checkIsFieldEmpty', () => {
    const move: Move = {
        player: 'x',
        field: 11
    }

    it( "if move has same field in state array return isEmpty=false", () => {
        const stateMatch: Move[] = [
            {
                player: 'x',
                field: 12
            }, {
                player: 'y',
                field: 23
            }, {
                player: 'x',
                field: 33
            }, {
                player: 'y',
                field: 11
            },
        ]
        const isEmpty = GameClass.checkIsFieldEmpty( move, stateMatch )
        expect( isEmpty ).toBeFalsy()
    } );

    it( "if move has not same field in state array return isEmpty=true", () => {
        const stateNoMatch: Move[] = [
            {
                player: 'x',
                field: 12
            }, {
                player: 'y',
                field: 23
            }, {
                player: 'x',
                field: 33
            }, {
                player: 'y',
                field: 31
            },
        ]
        const isEmpty = GameClass.checkIsFieldEmpty( move, stateNoMatch )
        expect( isEmpty ).toBeTruthy()
    } );

} );

describe( 'GameLogic.moveOutcome', () => {
    it( "if xResult=true and yResult=false return GameAction.xWin", () => {
        const xResult = true
        const yResult = false
        const result = GameClass.moveOutcome( xResult, yResult )
        expect( result ).toEqual( GameAction.xWin )
    } );

    it( "if yResult=true and xResult=false return GameAction.yWin", () => {
        const xResult = false
        const yResult = true
        const result = GameClass.moveOutcome( xResult, yResult )
        expect( result ).toEqual( GameAction.yWin )
    } );
    it( "if yResult=false and xResult=false return GameAction.moved", () => {
        const xResult = false
        const yResult = false
        const result = GameClass.moveOutcome( xResult, yResult )
        expect( result ).toEqual( GameAction.moved )
    } );

} );

describe( 'GameLogic.winConditions', () => {
    const notWinFields = [21, 12, 13]
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

    winArray.forEach( ( winRecord: Number[] ) => {
        it( "if winFields passed should return true", () => {
            const result = GameClass.winConditions( winRecord )
            expect( result ).toBeTruthy()
        } );
    } )

    it( "if notWinFields passed should return false", () => {
        const result = GameClass.winConditions( notWinFields )
        expect( result ).toBeFalsy()
    } );

} );