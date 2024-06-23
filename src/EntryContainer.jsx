import React, { useState } from "react";
import Entry from "./components/Entry";
import useProductLookup from "./hooks/useProductLookup";

export const EntryContainer = ({ Barcode }) => {
  const [quantities, setQuantities] = useState({});

  const handleQuantityChange = (barcode, quantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [barcode]: quantity,
    }));
  };

  // Calculate total price based on Barcode array and quantities state
  const totalPrice = Barcode.reduce((total, barcode) => {
    const quantity = quantities[barcode] || 1; // Default to 1 if not set
    // Assuming useProductLookup is synchronous for price, or handle async separately
    const product = useProductLookup(barcode).product; // This is for illustration, handle async data properly
    if (product && product.price) {
      return total + product.price * quantity;
    }
    return total;
  }, 0);

  return (
    <>
      <div className="font-sans max-w-7xl max-md:max-w-xl pt-4">
        <div className="grid md:grid-cols-4 gap-8 mt-7 " >
          <div className="md:col-span-3 h-full  w-full max-w-5xl backdrop-blur-lg border bottom-1 border-slate-500 rounded-md overflow-y-auto bg-white glass " style={{height: "550px"}}>
            {/* Table start here */}
            <table className="w-full ">
              <thead className="sticky top-0 bg-gray-500">
                <tr className="text-xs font-semibold tracking-wide text-white text-left uppercase border-b">
                  <th className="px-4 py-3 w-3/5">Product</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Quantity</th>
                  <th className="px-4 py-3">Total</th>
                </tr>
              </thead>
              <tbody className="bg-white glass">
                {Barcode.map((barcode) => (
                  <Entry
                    barcode={barcode}
                    key={barcode}
                    quantity={quantities[barcode] || 1}
                    onQuantityChange={handleQuantityChange}
                  />
                ))}
              </tbody>
            </table>
            {/* Table end here */}
          </div>

          <div className="bg-gray-100 rounded-md w-full h-full max-h-[460px] max-w-xs p-4">
            <h3 className="text-lg max-sm:text-base font-bold text-gray-800 border-b border-gray-300 pb-2">
              Order Summary
            </h3>

            <ul className="text-gray-800 mt-6 space-y-3">
              <li className="flex flex-wrap gap-4 text-sm">
                Subtotal{" "}
                <span className="ml-auto font-bold">
                  ${totalPrice.toFixed(2)}
                </span>
              </li>
              <hr className="border-gray-300" />
              <li className="flex flex-wrap gap-4 text-sm font-bold">
                Total <span className="ml-auto">${totalPrice.toFixed(2)}</span>
              </li>
            </ul>

            <div className="relative h-[300px] flex flex-col justify-end">
              <button
                type="button"
                className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-gray-800 hover:bg-gray-900 text-white rounded-md"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
