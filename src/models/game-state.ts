import { Move } from './move'
import { prop, getModelForClass } from '@typegoose/typegoose';

export class GameState {
    @prop()
    _id: string
    @prop( { type: () => [Move] } )
    state?: Move[]
    @prop()
    isFinished?: boolean
}
export const GameStateSchema = getModelForClass( GameState )
