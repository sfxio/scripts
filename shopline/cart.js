// // JS here
// const logger = {
//   log(...args) {
//     console.log("[CART]: ", ...args);
//   },
//   warn(...args) {
//     console.warn("[CART]: ", ...args);
//   },
//   error(...args) {
//     console.error("[CART]: ", ...args);
//   },
// };

// if(Shopline.uri.alias == "Cart"){
//   const ids = document.querySelector(
//     ".trade-cart-sku-item-info-spec-value"
//   ).innerHTML;
//   console.log(ids);
//   //  async function getPlanDetails(){
//   //    await fetcher(`https://api.shopflex.io/reserve/planDetails?ids=${ids}`).then((res) => res.data);
//   //   }
//   if(ids){
//     let res;
//   let plan_Details = {};
//   let planCapacity;
//   let resourcesCapacity;
//   // let capacity ='';
//   async function getPlanDetails() {
//     res = await fetch(
//       `https://api.shopflex.io/reserve/planDetails?ids=${ids}`
//     ).then((res) => {
//       console.log(res);
//       return res.json();
//     });
//     plan_Details = res.data;
//     console.log(plan_Details);
//     // logger.log(plan_Details.plan);
//     planCapacity = plan_Details.plan.capacity;
//     resourcesCapacity = plan_Details.resources[0].capacity;
//     console.log("planCapacity", planCapacity);
//     console.log("resourcesCapacity", resourcesCapacity);
  
  
//     let main_tradeCart = document.querySelector(".main__trade-cart-checkout");
//     let cartCheckout = document.querySelector(
//       ".shopline-element-cart-checkout");
//       let trade_cart_checkout_module = document.querySelector(".trade-cart-checkout-module");
//     cartCheckout.style.display="none";
//     const divE = document.createElement('div');
//     const divId = document.createAttribute("id");
//     divId.value = "checkoutCover";
//     divE.setAttributeNode(divId);
//     // trade_cart_checkout_module.appendChild(divE);
//     trade_cart_checkout_module.insertBefore(divE,main_tradeCart);
//     let checkoutCover = document.querySelector("#checkoutCover");
//     checkoutCover.innerHTML = `<div class=checkoutCover style="width:100%;height:50px;z-index:10;background-color:#74716C;    cursor: pointer;vertical-align: middle;display: flex;justify-content: center;
//     align-items: center;
//   ">
//     <button style="border:none;cursor:pointer;background-color:#74716C;font-size:14px;color:#fff;font-weight:bold">click to check</button>
//     </div>`;
//     main_tradeCart.style.display="none";
    
    
//     // main_tradeCart.addEventListener('mouseover',()=>{
//     // alert(1);
//     // const div = document.createElement("div");
//     // div = document.createAttribute("class=checkoutCover");
//     // // checkoutCover = document.createAttribute("class");
  
//     // cartCheckout.style.display = "none";
   
    
  
//     // const checkoutCover = document.querySelector(".checkoutCover");
//     checkoutCover.addEventListener("click",()=>{
//       if (planCapacity > resourcesCapacity) {
//         alert(`only ${resourcesCapacity} left, exceeded`);
//         // main_tradeCart.style.cursor = "no-allowed";
//       } else {
//         checkoutCover.style.display = "none";
//         main_tradeCart.style.display = "flex";
//         alert("Order is OK, continue");
//       }
//     })
//   }
  
//   getPlanDetails();
//   }
  
  
  
  
// }



  

  
// // let capacity;
// // const {plan, resources} = plan_Details;
// // const {capacity} = plan;

// // cartCheckout.style.display = "none";



// // main_tradeCart.addEventListener('mouseout',()=>{
// //   // alert(1);
// //   cartCheckout.style.display = "flex";
// // })

// // document.querySelector('.trade-cart-non-empty-continue-btn')
// // const cart_stepperInput = document.querySelector(".cart-stepper-input");
// // const checkout_cover = document.querySelector(".checkoutCover");
// // if(checkout_cover){
// //   checkout_cover.addEventListener("click", () => {
// //     // main_tradeCart.innerHTML += `<div class=checkoutCover style="width:100%;height:100px;position:relative;z-index:10;"></div>`;
// //     if (planCapacity > resourcesCapacity) {
// //       alert(`only ${resourcesCapacity} left, exceeded`);
// //     } else {
// //       checkout_cover.style.display = "none";
// //       alert("Please check out");
// //     }
// //   });
// // }
