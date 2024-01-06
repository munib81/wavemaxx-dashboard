import { NextResponse } from "next/server";
import ConnectDB from "@/libs/connectDB.js";
import User from "@/models/user";

ConnectDB();

// export async function PUT(request, { params}) {
//     const { id } = params;
//     const requestData = await request.json();
//     // await ConnectDB();
//     await User.findByIdAndUpdate({id : id}, { ...requestData });
//     return NextResponse.json({ message: 'User updated successfully' }, { status: 200 });
// }

// export async function PUT(request, { params }) {
//   const { coupon_code } = params; // Assuming 'id' is the parameter you want to search with
//   //console.log(id);
//   //console.log("id");
//   const requestData = await request.json();

//   try {
//     const updatedProject = await User.findByIdAndUpdate(
//       { _id: id }, // Search criteria
//       { $set: requestData }, // Update data
//       { new: true } // Return the updated document
//     );

//     if (!updatedProject) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     return NextResponse.json(
//       { message: "User updated successfully", updatedProject },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error updating component:", error);
//     return NextResponse.json(
//       { error: "An error occurred while updating the component" },
//       { status: 500 }
//     );
//   }
// }

export async function GET(request, { params }) {
  const { coupon_code } = params;

  if (!coupon_code) {
    return NextResponse.json(
      { error: "Coupon code not found" },
      { status: 404 }
    );
  }

  try {
    const component = await User.find({ coupon_code: coupon_code });

    return NextResponse.json(component, { status: 200 });
  } catch (error) {
    console.error("Error searching for component:", error);
    return NextResponse.json(
      { error: "An error occurred while searching for the component" },
      { status: 500 }
    );
  }
}

// export async function DELETE(request, { params }) {
//   const { id } = params; // Assuming 'id' is the parameter you want to search with
//   //console.log(id);

//   try {
//     const updatedProject = await User.findOneAndDelete({ id });

//     if (!updatedProject) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     return NextResponse.json(
//       { message: "User Deleted successfully", updatedProject },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error deleting component:", error);
//     return NextResponse.json(
//       { error: "An error occurred while deleting the component" },
//       { status: 500 }
//     );
//   }
// }
