import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MovieDocument = Movie & Document;

@Schema({ timestamps: true })
export class Movie {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  tmdbId: number;

  @Prop({ enum: ['pending', 'watched'], required: true })
  status: 'pending' | 'watched';

  @Prop()
  rating?: number;

  createdAt?: Date;
  updatedAt?: Date;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
