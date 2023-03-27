import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from "mongoose";
import * as mongoose from 'mongoose';
import { Driver } from '../../driver/entities/driver.entity';
import { User } from '../../user/entities/user.entity';


@Schema()
export class Travel extends Document {
    @Prop()
    cost: number
    @Prop()
    start: [number, number];
    @Prop()
    end: [number, number];
    @Prop({
        type: [String],
        enum: ['SOLICITADO', 'INICIADO', 'EN PROGRESO', 'FINALIZADO'],
    })
    state: [string]
    @Prop({
        type: mongoose.Schema.Types.ObjectId, ref: 'Driver'
    })
    driver: Driver
    @Prop({
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    })
    user : User
}


export const TravelSchema = SchemaFactory.createForClass(Travel)