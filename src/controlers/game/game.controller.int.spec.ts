import * as request from 'supertest'
import { Test, TestingModule } from '@nestjs/testing';
import { GameController } from './game.controller';
import { GameService } from '../../services/game/game.service';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../app.module';
import { connectDb } from '../../mongodb';
import { GameState } from '../../models/game-state';
jest.mock( '../../services/game/game.service' )

describe( 'API endpoints testing (e2e)', () => {

    let app: INestApplication;
    beforeAll( async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule( {
            imports: [AppModule],
        } ).compile();
        app = moduleFixture.createNestApplication();
        app.enableShutdownHooks();
        await app.init();
    } );
    afterAll( async () => {
        await app.close();
    } );
    // an example of using supertest request.

    it( '/api/v1/game (POST)', async () => {
        const mockResponseStart: GameState = {
            _id: "87uijl",
            isFinished: true,
            state: []
        };
        const res = await request( app.getHttpServer() ).post( '/api/v1/game' ).send( mockResponseStart );
        expect( res.status ).toBe( 201 );
    } );

    it( '/api/v1/game (GET)', async () => {
        const res = await request( app.getHttpServer() ).get( '/api/v1/game/kikemkam' ).send();
        expect( res.status ).toBe( 200 );
    } );

    it( '/api/v1/game (PUT)', async () => {
        const moveObject = {
            player: 'x',
            field: 22
        }
        const res = await request( app.getHttpServer() ).get( '/api/v1/game/kikemkam' ).send( moveObject );
        expect( res.status ).toBe( 200 );
    } );

}
)


