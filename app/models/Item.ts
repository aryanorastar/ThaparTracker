import mongoose, { Schema, Document } from 'mongoose';

export interface IItem extends Document {
  title: string;
  description: string;
  category: string;
  location: string;
  date: Date;
  status: 'lost' | 'found' | 'claimed';
  imageUrl?: string;
  contactInfo: string;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ItemSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: Date, required: true },
    status: { 
      type: String, 
      enum: ['lost', 'found', 'claimed'], 
      required: true 
    },
    imageUrl: { type: String },
    contactInfo: { type: String, required: true },
    createdBy: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User',
      required: true 
    }
  },
  { timestamps: true }
);

export default mongoose.models.Item || mongoose.model<IItem>('Item', ItemSchema);
