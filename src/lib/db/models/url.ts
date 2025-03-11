import mongoose, { Schema, Document } from 'mongoose';

export interface IUrl extends Document {
  originalUrl: string;
  normalizedUrl: string;
  code: string;
  createdAt: Date;
  visits: number;
}

const UrlSchema: Schema = new Schema({
  originalUrl: { type: String, required: true },
  normalizedUrl: { type: String, required: true, unique: true },
  code: { type: String, required: true, unique: true, index: true },
  createdAt: { type: Date, default: Date.now },
  visits: { type: Number, default: 0 }
});

export default mongoose.models.Url || mongoose.model<IUrl>('Url', UrlSchema);
