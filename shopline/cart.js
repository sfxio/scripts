
// JS here
const logger = {
  log(...args) {
    console.log("[CART]: ", ...args);
  },
  warn(...args) {
    console.warn("[CART]: ", ...args);
  },
  error(...args) {
    console.error("[CART]: ", ...args);
  },
};
logger.log('start...')
// 封装函数使用最好
// 提前定义好全局变量
const cart_stepper_button = document.querySelector(".cart-stepper-button");
const cart_stepper_input = document.querySelector(".cart-stepper-input");
let cartAmount;
function getInputValue(){
  cartAmount = document.querySelector(".cart-stepper-input").value;
}

cart_stepper_button.addEventListener("click",()=>{
  getInputValue();
  getPlanDetails();
});
cart_stepper_input.addEventListener("change",()=>{
  getInputValue();
  getPlanDetails();
})

getInputValue();

const ids = localStorage.getItem("uniqueCode");
if(Shopline.uri.alias == "Cart"){
  // const ids = document.querySelector(
  //   ".trade-cart-sku-item-info-spec-value"
  // ).innerHTML;
  // const ids = document.querySelector(
  //   ".trade-cart-sku-item-info-spec-value"
  // ).innerHTML;
  
  console.log(ids);
  //  async function getPlanDetails(){
  //    await fetcher(`https://api.shopflex.io/reserve/planDetails?ids=${ids}`).then((res) => res.data);
  //   }
  if(ids){
  // let capacity ='';
  // 需优化，catch 捕获错误
  getPlanDetails();
  }
}

let res;
  let plan_Details = {};
  let resourcesCapacity;
async function getPlanDetails() {
  res = await fetch(
    `https://api.shopflex.io/reserve/planDetails?ids=${ids}`
  ).then((res) => {
    console.log(res);
    return res.json();
  });
  plan_Details = res.data;
  console.log(plan_Details);
  resourcesCapacity = ids.endsWith(0)? 0 : plan_Details.resources[0].capacity;
  console.log("resourcesCapacity", resourcesCapacity);


  let main_tradeCart = document.querySelector(".main__trade-cart-checkout");
  let cartCheckout = document.querySelector(
    ".shopline-element-cart-checkout");
    let trade_cart_checkout_module = document.querySelector(".trade-cart-checkout-module");
  cartCheckout.style.display="none";
  const divE = document.createElement('div');
  const divId = document.createAttribute("id");
  divId.value = "checkoutCover";
  divE.setAttributeNode(divId);
  // trade_cart_checkout_module.appendChild(divE);
  trade_cart_checkout_module.insertBefore(divE,main_tradeCart);
  let checkoutCover = document.querySelector("#checkoutCover");
  checkoutCover.innerHTML = `<div class="checkoutCover" style="width:100%;height:50px;z-index:10;background-color:#74716C;    cursor: pointer;vertical-align: middle;display: flex;justify-content: center;
  align-items: center;
">
  <button style="border:none;cursor:pointer;background-color:#74716C;font-size:14px;color:#fff;font-weight:bold">click to check</button>
  </div>`;
  main_tradeCart.style.display="none";
  
  
  
  checkoutCover.addEventListener("click",()=>{
    getInputValue();
    if (cartAmount > resourcesCapacity) {
      alert(`only ${resourcesCapacity} left, exceeded`);
      // main_tradeCart.style.cursor = "no-allowed";
    } else {
      checkoutCover.style.display = "none";
      main_tradeCart.style.display = "flex";
      alert("Order is OK, continue");
    }
  })
}

  

  


