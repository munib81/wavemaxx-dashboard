import { NextResponse } from "next/server";
import ConnectDB from "@/libs/connectDB.js";
import Devices from "@/models/device";

ConnectDB();
export async function POST(request) {
  const requestData = await request.json();
  await Devices.create({ ...requestData });

  return NextResponse.json(
    { message: "Components created successfully" },
    { status: 201 }
  );
}

export async function GET(request) {
  //   const page = parseInt(request.nextUrl.searchParams.get("page")) || 1;
  //   const pageSize = 10;
  //   //console.log(page + " page");
  //   const skip = (page - 1) * pageSize;

  //   const components = await Devices.find({}).skip(skip).limit(pageSize);

  const components = await Devices.find({}).sort({ createdAt: -1 });

  return NextResponse.json(components, { status: 200 });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  // const {id} = request.params;
  //await ConnectDB();
  await Devices.findByIdAndDelete(id);
  return NextResponse.json(
    { message: "Components deleted successfully" },
    { status: 200 }
  );
}
