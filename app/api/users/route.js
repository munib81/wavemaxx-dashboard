import { NextResponse } from "next/server";
import ConnectDB from "@/libs/connectDB.js";
import User from "@/models/user";

ConnectDB();
export async function POST(request) {
  const requestData = await request.json();
  await User.create({ ...requestData });

  return NextResponse.json(
    { message: "User created successfully" },
    { status: 201 }
  );
}

export async function GET(request) {
  const AllComponents = await User.find({}).sort({ createdAt: -1 }); // Sorting by createdAt in descending order
  return NextResponse.json(AllComponents, { status: 200 });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  // const {id} = request.params;
  //await ConnectDB();
  await User.findByIdAndDelete(id);
  return NextResponse.json(
    { message: "User deleted successfully" },
    { status: 200 }
  );
}
