import React, { useEffect } from "react";
import CartItem from "./CartItem";
import { Button, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../../../State/store";
import { getCart } from "../../../State/Cart/Action";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");
  const { cart } = useSelector((store) => store);
  console.log("cartssssssssssss ", cart);

  useEffect(() => {
    dispatch(getCart(jwt));
  }, [cart.updateCartItem, cart.deleteCartItem, jwt]);

  const handleCheckout = () => {
    navigate("/checkout?step=2");
  };
  return (
    <div className="mx-4">
      <div className="lg:grid grid-cols-3 lg:px-16 relative mx-4">
        <div className="col-span-2" >
          {cart.cart?.cartItems.length > 0 ? (
            cart.cart.cartItems.sort((a, b) => a.id - b.id).map((item) => (
              <CartItem key={item.id} item={item} showButton={true} />
            ))
          ) : (
            <div
              className="empty-cart-message"
              style={{ textAlign: "center", padding: "20px" }}
            >
              <p
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  color: "#5931a8",
                }}
              >
                Oops! Your cart is empty.
              </p>
            </div>
          )}
        </div>
        <div className="px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0">
          <div className="border">
            <p className="uppercase font-bold opacity-60 pb-4 px-2 py-2">
              Price Details:
            </p>
            <Divider />
            <div className="space-y-3 font-semibold px-2 pb-2">
              <div className="flex justify-between pt-3 text-black">
                <span>Price</span>
                <span>₹{cart.cart?.totalPrice}</span>
              </div>
              <div className="flex justify-between pt-3 ">
                <span>Discount</span>
                <span className="text-green-600">₹{cart.cart?.discount}</span>
              </div>
              <div className="flex justify-between pt-3 ">
                <span>Delivery Charge</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between pt-3 font-bold">
                <span>Total Amount</span>
                <span className="text-green-600">
                  ₹{cart.cart?.totalDiscountedPrice}
                </span>
              </div>
            </div>
          </div>
          <div className="my-3">
            {cart.cart?.cartItems.length > 0 && (
              <Button
                onClick={handleCheckout}
                variant="contained"
                className="w-full"
                sx={{
                  px: "2.5rem",
                  py: "0.7rem",
                  bgcolor: "#9155fd",
                  "&:hover": {
                    bgcolor: "#5931a8",
                  },
                }}
              >
                Checkout
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
