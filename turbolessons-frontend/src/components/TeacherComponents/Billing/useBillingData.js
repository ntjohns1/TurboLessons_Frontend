import {
  useGetCustomerByOktaIdQuery,
  useGetSubscriptionQuery,
  useGetPaymentMethodsByCustomerQuery,
  useListInvoicesByCustomerQuery,
  useGetUpcomingInvoiceQuery,
} from "../../../service/billingApi";

/**
 * Billing overview facade for a single student (by Okta id). Resolves the Stripe
 * customer, then its subscription / payment methods / invoices / upcoming usage.
 * Server state is RTK Query (billingApi); action components use the mutation
 * hooks directly. UI/form state lives in BillingSlice.
 */
export default function useBillingData(oktaId) {
  const { data: customer, isLoading: customerLoading } =
    useGetCustomerByOktaIdQuery(oktaId, { skip: !oktaId });

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

  return {
    customer,
    customerId,
    subscription,
    paymentMethods,
    invoices,
    upcomingInvoice,
    hasCustomer: !!customerId,
    isLoading: customerLoading,
  };
}
