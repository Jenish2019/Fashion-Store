import { NextResponse } from "next/server";
import { Client } from "@gradio/client";
import { promises as fs } from "fs";
import path from "path";

// Your Hugging Face API Token
const HF_API_TOKEN = "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";

// Utility function to create a Blob from a file path
const filePathToBlob = async (filePath: string): Promise<Blob> => {
  try {
    const absolutePath = path.join(process.cwd(), 'public', filePath);
    const fileBuffer = await fs.readFile(absolutePath);
    return new Blob([fileBuffer]);
  } catch (error) {
    console.error(`Error reading file from path: ${filePath}`, error);
    throw error;
  }
};

// Utility function to fetch and return a Blob from a URL
const fetchBlob = async (url: string): Promise<Blob> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch from URL: ${url}`);
    }
    return await response.blob();
  } catch (error) {
    console.error(`Error fetching blob from ${url}:`, error);
    throw error;
  }
};

export const POST = async (req: Request): Promise<Response> => {
  console.log("Running POST request: Virtual Try-On");

  try {
    const data = await req.json();

    const { backgroundImage, garmentImage } = data;
    if (!backgroundImage || !garmentImage) {
      throw new Error("Missing required fields: backgroundImage or garmentImage");
    }

    // Determine if the input is a URL or file path
    const backgroundBlob = await fetchBlob(backgroundImage)

    const garmentBlob = await filePathToBlob(garmentImage)
    const textParam = "Sample Text";
    const denoisingSteps = 20;
    const seed = 42;

    // Connect to the Hugging Face API
    const app = await Client.connect("Nymbo/Virtual-Try-On", {
      headers: {
        Authorization: `Bearer ${HF_API_TOKEN}`,
      },
    });

    // Call the predict function
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
