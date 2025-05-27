import React from "react";
import KhaltiCheckout from "khalti-checkout-web";

const config = {
    publicKey: "test_public_key_dc74b7b7a0c448b5b8a4b7b7a0c448b5",
    productIdentity: "1234567890",
    productName: "Food Order",
    productUrl: "http://localhost:5173/",
    eventHandler: {
        onSuccess(payload) {
            alert("Payment Success! (Simulated for college project)");
            // Here, you can call your backend to store the order
            // Example: fetch("/api/store-order", { method: "POST", body: JSON.stringify(payload) })
        },
        onError(error) {
            alert("Payment Failed!");
        },
        onClose() {
            console.log("Khalti widget closed");
        }
    },
    paymentPreference: ["KHALTI", "EBANKING", "MOBILE_BANKING", "CONNECT_IPS", "SCT"]
};

function KhaltiPayment({ amount }) {
    const pay = () => {
        const checkout = new KhaltiCheckout(config);
        checkout.show({ amount: amount * 100 }); // Khalti expects paisa
    };

    return (
        <button className="cart-total-button" onClick={pay} style={{marginTop: 20}}>
            Pay with Khalti (Dummy)
        </button>
    );
}

export default KhaltiPayment;
