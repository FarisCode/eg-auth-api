import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
  timestamps: true
})
export class User {
  @Prop({
    unique: [true, 'Email already exists'],
  })
  email: string;

  @Prop()
  name: string;

  @Prop()
  password: string;

}

export const UserSchema = SchemaFactory.createForClass(User)