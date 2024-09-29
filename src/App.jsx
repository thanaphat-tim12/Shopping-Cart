"use client";
import { useState } from "react";

// รายการผลิตภัณฑ์
const products = [
  { id: 1, name: "Earthen Bottle", price: 48, imageSrc: "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg", imageAlt: "Bottle" },
  { id: 2, name: "Nomad Tumbler", price: 35, imageSrc: "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg", imageAlt: "Tumbler" },
  { id: 3, name: "Focus Paper Refill", price: 89, imageSrc: "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg", imageAlt: "Paper Refill" },
  { id: 4, name: "Machined Mechanical Pencil", price: 35, imageSrc: "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg", imageAlt: "Pencil" },
  { id: 5, name: "Digital Watch", price: 150, imageSrc: "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-05.jpg", imageAlt: "Watch" },
  { id: 6, name: "Wireless Headphones", price: 99, imageSrc: "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-06.jpg", imageAlt: "Headphones" },
  { id: 7, name: "Yoga Mat", price: 30, imageSrc: "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-07.jpg", imageAlt: "Yoga Mat" },
  { id: 8, name: "Coffee Mug", price: 25, imageSrc: "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-08.jpg", imageAlt: "Coffee Mug" },
  { id: 9, name: "Travel Backpack", price: 120, imageSrc: "https://cameramaker.co.th/wp-content/uploads/2024/04/WANDRD-TRANSIT-TRAVEL-BACKPACK-4.jpg", imageAlt: "Backpack" },
  { id: 10, name: "Portable Charger", price: 40, imageSrc: "https://images.thdstatic.com/productImages/88546a95-e48b-4818-b62b-897a2519b82c/svn/telephone-accessories-mlph007lt361-64_600.jpg", imageAlt: "Charger" },
  { id: 11, name: "Bluetooth Speaker", price: 7500, imageSrc: "https://media-cdn.bnn.in.th/109528/Marshall-Bluetooth-Speaker-Kilburn-II-Black-Brass-3-square_medium.jpg", imageAlt: "Speaker" },
];

export default function ShoppingCart() {
  const [cart, setCart] = useState([]);
  const [discountCode, setDiscountCode] = useState("");
  const [shippingCost] = useState(100);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const increaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const calculateTotal = () => {
    const productTotal = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const discount = discountCode === "DISCOUNT10" ? 0.1 * productTotal : 0;
    return productTotal - discount + shippingCost;
  };

  return (
    <div className="bg-gray-100 py-10">
      <Brander /> {/* ส่วนของแบรนด์ */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        {/* ลบหัวข้อ "Products" */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="group relative bg-white shadow-md rounded-lg overflow-hidden">
              <div className="relative w-full h-48 bg-gray-200">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="w-full h-full object-center object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-sm font-medium text-gray-700">{product.name}</h3>
                <p className="mt-1 text-lg font-bold text-gray-900">${product.price}</p>
                <div className="flex justify-center">
                  <button
                    onClick={() => addToCart(product)}
                    className="mt-2 bg-blue-500 text-white text-lg px-8 py-4 rounded"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ส่วนตะกร้าสินค้า */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Shopping Cart</h2>
          {cart.length > 0 ? (
            <>
              <ul className="divide-y divide-gray-200">
                {cart.map((item) => (
                  <li key={item.id} className="flex justify-between py-6">
                    <div className="flex">
                      <img
                        src={item.imageSrc}
                        alt={item.imageAlt}
                        className="h-24 w-24 rounded-md object-cover"
                      />
                      <div className="ml-4">
                        <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                        <p className="mt-1 text-sm text-gray-500">
                          ${item.price} x {item.quantity}
                        </p>
                        <div className="flex mt-2">
                          <button
                            onClick={() => decreaseQuantity(item.id)}
                            className="bg-gray-200 px-2 py-1 rounded-l"
                          >
                            -
                          </button>
                          <span className="bg-white px-3 py-1 border">{item.quantity}</span>
                          <button
                            onClick={() => increaseQuantity(item.id)}
                            className="bg-gray-200 px-2 py-1 rounded-r"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
              
              <div className="mt-6">
                <label htmlFor="discountCode" className="block text-sm font-medium text-gray-700">
                  Discount Code (Use: DISCOUNT10)
                </label>
                <input
                  type="text"
                  id="discountCode"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  className="mt-1 p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mt-4">
                <p className="text-lg font-medium text-gray-900">
                  Total: ${calculateTotal()}
                </p>
                <p className="text-sm text-gray-600">Shipping cost included: $100</p>
              </div>
            </>
          ) : (
            <p>Your cart is empty</p>
          )}
        </div>
      </div>
    </div>
  );
}

// คอมโพเนนต์สำหรับแบรนด์
export function Brander() {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
        <div className="relative mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            shopping cart
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Your tagline or a short description of the store goes here.
          </p>
        </div>
      </div>
    </div>
  );
}
