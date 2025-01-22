"use client";
import { useState } from "react";

const VirtualTryOnForm = () => {
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [garmentImage, setGarmentImage] = useState(null);
  const [textParam, setTextParam] = useState("");
  const [denoisingSteps, setDenoisingSteps] = useState(3);
  const [seed, setSeed] = useState(3);
  const [result, setResult] = useState(null);
  console.log("result:", result);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("backgroundImage", backgroundImage);
    formData.append("garmentImage", garmentImage);
    formData.append("textParam", textParam);
    formData.append("denoisingSteps", denoisingSteps);
    formData.append("seed", seed);

    try {
      const response = await fetch("/api/virtual-try-on", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("Data:", data);
      setResult(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Background Image:
          <input
            type="file"
            onChange={(e) => setBackgroundImage(e.target.files[0])}
          />
        </label>
        <label>
          Garment Image:
          <input
            type="file"
            onChange={(e) => setGarmentImage(e.target.files[0])}
          />
        </label>
        <label>
          Text Parameter:
          <input
            type="text"
            value={textParam}
            onChange={(e) => setTextParam(e.target.value)}
          />
        </label>
        <label>
          Denoising Steps:
          <input
            type="number"
            value={denoisingSteps}
            onChange={(e) => setDenoisingSteps(Number(e.target.value))}
          />
        </label>
        <label>
          Seed:
          <input
            type="number"
            value={seed}
            onChange={(e) => setSeed(Number(e.target.value))}
          />
        </label>
        <button type="submit">Try On</button>
      </form>

      {result && (
        <div>
          <h3>Result</h3>
          <img src={result[0].url} alt="Output Image" />
          {/* <img
            src="https://nymbo-virtual-try-on.hf.space/file=/tmp/gradio/af76c8b7738914a9bd1d6d2aa46154bd168efbc8/image.png"
            alt="Output Image"
          /> */}
        </div>
      )}
    </div>
  );
};

export default VirtualTryOnForm;
