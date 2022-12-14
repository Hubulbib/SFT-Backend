import { model, Schema } from "mongoose";
import { IUser } from "../interfaces/user.interface";

const schema = new Schema<IUser>({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  patronymic: { type: String },
  department: { type: String, required: true },
  accesses: { type: [String], required: true, default: [] },
  role: { type: String, required: true, default: "user" },
});

export default model("User", schema);
