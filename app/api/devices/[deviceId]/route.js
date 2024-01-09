import { NextResponse } from "next/server";
import ConnectDB from "@/libs/connectDB.js";
import Devices from "@/models/device";

ConnectDB();

// export async function PUT(request, { params}) {
//     const { id } = params;
//     const requestData = await request.json();
//     // await ConnectDB();
//     await Devices.findByIdAndUpdate({deviceId : id}, { ...requestData });
//     return NextResponse.json({ message: 'Components updated successfully' }, { status: 200 });
// }

export async function PUT(request, { params }) {
  const { deviceId } = params; // Assuming 'deviceId' is the parameter you want to search with
  //console.log(deviceId);
  //console.log("deviceId");
  const requestData = await request.json();

  try {
    const updatedProject = await Devices.findOneAndUpdate(
      { _id: deviceId }, // Search criteria
      { $set: requestData }, // Update data
      { new: true } // Return the updated document
    );

    if (!updatedProject) {
      return NextResponse.json({ error: "Device not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Components updated successfully", updatedProject },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating component:", error);
    return NextResponse.json(
      { error: "An error occurred while updating the component" },
      { status: 500 }
    );
  }
}

export async function GET(request, { params }) {
  const { deviceId } = params;
  console.log(deviceId + " deviceId");

  try {
    // tags is an array, search deviceId in that array
    const component = await Devices.find({ _id: deviceId });

    return NextResponse.json(component, { status: 200 });
  } catch (error) {
    console.error("Error searching for component:", error);
    return NextResponse.json(
      { error: "An error occurred while searching for the component" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  const { deviceId } = params;

  try {
    const deletedDevice = await Devices.findOneAndDelete({ _id: deviceId });

    if (!deletedDevice) {
      return NextResponse.json({ error: "Device not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Device deleted successfully", deletedDevice },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting device:", error);
    return NextResponse.json(
      { error: "An error occurred while deleting the device" },
      { status: 500 }
    );
  }
}
