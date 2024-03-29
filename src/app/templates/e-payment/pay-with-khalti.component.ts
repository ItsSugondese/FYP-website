// import { Component, EventEmitter, OnInit, Output } from '@angular/core';
// import KhaltiCheckout from 'khalti-checkout-web';

// @Component({
//   selector: 'pay-with-khalti',
//   template: `
 
//   `,
//   styles: [
// ],
// })
// export class PayWithKhaltiComponent{

//     constructor() { }

//   ngOnInit(): void {
//     const config = {
//       // replace this key with yours
//       "publicKey": "test_public_key_dc74e0fd57cb46cd93832aee0a390234",
//       "productIdentity": "1234567890",
//       "productName": "Drogon",
//       "productUrl": "http://gameofthrones.com/buy/Dragons",
//       "eventHandler": {
//         onSuccess: (payload: any) => {
//           // hit merchant api for initiating verification
//           console.log(payload);
//         },
//         // onError handler is optional
//         onError: (error: any) => {
//           // handle errors
//           console.log(error);
//         },
//         onClose: () => {
//           console.log('widget is closing');
//         }
//       },
//       "paymentPreference": ["KHALTI", "EBANKING", "MOBILE_BANKING", "CONNECT_IPS", "SCT"],
//     };

//     const checkout = new KhaltiCheckout(config);
//     const btn = document.getElementById("payment-button");
//     btn.onclick = () => {
//       // minimum transaction amount must be 10, i.e 1000 in paisa.
//       checkout.show({ amount: 1000 });
//     }
//   }
  
    
// }
