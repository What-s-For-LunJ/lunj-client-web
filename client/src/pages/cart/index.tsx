import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CiCircleInfo, CiShoppingTag, CiTrash } from "react-icons/ci";

const index = () => {
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <header className="text-center">
            <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
              Your Meal Plan
            </h1>
          </header>
          <div className="mt-8">
            <ul className="space-y-4">
              <li className="flex p-4 items-center rounded gap-4 hover:bg-neutral-100">
                <Image
                  width={400}
                  height={400}
                  src="/ugali-test-img.png"
                  alt=""
                  className="size-16 rounded object-cover md:size-20 lg:size-24"
                />
                <div>
                  <h3 className="text-gray-900">Ugali, Sukuma, Beef</h3>
                  <dl className="mt-0.5 space-y-px text-gray-600">
                    <div className="text-sm">
                      <dt className="font-bold inline">Price:</dt>
                      <dd className="inline"> KES 200</dd>
                    </div>
                    <div className="text-sm">
                      <dt className="font-bold inline">Calories:</dt>
                      <dd className="inline"> 600</dd>
                    </div>
                    <div className="text-xs">
                      <dt className="text-blue-600 hover:underline hover:cursor-pointer">
                        <div className="flex items-center space-x-1">
                          <CiCircleInfo />
                          <p>View more info</p>
                        </div>
                      </dt>
                    </div>
                  </dl>
                </div>
                <div className="flex flex-1 items-center justify-end gap-2">
                  <form>
                    <input
                      type="number"
                      value={2}
                      placeholder="0"
                      className="font-bold h-8 w-12 rounded border-gray-200 bg-gray-50 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                    />
                  </form>
                  <button
                    type="button"
                    button-name="delete"
                    className="text-gray-600 transition hover:text-red-400"
                  >
                    <CiTrash />
                  </button>
                </div>
              </li>
            </ul>
            <div className="mt-8 flex justify-end border-t border-neutral-400 pt-8">
              <div className="w-screen max-w-lg space-y-4">
                <dl className="space-y-0.5 text-sm text-gray-700">
                  <div className="flex justify-between">
                    <dt>Subtotal</dt>
                    <dd>KES 2500</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>VAT</dt>
                    <dd>KES 250</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Delivery</dt>
                    <dd>KES 200</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Discount</dt>
                    <dd>-KES 200</dd>
                  </div>
                  <div className="flex justify-between !text-base font-medium">
                    <dt>Total</dt>
                    <dd>KES 2750</dd>
                  </div>
                </dl>
                <div className="flex justify-end">
                  <div className="badge badge-outline">
                    <div className="flex justify-center items-center">
                      <CiShoppingTag />
                      <p className="text-xs">2 Discounts Applied</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Link href="#" className="btn btn-outline btn-wide">
                    Checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default index;
