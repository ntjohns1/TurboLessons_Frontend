import {
  useGetCustomerByOktaIdQuery,
  useGetSubscriptionQuery,
  useGetPaymentMethodsByCustomerQuery,
  useListInvoicesByCustomerQuery,
  useGetUpcomingInvoiceQuery,
  useCreateCustomerMutation,
  useCreateCheckoutSessionMutation,
  useCreatePortalSessionMutation,
} from "../../../service/billingApi";
import { useGetStudentProfileQuery } from "../Students/studentsApi";

/**
 * Billing facade for a single student (by Okta id). Resolves the Stripe
 * customer + its subscription / payment methods / invoices / upcoming usage,
 * and exposes enroll()/openPortal() which redirect to Stripe-hosted Checkout
 * and the Customer Portal. UI/form state lives in BillingSlice.
 */
export default function useBillingData(oktaId) {
  const { data: customer, isLoading: customerLoading } =
    useGetCustomerByOktaIdQuery(oktaId, { skip: !oktaId });
  const { data: profile } = useGetStudentProfileQuery(oktaId, { skip: !oktaId });

  const customerId = customer?.id;
  const subscriptionId = customer?.subscriptions?.[0];

  const { data: subscription } = useGetSubscriptionQuery(subscriptionId, {
    skip: !subscriptionId,
  });
  const { data: paymentMethods = [] } = useGetPaymentMethodsByCustomerQuery(
    customerId,
    { skip: !customerId }
  );
  const { data: invoices = [] } = useListInvoicesByCustomerQuery(customerId, {
    skip: !customerId,
  });
  const { data: upcomingInvoice } = useGetUpcomingInvoiceQuery(customerId, {
    skip: !customerId,
  });

  const [createCustomer] = useCreateCustomerMutation();
  const [createCheckoutSession, checkoutState] = useCreateCheckoutSessionMutation();
  const [createPortalSession, portalState] = useCreatePortalSessionMutation();

  // Come back to wherever we are now after the Stripe-hosted flow.
  const returnUrl = () => window.location.href;

  // Ensure a Stripe customer (with okta_id) exists, then redirect to Checkout.
  const enroll = async () => {
    let cid = customerId;
    if (!cid) {
      const fullName = profile
        ? `${profile.firstName || ""} ${profile.lastName || ""}`.trim()
        : "";
      const created = await createCustomer({
        name: fullName,
        email: profile?.email,
        "metadata.okta_id": oktaId,
      }).unwrap();
      cid = created.id;
    }
    const session = await createCheckoutSession({
      customer: cid,
      successUrl: returnUrl(),
      cancelUrl: returnUrl(),
    }).unwrap();
    if (session?.url) window.location.href = session.url;
  };

  const openPortal = async () => {
    if (!customerId) return;
    const session = await createPortalSession({
      customer: customerId,
      returnUrl: returnUrl(),
    }).unwrap();
    if (session?.url) window.location.href = session.url;
  };

  return {
    customer,
    customerId,
    subscriptionId,
    subscription,
    paymentMethods,
    invoices,
    upcomingInvoice,
    hasCustomer: !!customerId,
    hasSubscription: !!subscriptionId,
    isLoading: customerLoading,
    enroll,
    openPortal,
    isRedirecting: checkoutState.isLoading || portalState.isLoading,
  };
}
