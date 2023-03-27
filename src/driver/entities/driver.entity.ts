import { Schema, SchemaFactory } from "@nestjs/mongoose/dist";
import { Document } from "mongoose";
import { Prop } from '@nestjs/mongoose';


@Schema()
export class Driver extends Document {
    @Prop()
    name: string;
    @Prop({
        unique:true,
        index:true
    })
    documentIP: number;
    @Prop()
    available: boolean;
    @Prop()
    coordinates: [number, number];
  
}


export const DriverSchema = SchemaFactory.createForClass(Driver)
