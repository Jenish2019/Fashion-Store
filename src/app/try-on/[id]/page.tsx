"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { products } from "@/data/product";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TryOnPage = () => {
  const params = useParams();
  const [loadingProcess, setLoadingProcess] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [selectedProductId, setSelectedProductId] = useState(
    params.id as string
  );

  const currentProduct =
    products.find((p) => p.id === selectedProductId) ?? products[0];
  const relatedProducts = currentProduct
    ? products.filter((p) => p.category === currentProduct.category)
    : [];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = async () => {
    if (!uploadedImage) return;
    try {
      setLoadingProcess(true);
      const payload = {
        backgroundImage: uploadedImage,
        garmentImage: currentProduct.imageUrl,
      };
      const response: any = await fetch("/api/virtual-try-on", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error("Failed to process image");
      }
      const result = await response.json();

      setProcessedImage(result[0].url);
      setLoadingProcess(false);

      // setProcessedImage(uploadedImage);
    } catch (error) {
      console.error("Error processing image:", error);
      setLoadingProcess(false);
    }
  };

  if (!currentProduct) {
    return <div>Product not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Virtual Try-On</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Product Selection */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Selected Product</h2>
            <div className="aspect-square relative rounded-lg overflow-hidden mb-4">
              <Image
                src={currentProduct.imageUrl}
                alt={currentProduct.name}
                fill
                className="object-cover"
              />
            </div>
            <Select
              value={selectedProductId}
              onValueChange={setSelectedProductId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a product" />
              </SelectTrigger>
              <SelectContent>
                {relatedProducts.map((product) => (
                  <SelectItem key={product.id} value={product.id}>
                    {product.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Upload Section */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Upload Your Photo</h2>
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mb-4"
            />
            {uploadedImage && (
              <div className="aspect-square relative rounded-lg overflow-hidden">
                <Image
                  src={uploadedImage}
                  alt="Uploaded image"
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Result Section */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Result</h2>
            <div className="aspect-square relative rounded-lg overflow-hidden mb-4">
              {loadingProcess && <div>Processing...</div>}
              {processedImage ? (
                <Image
                  src={processedImage}
                  alt="Processed image"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <p className="text-gray-500">
                    Processed image will appear here
                  </p>
                </div>
              )}
            </div>
            <Button
              onClick={processImage}
              disabled={!uploadedImage}
              className="w-full"
            >
              Process Image
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TryOnPage;
