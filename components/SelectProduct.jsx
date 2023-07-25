"use client";

import { useState } from "react";

import { DreamProductCategories } from "@/utils/Utils";

import Image from "next/image";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

const SelectProduct = ({ session }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");

  const [productCategories, setProductCategories] = useState("");

  const handleProductSelect = (product, category) => (e) => {
    setSelectedCategory(category.key);
    setSelectedProduct(product.key);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/user/${session.user.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          category: selectedCategory,
          product: selectedProduct,
        }),
      });

      if (res.ok) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-full flex flex-col items-center justify-start pt-10 p-4 bg-[url('/background4.jpg')] bg-cover min-h-screen">
        <Image
          priority
          src="/bajaj-finserv.svg"
          width={60}
          height={60}
          alt="Bajaj"
          className="h-16 w-auto"
        />
        <h1 className="w-full text-center text-2xl pt-5">
          Welcome to your Dream Service/Product Selector
        </h1>
        <div className="w-full flex flex-col items-start p-2 mt-5">
          <Label className="my-2">Choose your product</Label>
          {DreamProductCategories.slice(0, 5).map((category) => (
            <div key={category.key} className="w-full">
              <h2
                className="p-2 mb-2 border-b border-gray-500 cursor-pointer"
                onClick={() => setProductCategories(category.key)}
              >
                {category.name}
              </h2>
              <div
                className={`w-full grid grid-cols-3 grid-flow-row gap-1 ${
                  productCategories === category.key ? "block" : "hidden"
                }`}
              >
                {category.products.map((product) => (
                  <div key={product.id}>
                    <div
                      className={`w-full flex flex-col items-center h-32 justify-between border rounded-md p-1 m-1 ${
                        product.key === selectedProduct
                          ? "border-blue-500 bg-[#131313]"
                          : "border-gray-500"
                      }`}
                      onClick={handleProductSelect(product, category)}
                    >
                      <Image
                        src={product.image}
                        width={90}
                        height={90}
                        className="h-20 w-auto"
                        alt={product.name}
                      />
                      <p className="text-sm text-center">{product.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        {selectedProduct && (
          <div className="w-full flex flex-col items-start p-2 mt-5">
            <Button className="w-full gradient_btn" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default SelectProduct;
