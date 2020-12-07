
import { prop } from '@typegoose/typegoose';

export class Move {
    @prop()
    player: string;
    @prop()
    field: number;
}