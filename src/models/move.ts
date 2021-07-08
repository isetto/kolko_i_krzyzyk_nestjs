
import { prop } from '@typegoose/typegoose';
import { IsString, IsNumber } from 'class-validator';

export class Move {
    @IsString()
    @prop()
    player: string;
    @IsNumber()
    @prop()
    field: number;
}