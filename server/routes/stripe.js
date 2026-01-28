import Stripe from "stripe";
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const stripeRouter = express.Router();

stripeRouter.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body; 

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "gbp", 
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export default stripeRouter

