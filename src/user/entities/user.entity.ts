import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Document } from "mongoose";

@Schema()
export class User extends Document {
    @Prop({
        index:true
    })
    name:string;

    @Prop({
        unique:true,
        index:true
    })
    documentIP : number;
    
}

export const UserSchema = SchemaFactory.createForClass( User );
