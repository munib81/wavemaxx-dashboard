import { Schema, models, model } from "mongoose";

const deviceSchema = new Schema({
  id: String,
  name: String,
  slug: String,
  image: String,
  description: String,
});

const Devices = models.device || model("device", deviceSchema);

export default Devices;
