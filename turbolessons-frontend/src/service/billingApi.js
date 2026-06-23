import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";

/**
 * Billing server-state (Stripe via the payment-service), owned by RTK Query.
 *
 * Scoped to the metered-subscription model (see billing-model-decision):
 * a metered monthly Price, one Customer per student with a saved default
 * payment method, a Subscription to that price, and a meter event per logged
 * lesson (30m -> value 1, 1h -> value 2). Stripe sums usage and auto-invoices.
 *
 * This replaces BillingSlice's reduxUtil.js entity-adapter factory and the bulk
 * of billingService.js (meters CRUD, payment intents, manual invoice
 * finalize/pay/void, product/price CRUD, subscription_item CRUD) — all deleted.
 */
export const billingApi = createApi({
  reducerPath: "billingApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Customer", "Subscription", "PaymentMethod", "Invoice", "Price"],
  endpoints: (build) => ({
    // --- Customer ---
    getCustomerByOktaId: build.query({
      query: (oktaId) => ({ url: `/payments/customer/lookup/${oktaId}` }),
      providesTags: (result, error, oktaId) => [{ type: "Customer", id: oktaId }],
    }),
    createCustomer: build.mutation({
      query: (formState) => {
        // Backend expects metadata.okta_id collapsed into the metadata object.
        const { metadata = {}, ...rest } = formState;
        const data = {
          ...rest,
          metadata: { ...metadata, okta_id: formState["metadata.okta_id"] },
        };
        return { url: `/payments/customer`, method: "post", data };
      },
      invalidatesTags: ["Customer"],
    }),
    setDefaultPaymentMethod: build.mutation({
      query: ({ customerId, paymentMethodId }) => ({
        url: `/payments/customer/${customerId}/default-payment-method`,
        method: "put",
        data: paymentMethodId,
      }),
      invalidatesTags: ["Customer", "PaymentMethod"],
    }),

    // --- Payment methods ---
    getPaymentMethodsByCustomer: build.query({
      query: (customerId) => ({
        url: `/payments/paymentmethod/customer/${customerId}`,
      }),
      transformResponse: (response) => response?.data ?? response ?? [],
      providesTags: ["PaymentMethod"],
    }),
    createSetupIntent: build.mutation({
      query: (formState) => ({
        url: `/payments/setupintent`,
        method: "post",
        data: formState,
      }),
    }),
    attachPaymentMethod: build.mutation({
      query: ({ paymentMethodId, customerId }) => ({
        url: `/payments/paymentmethod/attach/${paymentMethodId}/${customerId}`,
        method: "put",
      }),
      invalidatesTags: ["PaymentMethod"],
    }),
    detachPaymentMethod: build.mutation({
      query: (paymentMethodId) => ({
        url: `/payments/paymentmethod/detach/${paymentMethodId}`,
        method: "put",
      }),
      invalidatesTags: ["PaymentMethod"],
    }),

    // --- Price (metered tier; seeded in dashboard, listed here) ---
    listPrices: build.query({
      query: () => ({ url: `/payments/price` }),
      transformResponse: (response) => response?.data ?? response ?? [],
      providesTags: ["Price"],
    }),

    // --- Subscription ---
    getSubscription: build.query({
      query: (id) => ({ url: `/payments/subscription/${id}` }),
      providesTags: (result, error, id) => [{ type: "Subscription", id }],
    }),
    createSubscription: build.mutation({
      query: (formState) => ({
        url: `/payments/subscription`,
        method: "post",
        data: {
          customer: formState.customerId,
          items: formState.items,
          defaultPaymentMethod: formState.defaultPaymentMethod,
          cancelAtPeriodEnd: false,
          cancelAt: null,
        },
      }),
      invalidatesTags: ["Subscription", "Customer"],
    }),
    cancelSubscription: build.mutation({
      query: (id) => ({ url: `/payments/subscription/${id}`, method: "delete" }),
      invalidatesTags: ["Subscription", "Customer"],
    }),

    // --- Invoices (read-only history + accruing upcoming) ---
    listInvoicesByCustomer: build.query({
      query: (customerId) => ({
        url: `/payments/invoice/${customerId}/customer`,
      }),
      transformResponse: (response) => response?.data ?? response ?? [],
      providesTags: ["Invoice"],
    }),
    getUpcomingInvoice: build.query({
      query: (customerId) => ({
        url: `/payments/invoice/${customerId}/upcoming`,
      }),
      providesTags: [{ type: "Invoice", id: "UPCOMING" }],
    }),

    // --- Meter event (the "Log Lesson" action) ---
    createMeterEvent: build.mutation({
      query: (formState) => ({
        url: `/payments/meter_event`,
        method: "post",
        data: formState,
      }),
      // A logged lesson changes the accruing usage on the open invoice.
      invalidatesTags: [{ type: "Invoice", id: "UPCOMING" }],
    }),
  }),
});

export const {
  useGetCustomerByOktaIdQuery,
  useCreateCustomerMutation,
  useSetDefaultPaymentMethodMutation,
  useGetPaymentMethodsByCustomerQuery,
  useCreateSetupIntentMutation,
  useAttachPaymentMethodMutation,
  useDetachPaymentMethodMutation,
  useListPricesQuery,
  useGetSubscriptionQuery,
  useCreateSubscriptionMutation,
  useCancelSubscriptionMutation,
  useListInvoicesByCustomerQuery,
  useGetUpcomingInvoiceQuery,
  useCreateMeterEventMutation,
} = billingApi;
