import { Alert, AlertTitle, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AddressCard from './../AddressCard/AddressCard';
import { useParams } from 'react-router-dom';
import { getOrderById } from '../../../State/Order/Action';
import { updatePayment } from '../../../State/Payment/Action';
import OrderTracker from '../Order/OrderTracker';

const PaymentSuccess = () => {
   // razorpay_payment_link_reference_id
   // razorpay_payment_id
   const [paymentId, setPaymentId] = useState("");
   const [referenceId, setReferenceId] = useState("");
   const [paymentStatus, setPaymentStatus] = useState("");
   const {orderId}=useParams();
   console.log("order id",orderId)
   
 
   
 
   const jwt = localStorage.getItem("jwt");
   const dispatch = useDispatch();
   const { order } = useSelector((store) => store);
 
  
 
    useEffect(() => {

      dispatch(getOrderById(orderId))
      console.log("order status by Id",order)
     
   //     const data = { orderId, paymentId };
      //  dispatch(updatePayment(orderId));
   //    //  dispatch(getOrderById(orderId));

     
   }, [orderId, paymentId]);
 
   return (
     <div className="px-2 lg:px-36">
       <div className="flex flex-col justify-center items-center">
         <Alert
           variant="filled"
           severity="success"
           sx={{ mb: 6, width: "fit-content" }}
         >
           <AlertTitle>Payment Success</AlertTitle>
           Congratulation Your Order Get Placed
         </Alert>
       </div>
 
       <OrderTracker activeStep={1}/>
 
       <Grid container className="space-y-5 py-5 pt-20">
         {order.order?.orderItems?.map((item) => (
           <Grid
             container
             item
             className="shadow-xl rounded-md p-5 border"
             sx={{ alignItems: "center", justifyContent: "space-between" }}
           >
             <Grid item xs={6}>
               {" "}
               <div className="flex  items-center ">
                 <img
                   className="w-[5rem] h-[5rem] object-cover object-top"
                   src={item.product.imageUrl}
                   alt=""
                 />
                 <div className="ml-5 space-y-2">
                   <p className="">{item?.product?.title}</p>
                   <p className="opacity-50 text-xs font-semibold space-x-5">
                     <span>Color: {item.product.color}</span> <span>Size: {item.size}</span>
                   </p>
                   <p>Seller:{item.product.brand}</p>
                   <p>₹{item.price}</p>
                 </div>
               </div>
             </Grid>
             <Grid item>
               <AddressCard address={order.order?.shippingAddress} />
             </Grid>
           </Grid>
         ))}
       </Grid>
     </div>
   );
 };
 
 export default PaymentSuccess;