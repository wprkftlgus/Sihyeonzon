import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${FRONTEND_URL}/payment-success`,
      },
    });

    if (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button className="bg-yellow-300 w-[100px] p-1 rounded-xl hover:bg-yellow-400 font-bold" disabled={!stripe}>Pay</button>
    </form>
  );
}

export default CheckoutForm;
