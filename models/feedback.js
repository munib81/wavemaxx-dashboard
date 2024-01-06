import { Schema, models, model } from "mongoose";

const feedbackSchema = new Schema({
    id: String,
    adminUser: Object,
    email: String,
    subject: String,
    description: String,
});

const Feedback = models?.Feedback || model('Feedback', feedbackSchema)

export default Feedback;