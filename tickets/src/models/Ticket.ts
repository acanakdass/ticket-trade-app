import { Schema, model } from "mongoose";

interface ITicket {
  title: string;
  price: number;
  userId: string;
}

// 2. Create a Schema corresponding to the document interface.
const ticketSchema = new Schema<ITicket>({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  userId: { type: String, required: true }
}, {
  timestamps: true,
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
    },
    versionKey: false
  }
},);

ticketSchema.pre('save', async function (done) {
  done()
})
// 3. Create a Model.
const Ticket = model<ITicket>('Ticket', ticketSchema);
export { Ticket }