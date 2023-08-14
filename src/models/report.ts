import { model, Schema, Document } from "mongoose";

export interface IReport extends Document {
  company_id: Schema.Types.ObjectId;
  place: string;
  epp: string;
  time: Date;
  admonished: boolean;
  supervisor: Schema.Types.ObjectId;
}

const reportSchema = new Schema({
  company_id: {
    type: Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  place: {
    type: String,
    required: true,
  },
  epp: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
  admonished: {
    type: Boolean,
    required: true,
  },
  supervisor: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default model<IReport>("Report", reportSchema);
