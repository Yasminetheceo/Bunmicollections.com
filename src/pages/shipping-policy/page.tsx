import { useEffect } from 'react';

const ShippingPolicyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-[#FAF8F5] py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-black/60 mb-4">
            Our Commitment
          </p>
          <h1 className="font-bebas text-6xl md:text-7xl tracking-wide text-black mb-6">
            Shipping Policy
          </h1>
          <p className="text-base text-black/70 max-w-2xl mx-auto">
            Every order is handled with intention and care
          </p>
        </div>
      </section>

      {/* Policy Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* Shipping & Fulfillment */}
          <div className="mb-16">
            <h2 className="font-bebas text-4xl tracking-wide text-black mb-6">
              Shipping & Fulfillment
            </h2>
            <div className="space-y-4 text-black/80 leading-relaxed">
              <p>
                At Bunmi, every order is handled with intention and care.
              </p>
              <p>
                Because many of our pieces are prepared upon order, please allow <strong>3–5 business days</strong> for processing before shipment. Once your order has been prepared, it will be shipped via our selected carrier.
              </p>
              <p>
                <strong>Estimated delivery time after shipment:</strong> 2–5 business days (U.S.)
              </p>
              <p>
                <strong>Total estimated timeframe:</strong> 5–10 business days from order date.
              </p>
              <p>
                You will receive a confirmation email with tracking information once your order has shipped.
              </p>
              <p className="italic pt-4">
                We do not rush the process. A Signature Lady never does.
              </p>
            </div>
          </div>

          {/* Order Accuracy */}
          <div className="mb-16">
            <h2 className="font-bebas text-4xl tracking-wide text-black mb-6">
              Order Accuracy
            </h2>
            <div className="space-y-4 text-black/80 leading-relaxed">
              <p>
                Please ensure that your shipping address is entered correctly at checkout.
              </p>
              <p>
                <strong>Bunmi is not responsible for:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Incorrect or incomplete addresses provided at checkout</li>
                <li>Packages marked as delivered by the carrier</li>
                <li>Delays caused by the shipping carrier</li>
              </ul>
              <p className="pt-4">
                If a package is returned due to address error, the customer is responsible for reshipping fees.
              </p>
            </div>
          </div>

          {/* Lost or Stolen Packages */}
          <div className="mb-16">
            <h2 className="font-bebas text-4xl tracking-wide text-black mb-6">
              Lost or Stolen Packages
            </h2>
            <div className="space-y-4 text-black/80 leading-relaxed">
              <p>
                Once an order has been marked as delivered by the carrier, Bunmi is not liable for lost or stolen packages.
              </p>
              <p>
                If you believe your package has been misplaced, we encourage you to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Contact the carrier directly.</li>
                <li>Check with neighbors or your leasing office.</li>
              </ul>
              <p className="pt-4">
                We are happy to assist with filing a claim, but responsibility rests with the carrier once delivery is confirmed.
              </p>
            </div>
          </div>

          {/* Shipping Delays */}
          <div className="mb-16">
            <h2 className="font-bebas text-4xl tracking-wide text-black mb-6">
              Shipping Delays
            </h2>
            <div className="space-y-4 text-black/80 leading-relaxed">
              <p>
                While we strive to meet all estimated timelines, unforeseen circumstances such as weather, holidays, or carrier delays may extend shipping times.
              </p>
              <p className="italic">
                We appreciate your grace and understanding.
              </p>
            </div>
          </div>

          {/* Returns & Exchanges Policy */}
          <div className="mb-16 pt-12 border-t border-black/10">
            <h2 className="font-bebas text-4xl tracking-wide text-black mb-6">
              Returns & Exchanges Policy
            </h2>
            <div className="space-y-4 text-black/80 leading-relaxed">
              <p>
                Due to the hygienic nature of hair extensions and to maintain the highest quality standards for all guests, <strong>all sales are final</strong>.
              </p>
              <p>
                <strong>Exchanges are only accepted if:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>The item was received defective,</li>
                <li>You notify us within&nbsp;3 days&nbsp;of delivery,</li>
                <li>The item remains unused, uninstalled, and in original packaging with seals intact.</li>
              </ul>
              <p className="pt-4">
                For approval, email <a href="mailto:hello@bunmicollection.com" className="underline hover:text-black transition-colors">hello@bunmicollection.com</a> with order number, photos, and details. If approved, the customer will be responsible for the return shipping label.
              </p>
            </div>
          </div>

          {/* Order Changes & Cancellations */}
          <div className="mb-16">
            <h2 className="font-bebas text-4xl tracking-wide text-black mb-6">
              Order Changes & Cancellations
            </h2>
            <div className="space-y-4 text-black/80 leading-relaxed">
              <p>
                Orders cannot be modified or canceled once processing has begun.
              </p>
              <p>
                Please review your order carefully before completing your purchase.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShippingPolicyPage;
