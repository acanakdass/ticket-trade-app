import { PasswordHelper } from './../../helpers/PasswordHelper';
// import mongoose from "mongoose";

import mongoose, { Schema, model } from "mongoose";

// interface IUserAttrs {
//     email: string;
//     username: string;
//     password: string;
// }
// const userSchema = new mongoose.Schema({
//     email: {
//         type: String,
//         required: true
//     },
//     username: {
//         type: String,
//         required: true
//     },
//     password: {
//         type: String,
//         required: true
//     }
// })
// const buildUser = (attrs: IUserAttrs) => {
//     return new User(attrs);
// }

// const User = mongoose.model("User", userSchema);
// export { User,buildUser }

interface IUser {
  username: string;
  email: string;
  password: string;
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
  username: { type: String, required: true,unique:true },
  email: { type: String, required: true,unique:true },
  password: { type: String, required: true }
});

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await PasswordHelper.toHash(this.password)
    this.password = hashed;
  };
  done()
})
// 3. Create a Model.
const User = model<IUser>('User', userSchema);
var us = new User();
export { User }