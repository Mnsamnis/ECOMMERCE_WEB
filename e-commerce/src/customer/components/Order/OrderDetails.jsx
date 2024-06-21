import React from "react";
import AddressCard from "../AddressCard/AddressCard";
import OrderTracker from "./OrderTracker";
import { Box, Grid } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import StarBorderIcon from "@mui/icons-material/StarBorder";

const OrderDetails = () => {
  return (
    <div className="px-5 lg:px-20">
      <div className="px-5 pb-3 border rounded-md shadow-md">
        <h1 className="font-bold text-xl py-7">Delivery Address</h1>
        <AddressCard />
      </div>
      <div className="my-10 rounded-md py-20 border shadow-md">
        <OrderTracker activeStep={3} />
      </div>
      <Grid container className="space-y-5">
         {[1,1,1].map((item)=> <Grid
          item
          container
          className="shadow-md rounded-md p-5 border transition duration-300 ease-in-out hover:shadow-xl hover:bg-gray-50"
          sx={{ alignItems: "center", justifyContent: "space-between" }}
        >
          <Grid item xs={6}>
            <div className="flex items-center space-x-4 font-semibold">
              <img
                className="w-[5rem] h-[5rem] object-cover object-top"
                src="https://rukminim1.flixcart.com/image/612/612/xif0q/kurta/g/6/k/m-sksh-dt1105-pcbl-fubar-original-imafux247zhqym2z-bb.jpeg?q=70"
                alt=""
              />
              <div className="space-y-2 mt-2">
                <p className="font-semibold">Men Slim Fit Mid Blue</p>
                <p className="space-x-5 opacity-50 text-xs font-semibold">
                  <span>Color : Black</span>
                  <span>Size : M</span>
                </p>
                <p>Seller : Lineria</p>
                <p>₹2499</p>
              </div>
            </div>
          </Grid>
          <Grid item>
            <Box sx={{ color: deepPurple[500] }}>
              <StarBorderIcon sx={{ fontSize: "2rem" }} className="px-2" />
              <span>Rate & Review Product</span>
            </Box>
          </Grid>
        </Grid>)}
       
      </Grid>
    </div>
  );
};

export default OrderDetails;
