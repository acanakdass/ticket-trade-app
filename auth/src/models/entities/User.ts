import { SecurityHelper } from './../../helpers/SecurityHelper';
import { Schema, model } from "mongoose";

interface IUser {
  username: string;
  email: string;
  password: string;
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, {
  toJSON: {
    transform(doc, ret) {
      delete ret.password;
      ret.id = ret._id;
      delete ret._id;
    },
    versionKey: false
  }
});

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await SecurityHelper.toHash(this.password)
    this.password = hashed;
  };
  done()
})
// 3. Create a Model.
const User = model<IUser>('User', userSchema);
export { User }