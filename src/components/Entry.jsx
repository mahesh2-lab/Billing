import React, { useState, useEffect } from "react";
import useProductLookup from "../hooks/useProductLookup";

function Entry({ barcode, quantity, onQuantityChange }) {
  const { product, loading, error } = useProductLookup(barcode);
  const [count, setCount] = useState(quantity);

  const increment = () => {
    const newQuantity = count + 1;
    setCount(newQuantity);
    onQuantityChange(barcode, newQuantity);
  };

  const decrement = () => {
    const newQuantity = Math.max(1, count - 1);
    setCount(newQuantity);
    onQuantityChange(barcode, newQuantity);
  };

  useEffect(() => {
    setCount(quantity);
  }, [quantity]);

  useEffect(() => {
    if (product) {
      console.log(JSON.stringify(product));
    }
  }, [product]);

  if (loading)
    return (
      <tr>
        <td colSpan="4">Loading...</td>
      </tr>
    );
  if (error)
    return (
      <tr>
        <td colSpan="4" style={{ color: "red" }}>
          Error: {error}
        </td>
      </tr>
    );
  if (!product)
    return (
      <tr>
        <td colSpan="4">No product found.</td>
      </tr>
    );

  return (
    <tr className="text-sm text-gray-800 backdrop-blur-lg"  style={{borderBottom: '1px solid #000'}}>
      <td className="px-4 py-3 border ">
        <div className="flex items-center space-x-3">
          <span>{product.name}</span>
        </div>
      </td>
      <td className="px-4 py-3 border">${product.price.toFixed(2)}</td>
      <td className="px-4 py-3 border">
        <div className="flex items-center space-x-4">
          <button
            onClick={decrement}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            -
          </button>
          <input
            type="number"
            className="w-12 h-8 border border-gray-300 rounded-md text-center"
            value={count}
            onChange={(e) => {
              const newQuantity = Math.max(1, Number(e.target.value));
              setCount(newQuantity);
              onQuantityChange(barcode, newQuantity);
            }}
            min="1"
          />
          <button
            onClick={increment}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            +
          </button>
        </div>
      </td>
      <td className="px-4 py-3 border">
        ${(product.price * count).toFixed(2)}
      </td>
    </tr>
  );
}

export default Entry;
