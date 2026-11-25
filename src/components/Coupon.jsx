
import { useState } from "react";

export default function Coupon({ onApply }) {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  function applyCoupon() {
    const coupons = {
      DRIVE10: 10,
      DRIVE20: 20
    };

    const discount = coupons[code.trim().toUpperCase()];

    if (discount) {
      onApply(discount);
      setMessage(`${discount}% discount applied!`);
    } else {
      onApply(0);
      setMessage("Invalid coupon code.");
    }
  }

  return (
    <div className="coupon-box">
      <h3>Have a coupon?</h3>
      <div className="coupon-input">
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter coupon code"
        />
        <button onClick={applyCoupon}>Apply</button>
      </div>
      <p>{message}</p>
      <small>Try DRIVE10 or DRIVE20</small>
    </div>
  );
}
