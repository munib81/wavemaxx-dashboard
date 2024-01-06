import { NextResponse } from "next/server";
import ConnectDB from "@/libs/connectDB.js";
import Feedback from "@/models/feedback";

ConnectDB();
export async function POST(request) {
  const requestData = await request.json();
  await Feedback.create({ ...requestData });

  return NextResponse.json(
    { message: "Project created successfully" },
    { status: 201 }
  );
}

export async function GET(request) {
  // const userId = request.nextUrl.searchParams.get('userId'); // This will contain the query parameters
  // //console.log(userId, "query params"); // Log the entire object

  const feedback = await Feedback.find({});
  return NextResponse.json(feedback, { status: 200 });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  // const {id} = request.pProjectarams;
  //await ConnectDB();
  await Feedback.findByIdAndDelete(id);
  return NextResponse.json(
    { message: "Project deleted successfully" },
    { status: 200 }
  );
}
