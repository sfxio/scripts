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
        
        
  
  const _fetch = window.fetch;
  const fetcher = (url, _options = {}) => {
    const options = Object.assign({}, _options);
    options.mode = _options.mode || "cors";
    options.method = options.method || "get";
    return _fetch(url, options).then((res) => res.json());
  };
    const ids = document.querySelector(".trade-cart-sku-item-info-spec-value").innerHTML;
      console.log(ids);
      //  async function getPlanDetails(){
      //    await fetcher(`https://api.shopflex.io/reserve/planDetails?ids=${ids}`).then((res) => res.data);
      //   }
      const planDetails = async function getPlanDetails() 
       {
           await fetcher(`https://api.shopflex.io/reserve/planDetails?ids=${ids}`).then((res) => {
            if(res.code == 200) return res.data;
            return Promise.reject(
              new Error("failed to fetch schedule data")
            );
             }).catch((err) => {
              throw err;
             });
             console.log("planDetails", planDetails);
          }
      getPlanDetails() ;
      
    
      logger.log(planDetails.plan.capacity);
      logger.log(planDetails.resources[0].capacity);
  
    const main_tradeCart = document.querySelector(".main__trade-cart-checkout");
    main_tradeCart.innerHTML += `<div class=checkoutCover style="width:100%;height:100px;position:relative;z-index:10;background-color:blue">click to check</div>`;
    // document.querySelector('.trade-cart-non-empty-continue-btn')
    // const cart_stepperInput = document.querySelector(".cart-stepper-input");
    const checkout_cover = document.querySelector(".checkoutCover");
  
    checkout_cover.addEventListener("click", () => {
      // main_tradeCart.innerHTML += `<div class=checkoutCover style="width:100%;height:100px;position:relative;z-index:10;"></div>`;
      if (planDetails.plan.capacity > planDetails.resources[0].capacity) {
        alert(`only ${planDetails.resources[0].capacity} left, exceeded`);
      } else {
        checkout_cover.style.display = "none";
        alert("Please check out");
      }
    });
  
  