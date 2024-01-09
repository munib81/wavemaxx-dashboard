import { NextResponse } from "next/server";
import ConnectDB from "@/libs/connectDB.js";
import Devices from "@/models/device";

ConnectDB();

// export async function PUT(request, { params}) {
//     const requestData = await request.json();
//     const { id } = params;
//     // await ConnectDB();
//     await Components.findByIdAndUpdate({name : id}, { ...requestData });
//     return NextResponse.json({ message: 'Components updated successfully' }, { status: 200 });
// }

export async function PUT(request, { params }) {
  const { name } = params; // Assuming 'name' is the parameter you want to search with
  //console.log(name);
  //console.log("name");
  const requestData = await request.json();

  try {
    const updatedProject = await Components.findOneAndUpdate(
      { name }, // Search criteria
      { $set: requestData }, // Update data
      { new: true } // Return the updated document
    );

    if (!updatedProject) {
      return NextResponse.json(
        { error: "Components not found" },
        { status: 404 }
      );
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
  const { name } = params;

  try {
    // Case-insensitive fuzzy search using regular expression
    const regex = new RegExp(name, "i");
    const component = await Components.find({ name: { $regex: regex } });

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
  const { name } = params; // Assuming 'name' is the parameter you want to search with
  //console.log(name);

  try {
    const updatedProject = await Components.findOneAndDelete({ name });

    if (!updatedProject) {
      return NextResponse.json(
        { error: "Components not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Components Deleted successfully", updatedProject },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting component:", error);
    return NextResponse.json(
      { error: "An error occurred while deleting the component" },
      { status: 500 }
    );
  }
}
