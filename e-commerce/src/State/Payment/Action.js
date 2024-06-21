import { api } from '../../config/api';
import { CREATE_PAYMENT_FAILURE, CREATE_PAYMENT_REQUEST, CREATE_PAYMENT_SUCCESS, UPDATE_PAYMENT_FAILURE, UPDATE_PAYMENT_REQUEST, UPDATE_PAYMENT_SUCCESS } from './ActionType';

// export const createPayment = (orderId) => async (dispatch) => {
//    dispatch({type: CREATE_PAYMENT_REQUEST});
//    try {
 
//      const { data } = await api.post(`/api/payments/${orderId}`);
//  console.log("datta",data)
//  if(data.payment_link_url){
//    window.location.href=data.payment_link_url;
//  }
     
//    } catch (error) {
//      dispatch({type: CREATE_PAYMENT_FAILURE,       payload: error.response && error.response.data.message ? error.response.data.message         : error.message, });
//    }
//  };
 


export const createPayment=(reqData)=> async (dispatch)=>{
   dispatch({type: CREATE_PAYMENT_REQUEST});
   console.log("Action Payment ",reqData,reqData.order.id);
   try{
         const {data} = await api.post(`/api/payments/${reqData.order.id}`);
         console.log("Inside Try Catch",data);
   }
   catch{

   }
}



 export const updatePayment = (reqData) => {
   return async (dispatch) => {
     console.log("update payment reqData ",reqData)
     dispatch({type:UPDATE_PAYMENT_REQUEST});
     try {
    
       const {data} = await api.get(`/api/payments/${reqData.orderId}`);
       console.log("updated data",data)
       
     } catch (error) {
       dispatch(UPDATE_PAYMENT_FAILURE);
     }
   };
 };

