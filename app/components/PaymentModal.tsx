"use client";

import React, { useState } from "react";
import { X, CreditCard, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import "./PaymentModal.css";
import { useAuth } from "../context/AuthContext";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: "yearly" | "monthly";
}

export default function PaymentModal({
  isOpen,
  onClose,
  selectedPlan,
}: PaymentModalProps) {
  const router = useRouter();
  const { upgradeToPremium } = useAuth();
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");

  const planDetails = {
    yearly: {
      price: "$59.99",
      period: "year",
      savings: "Save 20% compared to monthly",
    },
    monthly: {
      price: "$5.99",
      period: "month",
      savings: "Billed monthly",
    },
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, "");
    const formatted = cleaned.match(/.{1,4}/g)?.join(" ") || cleaned;
    return formatted;
  };

  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 16) {
      setCardNumber(formatCardNumber(value));
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 4) {
      setExpiryDate(formatExpiryDate(value));
    }
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 3) {
      setCvv(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate inputs
    if (!cardNumber || !cardName || !expiryDate || !cvv) {
      setError("Please fill in all fields");
      return;
    }

    if (cardNumber.replace(/\s/g, "").length !== 16) {
      setError("Card number must be 16 digits");
      return;
    }

    if (cvv.length !== 3) {
      setError("CVV must be 3 digits");
      return;
    }

    if (expiryDate.length !== 5) {
      setError("Invalid expiry date");
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      upgradeToPremium();
      setIsProcessing(false);
      // Reset form
      setCardNumber("");
      setCardName("");
      setExpiryDate("");
      setCvv("");
;
      // Redirect to for-you page
      router.push("/for-you");
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="payment-modal__overlay" onClick={onClose}>
      <div
        className="payment-modal__container"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="payment-modal__close" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="payment-modal__header">
          <h2 className="payment-modal__title">Start Your Free Trial</h2>
          <p className="payment-modal__subtitle">
            7 days free, then {planDetails[selectedPlan].price}/
            {planDetails[selectedPlan].period}
          </p>
        </div>

        <div className="payment-modal__plan-summary">
          <div className="payment-modal__plan-info">
            <span className="payment-modal__plan-name">
              {selectedPlan === "yearly" ? "Yearly" : "Monthly"} Plan
            </span>
            <span className="payment-modal__plan-price">
              {planDetails[selectedPlan].price}/{planDetails[selectedPlan].period}
            </span>
          </div>
          <p className="payment-modal__plan-note">
            {planDetails[selectedPlan].savings}
          </p>
        </div>

        <form className="payment-modal__form" onSubmit={handleSubmit}>
          <div className="payment-modal__section">
            <div className="payment-modal__section-header">
              <CreditCard size={20} />
              <h3>Payment Details</h3>
            </div>

            <div className="payment-modal__field">
              <label htmlFor="cardNumber">Card Number</label>
              <input
                type="text"
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={handleCardNumberChange}
                disabled={isProcessing}
              />
            </div>

            <div className="payment-modal__field">
              <label htmlFor="cardName">Cardholder Name</label>
              <input
                type="text"
                id="cardName"
                placeholder="John Doe"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                disabled={isProcessing}
              />
            </div>

            <div className="payment-modal__row">
              <div className="payment-modal__field">
                <label htmlFor="expiryDate">Expiry Date</label>
                <input
                  type="text"
                  id="expiryDate"
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChange={handleExpiryChange}
                  disabled={isProcessing}
                />
              </div>

              <div className="payment-modal__field">
                <label htmlFor="cvv">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  placeholder="123"
                  value={cvv}
                  onChange={handleCvvChange}
                  disabled={isProcessing}
                />
              </div>
            </div>
          </div>

          {error && <div className="payment-modal__error">{error}</div>}

          <div className="payment-modal__security">
            <Lock size={16} />
            <span>Your payment information is secure and encrypted</span>
          </div>

          <button
            type="submit"
            className="payment-modal__submit"
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : "Start Free Trial"}
          </button>

          <p className="payment-modal__terms">
            By continuing, you agree to be charged {planDetails[selectedPlan].price} after your 7-day free trial ends. Cancel anytime before then to avoid charges.
          </p>
        </form>
      </div>
    </div>
  );
}
