import * as express from "express";
const router = express.Router();
import Stripe from "stripe";
import { getUsers, updateUser } from "../data/database";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-08-01",
});

const updateSubscriptionStatus = async (subscription: {
  customer: string;
  plan: { id: string };
}) => {
  const { customer: customerId } = subscription;

  const users = await getUsers({ stripeId: customerId });

  if (users.length !== 1) {
    throw new Error("User not found!");
  }

  const uid = users[0].uid;
  const subscribedPlanId = subscription?.plan?.id || "";

  console.debug("priceId", subscribedPlanId);

  updateUser(uid, {
    priceId: subscribedPlanId,
  })
    .then(console.info)
    .catch(console.error);
};

//INFO: Webhook handler for asynchronous events.
router.post("/webhook", async (req, res) => {
  let eventType;
  let event;

  try {
    //INFO: Check if webhook signing is configured.
    if (process.env.STRIPE_WEBHOOK_SECRET) {
      //INFO: Retrieve the event by verifying the signature using the raw body and secret.
      const signature = req.headers["stripe-signature"] as string;

      console.debug("raw body", req.rawBody);
      console.debug("signature", signature);
      console.debug("webhook secret", !!process.env.STRIPE_WEBHOOK_SECRET);

      try {
        event = stripe.webhooks.constructEvent(
          req.rawBody,
          signature,
          process.env.STRIPE_WEBHOOK_SECRET
        );
      } catch (err) {
        console.error("⚠️  Webhook signature verification failed.", err);
        res.status(400).send({ message: "invalid stipe signature" });
        return;
      }
      // INFO: Extract the object from the event.
      // INFO: data = event.data;
      eventType = event?.type;
    } else {
      // INFO: Webhook signing is recommended, but if the secret is not configured in `config.js`,
      // INFO: retrieve the event data directly from the request body.
      // INFO: data = req.body.data;
      eventType = req.body.type;
    }

    switch (eventType) {
      case "customer.subscription.created": {
        console.log("🔔  Payment received!");
        const subscription = event?.data.object as {
          customer: string;
          plan: { id: string };
        };
        updateSubscriptionStatus(subscription);
        break;
      }
      case "customer.subscription.deleted": {
        const subscription = event?.data.object as {
          customer: string;
          plan: { id: string };
        };
        updateSubscriptionStatus(subscription);
        console.log("Payment canceled!");
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event?.data.object as {
          customer: string;
          plan: { id: string };
        };
        updateSubscriptionStatus(subscription);
        console.log("Payment updated!");
        break;
      }

      default:
        console.log(`Unhandled event type ${eventType}`);
    }

    res.sendStatus(200);
  } catch (e) {
    console.debug("webhook failed", e);
    res.sendStatus(500);
  }
});

export default router;
