import React, { useEffect, useState } from "react";
import AddressCard from "../AddressCard/AddressCard";
import { Button, Divider } from "@mui/material";
import CartItem from "../Cart/CartItem";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById } from "../../../State/Order/Action";
import { createPayment } from "../../../State/Payment/Action";
import CircularProgressWithLabel from "./Circular";

const OrderSummary = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("order_id");
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { order } = useSelector((state) => state);
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [paymentCompleted, setPaymentCompleted] = useState(true);

  useEffect(() => {
    dispatch(getOrderById(orderId));
  }, [orderId]);

  const handleCheckout = () => {
    console.log("Order Summary", order.order);
    dispatch(createPayment(order));
    setPaymentCompleted(false);

    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 100 : prevProgress + 20
      );
    }, 800);

    setTimeout(() => {
      clearInterval(timer);

      navigate(`/api/payments/${orderId}`);
    }, 5000); // Simulating a 5-second payment process
  };

  return (
    <>
      <div>
        <div className="p-5 shadow-lg rounded-s-md border">
          <AddressCard address={order.order?.shippingAddress} />
        </div>

        <div>
          <div className="lg:grid grid-cols-3 relative mx-2">
            <div className="col-span-2">
              {order.order?.orderItems?.map((item) => (
                <>
                  <CartItem item={item} showButton={false} />
                </>
              ))}
            </div>
            <div className="sticky top-0 h-[100vh] mt-5 lg:mt-0 ml-5">
              <div className="border p-5 bg-white shadow-lg rounded-md">
                <p className="font-bold opacity-60 pb-4">PRICE DETAILS</p>
                <hr />

                <div className="space-y-3 font-semibold">
                  <div className="flex justify-between pt-3 text-black ">
                    <span>Price ({order.order?.totalItem} item)</span>
                    <span>₹{order.order?.totalPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Discount</span>
                    <span className="text-green-700">
                      -₹{order.order?.discount}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Charges</span>
                    <span className="text-green-700">Free</span>
                  </div>
                  <hr />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total Amount</span>
                    <span className="text-green-700">
                      ₹{order.order?.totalDiscountedPrice}
                    </span>
                  </div>
                </div>
                {!paymentCompleted ? (<div  className="my-5 mx-35">
                  <CircularProgressWithLabel value={progress} />
                  </div>
                ) : (
                  <Button
                    onClick={handleCheckout}
                    variant="contained"
                    className="w-full"
                    sx={{
                      px: "2.5rem",
                      py: "0.7rem",
                      mt: "1.5rem",
                      bgcolor: "#9155fd",
                      "&:hover": { bgcolor: "#5931a8" },
                    }}
                  >
                    Checkout
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderSummary;
