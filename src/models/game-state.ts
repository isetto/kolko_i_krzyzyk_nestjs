import { Move } from './move'
import { prop, getModelForClass } from '@typegoose/typegoose';
import { IsEmail, IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class GameState {
    @IsString()
    @prop()
    _id: string
    @prop( { type: () => [Move] } )
    state?: Move[]
    @IsBoolean()
    @prop()
    isFinished?: boolean
}
export const GameStateSchema = getModelForClass( GameState )
