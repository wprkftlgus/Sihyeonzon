
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

type CheckoutPageProps = {
  clientSecret: string;
};

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
);

function CheckoutPage({ clientSecret }: CheckoutPageProps) {
  return (
    <Elements stripe={stripePromise}
     options={{clientSecret}}>
      <CheckoutForm />
    </Elements>
  );
}

export default CheckoutPage