// // import { NextRequest, NextResponse } from "next/server";
// // import { Client } from "@gradio/client";

// // export const dynamic = "force-dynamic";

// // export const POST = async (request: NextRequest) => {
// //   console.log("Running POST request: Virtual Try-On");

// //   try {
// //     const { backgroundUrl, garmentBlob, textParam, denoisingSteps, seed } = await request.json();
// //     console.log("backgroundUrl:",backgroundUrl)
// //     console.log("garmentBlob:",garmentBlob)
// //     console.log("textParam:",textParam)
// //     console.log("denoisingSteps:",denoisingSteps)
// //     console.log("seed:",seed)

// //     // Create a client instance using Client.connect
// //     const app = await Client.connect("Nymbo/Virtual-Try-On");

// //     // Fetch the background image as a blob
// //     const response = await fetch(backgroundUrl);
// //     const backgroundBlob = await response.blob();

// //     // Predict using Gradio client
// //     const result = await app.predict("/tryon", [
// //       { background: backgroundBlob, layers: [], composite: null },
// //       garmentBlob,
// //       textParam,
// //       true,
// //       true,
// //       denoisingSteps,
// //       seed,
// //     ]);

// //     return NextResponse.json(result.data, { status: 200 });
// //   } catch (error) {
// //     console.error("Error processing virtual try-on:", error);
// //     return NextResponse.json(
// //       { error: "Something went wrong" },
// //       { status: 400 }
// //     );
// //   }
// // };

// // pages/api/virtual-try-on.js
// import { NextResponse } from "next/server";
// import { Client } from "@gradio/client";

// export const POST = async (req:any) => {
//   console.log("Running POST request: Virtual Try-On");

//   try {
//     const formData = await req.formData(); // Use formData() to retrieve multipart form data
//     const backgroundFile = formData.get("backgroundImage");
//     const garmentFile = formData.get("garmentImage");
//     const textParam = formData.get("textParam");
//     const denoisingSteps = formData.get("denoisingSteps");
//     const seed = formData.get("seed");

//     // Convert files to blobs for Gradio client
//     const backgroundBlob = new Blob([backgroundFile]);
//     const garmentBlob = new Blob([garmentFile]);

//     const app = await Client.connect("Nymbo/Virtual-Try-On");

//     const result = await app.predict("/tryon", [
//       { background: backgroundBlob, layers: [], composite: null },
//       garmentBlob,
//       textParam,
//       true,
//       true,
//       Number(denoisingSteps),
//       Number(seed),
//     ]);

//     return NextResponse.json(result.data);
//   } catch (error) {
//     console.error("Error processing virtual try-on:", error);
//     return NextResponse.json({ error: "Something went wrong" }, { status: 400 });
//   }
// };

// import { NextResponse } from "next/server";
// import { Client } from "@gradio/client";

// export const POST = async (req:any) => {
//   console.log("Running POST request: Virtual Try-On");

//   try {
//     // Static URLs for testing
//     const backgroundUrl = "https://freedesignfile.com/upload/2017/08/Clothing-model-Stock-Photo-03.jpg"; // Replace with a valid static background image URL
//     const garmentUrl = "https://nymbo-virtual-try-on.hf.space/file=/tmp/gradio/b1dc13cbbad31c37433bcbb7f85c4af4a044dd4f/04469_00.jpg"; // Replace with a valid static garment image URL

//     // Fetch the static files as blobs
//     const backgroundResponse = await fetch(backgroundUrl);
//     const backgroundBlob = await backgroundResponse.blob();

//     const garmentResponse = await fetch(garmentUrl);
//     const garmentBlob = await garmentResponse.blob();

//     // Static values for other parameters
//     const textParam = "Sample Text";
//     const denoisingSteps = 20; // Ensure this meets the minimum requirement
//     const seed = 42;

//     // Connect to the Gradio app
//     const app = await Client.connect("Nymbo/Virtual-Try-On");

//     // Make the prediction
//     const result = await app.predict("/tryon", [
//       { background: backgroundBlob, layers: [], composite: null },
//       garmentBlob,
//       textParam,
//       true,
//       true,
//       denoisingSteps,
//       seed,
//     ]);

//     console.log("result:",result)

//     return NextResponse.json(result.data);
//   } catch (error) {
//     console.error("Error processing virtual try-on:", error);
//     return NextResponse.json({ error: "Something went wrong" }, { status: 400 });
//   }
// };

import { NextResponse } from "next/server";
import { Client } from "@gradio/client";

// Your Hugging Face API Token
const hfApiToken = "your_api_here";

export const POST = async (req: any) => {
  console.log("Running POST request: Virtual Try-On");

  try {
    // Static or dynamic inputs
    const backgroundUrl =
      "https://th.bing.com/th/id/OIP.yday_vu0kbSvZRp3azfsBwHaLG?rs=1&pid=ImgDetMain";
    //   "https://freedesignfile.com/upload/2017/08/Clothing-model-Stock-Photo-03.jpg"; // Replace with a valid static background image URL
    const garmentUrl =
      "https://nymbo-virtual-try-on.hf.space/file=/tmp/gradio/b1dc13cbbad31c37433bcbb7f85c4af4a044dd4f/04469_00.jpg"; // Replace with a valid static garment image URL

    const textParam = "Sample Text";
    const denoisingSteps = 20;
    const seed = 42;

    const backgroundResponse = await fetch(backgroundUrl);
    const backgroundBlob = await backgroundResponse.blob();

    const garmentResponse = await fetch(garmentUrl);
    const garmentBlob = await garmentResponse.blob();

    // Include token in request headers
    const app = await Client.connect("Nymbo/Virtual-Try-On", {
      headers: {
        Authorization: `Bearer ${hfApiToken}`,
      },
    });

    const result = await app.predict("/tryon", [
      { background: backgroundBlob, layers: [], composite: null },
      garmentBlob,
      textParam,
      true,
      true,
      denoisingSteps,
      seed,
    ]);

    return NextResponse.json(result.data);
  } catch (error) {
    console.error("Error processing virtual try-on:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 400 }
    );
  }
};
