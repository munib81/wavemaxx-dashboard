import { Schema, models, model } from "mongoose";

const deviceSchema = new Schema({
  id: String,
  createdAt: String,
  name: String,
  slug: String,
  image: String,
  deviceId: String,
  location: Object,
  rtuId: String,
  centralId: String,
  type: String,
  status: String,
  logs: Array,
});

const Devices = models.device || model("device", deviceSchema);

export default Devices;
