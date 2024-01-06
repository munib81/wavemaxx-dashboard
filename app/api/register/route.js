// File: /pages/api/register.js

import User from "@/models/user";
import bcrypt from "bcryptjs";

import { NextResponse } from "next/server";
import ConnectDB from "@/libs/connectDB.js";

ConnectDB();
export async function POST(request) {
  //   const requestData = await request.json();
  //   await User.create({ ...requestData });

  const requestData = await request.json();
  const { name, email, password } = requestData;

  console.log(name);
  //   const { name, email, password } = await request.json();

  if (!name || !email || !password) {
    NextResponse.json({ message: "All fields are required" }, { status: 400 });
  }

  //   await connectDB();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    NextResponse.json({ message: "User already exists" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = new User({
    name,
    email,
    password: hashedPassword,
  });

  try {
    await user.save();
    NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    // res.status(500).json({ message: error.message });
    NextResponse.json({ message: error.message }, { status: 500 });
  }

  return NextResponse.json(
    { message: "User created successfully" },
    { status: 201 }
  );
}
