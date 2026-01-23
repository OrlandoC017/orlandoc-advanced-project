"use client";
import React from "react";
import "./style.css";
import { FileText, Handshake, Sprout } from "lucide-react";
import Navbar from "../components/Navbar";
import LoginModal from "../components/LoginModal";
import PaymentModal from "../components/PaymentModal";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { isLoggedIn, userPlan } = useAuth();
  const [isOpen, setIsOpen] = React.useState(false);
  const [expandedFAQ, setExpandedFAQ] = React.useState<number | null>(null);
  const [showLoginModal, setShowLoginModal] = React.useState(false);
  const [showPaymentModal, setShowPaymentModal] = React.useState(false);
  const [selectedPlan, setSelectedPlan] = React.useState<"yearly" | "monthly">("yearly");
  const handleStartTrial = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Get the selected plan from the form
    const formData = new FormData(e.target as HTMLFormElement);
    const plan = formData.get("plan") as "yearly" | "monthly";
    setSelectedPlan(plan);

    // Check if user is logged in
    if (!isLoggedIn) {
      // User not logged in, show login modal first
      setShowLoginModal(true);
      return;
    }

    // Check if user has free account
    if (userPlan === "free") {
      // User is logged in with free account, show payment modal
      setShowPaymentModal(true);
    } else {
      // User already has premium, notify them
      alert("You already have a premium subscription!");
    }
  };

  // When user successfully logs in, show payment modal
  React.useEffect(() => {
    if (isLoggedIn && !showLoginModal && userPlan === "free") {
      // If we just closed the login modal and user is now logged in
      // Check if we should show payment modal
      const shouldShowPayment = sessionStorage.getItem("showPaymentAfterLogin");
      if (shouldShowPayment === "true") {
        setShowPaymentModal(true);
        sessionStorage.removeItem("showPaymentAfterLogin");
      }
    }
  }, [isLoggedIn, showLoginModal, userPlan]);

  const handleLoginModalClose = () => {
    setShowLoginModal(false);
    // If user is now logged in and has free plan, show payment modal
    if (isLoggedIn && userPlan === "free") {
      setShowPaymentModal(true);
    }
  };

  return (
    <>
      <LoginModal isOpen={showLoginModal} onClose={handleLoginModalClose} />
      <PaymentModal 
        isOpen={showPaymentModal} 
        onClose={() => setShowPaymentModal(false)}
        selectedPlan={selectedPlan}
      />
      <div>
        <main>
          <Navbar />
          <section id="features">
            <div className="container">
              <div className="row">
                <div className="plan__title">
                  Get unlimited access to many amazing books to read
                </div>
                <div className="features__wrapper">
                  <div className="features">
                    <div className="features__icon">
                      <FileText />
                    </div>
                    <div className="features__title">
                      Key ideas in a few minutes
                    </div>
                    <div className="features__sub--title">
                      with many books to read
                    </div>
                  </div>
                  <div className="features">
                    <div className="features__icon">
                      <Sprout />
                    </div>
                    <div className="features__title">Over 3 million people</div>
                    <div className="features__sub--title">
                      are growing with Summerest every day!
                    </div>
                  </div>
                  <div className="features">
                    <div className="features__icon">
                      <Handshake />
                    </div>
                    <div className="features__title">
                      Precise recommendations
                    </div>
                    <div className="features__sub--title">
                      collections curated by experts
                    </div>
                  </div>
                </div>
                <div className="quote__section">
                  <blockquote className="quote__text">
                    What an astonishing thing a book is. It's a flat object made from a tree with flexible parts on which are imprinted lots of funny dark squiggles. But one glance at it and you're inside the mind of another person ...
                  </blockquote>
                  <p className="quote__author">— Carl Sagan</p>
                </div>
                <div className="plan__title">
                  Choose the plan that's right for you!
                </div>
                <p className="plan__subtitle">
                  Select the perfect plan to start reading today
                </p>

                

                <form className="plan__form" onSubmit={handleStartTrial}>
                  <div className="plan__options--wrapper">
                    <label className="plan__selection">
                      <input
                        type="radio"
                        name="plan"
                        value="yearly"
                        defaultChecked
                      />
                      <div className="plan__wrapper--selected">
                        <div className="plan__header">
                          <div className="plan__badge">BEST VALUE</div>
                          <div className="plan__type">Yearly Plan</div>
                        </div>
                        <div className="plan__price">
                          $59.99
                          <span className="plan__price--period">/year</span>
                        </div>
                        <p className="plan__trial">7-day free trial included</p>
                        <div className="plan__benefits--wrapper">
                          <div className="plan__benefit">
                            ✓ Save 20% compared to monthly
                          </div>
                          <div className="plan__benefit">
                            ✓ Billed once annually
                          </div>
                          <div className="plan__benefit">
                            ✓ Unlimited access
                          </div>
                        </div>
                      </div>
                    </label>
                    <label className="plan__selection">
                      <input type="radio" name="plan" value="monthly" />
                      <div className="plan__wrapper">
                        <div className="plan__header">
                          <div className="plan__type">Monthly Plan</div>
                        </div>
                        <div className="plan__price">
                          $5.99
                          <span className="plan__price--period">/month</span>
                        </div>
                        <p className="plan__trial">7-day free trial included</p>
                        <div className="plan__benefits--wrapper">
                          <div className="plan__benefit">✓ Billed monthly</div>
                          <div className="plan__benefit">✓ Cancel anytime</div>
                          <div className="plan__benefit">
                            ✓ Unlimited access
                          </div>
                        </div>
                      </div>
                    </label>
                  </div>
                  <button className="plan__button--primary" type="submit">
                    Start your 7-day free trial
                  </button>
                  <p className="plan__terms">
                    You can change or cancel your plan anytime.
                  </p>
                </form>
              </div>
            </div>
          </section>

          <section id="faq">
            <div className="container">
              <div className="row">
                <div className="faq__title">Frequently Asked Questions</div>
                <div className="faq__wrapper">
                  <div className="faq__item">
                    <button
                      className="faq__header"
                      onClick={() =>
                        setExpandedFAQ(expandedFAQ === 0 ? null : 0)
                      }
                    >
                      <span className="faq__question">
                        How does the free 7-day trial work?
                      </span>
                      <span
                        className={`faq__toggle ${expandedFAQ === 0 ? "active" : ""}`}
                      >
                        +
                      </span>
                    </button>
                    {expandedFAQ === 0 && (
                      <div className="faq__content">
                        Begin your complimentary 7-day trial with Summarist
                        after you put in your credit card info. You are under no
                        obligation to continue your subscription, and you will
                        only be billed when the trial period expires. With
                        Premium access, you can learn at your own pace and as
                        frequently as you desire, and you may terminate your
                        subscription prior to the conclusion of the 7-day free
                        trial.
                      </div>
                    )}
                  </div>
                  <div className="faq__item">
                    <button
                      className="faq__header"
                      onClick={() =>
                        setExpandedFAQ(expandedFAQ === 1 ? null : 1)
                      }
                    >
                      <span className="faq__question">
                        Can I switch subscriptions from monthly to yearly, or
                        yearly to monthly?
                      </span>
                      <span
                        className={`faq__toggle ${expandedFAQ === 1 ? "active" : ""}`}
                      >
                        +
                      </span>
                    </button>
                    {expandedFAQ === 1 && (
                      <div className="faq__content">
                        While an annual plan is active, it is not feasible to
                        switch to a monthly plan. However, once the current
                        month ends, transitioning from a monthly plan to an
                        annual plan is an option.
                      </div>
                    )}
                  </div>
                  <div className="faq__item">
                    <button
                      className="faq__header"
                      onClick={() =>
                        setExpandedFAQ(expandedFAQ === 2 ? null : 2)
                      }
                    >
                      <span className="faq__question">
                        What's included in the Premium plan?
                      </span>
                      <span
                        className={`faq__toggle ${expandedFAQ === 2 ? "active" : ""}`}
                      >
                        +
                      </span>
                    </button>
                    {expandedFAQ === 2 && (
                      <div className="faq__content">
                        Premium membership provides you with the ultimate
                        Summarist experience, including unrestricted entry to
                        many best-selling books high-quality audio, the ability
                        to download titles for offline reading, and the option
                        to send your reads to your Kindle.
                      </div>
                    )}
                  </div>
                  <div className="faq__item">
                    <button
                      className="faq__header"
                      onClick={() =>
                        setExpandedFAQ(expandedFAQ === 3 ? null : 3)
                      }
                    >
                      <span className="faq__question">
                        Can I cancel during my trial or subscription?
                      </span>
                      <span
                        className={`faq__toggle ${expandedFAQ === 3 ? "active" : ""}`}
                      >
                        +
                      </span>
                    </button>
                    {expandedFAQ === 3 && (
                      <div className="faq__content">
                        You will not be charged if you cancel your trial before
                        its conclusion. While you will not have complete access
                        to the entire Summarist library, you can still expand
                        your knowledge with one curated book per day.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="footer">
            <div className="container">
              <div className="row">
                <div className="footer__top--wrapper">
                  <div className="footer__block">
                    <div className="footer__link--title">Actions</div>
                    <div>
                      <div className="footer__link--wrapper">
                        <a className="footer__link">Summarist Magazine</a>
                      </div>
                      <div className="footer__link--wrapper">
                        <a className="footer__link">Cancel Subscription</a>
                      </div>
                      <div className="footer__link--wrapper">
                        <a className="footer__link">Help</a>
                      </div>
                      <div className="footer__link--wrapper">
                        <a className="footer__link">Contact us</a>
                      </div>
                    </div>
                  </div>
                  <div className="footer__block">
                    <div className="footer__link--title">Useful Links</div>
                    <div>
                      <div className="footer__link--wrapper">
                        <a className="footer__link">Pricing</a>
                      </div>
                      <div className="footer__link--wrapper">
                        <a className="footer__link">Summarist Business</a>
                      </div>
                      <div className="footer__link--wrapper">
                        <a className="footer__link">Gift Cards</a>
                      </div>
                      <div className="footer__link--wrapper">
                        <a className="footer__link">Authors & Publishers</a>
                      </div>
                    </div>
                  </div>
                  <div className="footer__block">
                    <div className="footer__link--title">Company</div>
                    <div>
                      <div className="footer__link--wrapper">
                        <a className="footer__link">About</a>
                      </div>
                      <div className="footer__link--wrapper">
                        <a className="footer__link">Careers</a>
                      </div>
                      <div className="footer__link--wrapper">
                        <a className="footer__link">Partners</a>
                      </div>
                      <div className="footer__link--wrapper">
                        <a className="footer__link">Code of Conduct</a>
                      </div>
                    </div>
                  </div>
                  <div className="footer__block">
                    <div className="footer__link--title">Other</div>
                    <div>
                      <div className="footer__link--wrapper">
                        <a className="footer__link">Sitemap</a>
                      </div>
                      <div className="footer__link--wrapper">
                        <a className="footer__link">Legal Notice</a>
                      </div>
                      <div className="footer__link--wrapper">
                        <a className="footer__link">Terms of Service</a>
                      </div>
                      <div className="footer__link--wrapper">
                        <a className="footer__link">Privacy Policies</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="footer__copyright--wrapper">
                  <div className="footer__copyright">
                    Copyright &copy; 2026 Summarist
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
