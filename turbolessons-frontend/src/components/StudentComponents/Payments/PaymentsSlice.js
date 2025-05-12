import {
  createSlice,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import { buildThunks, buildReducers } from "../../../util/reduxUtil";

import {
  getCustomer,
  searchCustomerByOktaId,
  createCustomer,
  editCustomer,
  deleteCustomer,
  listAllInvoicesByCustomer,
  listAllInvoicesBySubscription,
  getInvoice,
  getUpcomingInvoice,
  finalizeInvoice,
  payInvoice,
  voidInvoice,
  retrieveLineItems,
  retrieveUpcomingLineItems,
  getPaymentIntent,
  searchPaymentIntentByCustomer,
  createPaymentIntent,
  editPaymentIntent,
  capturePaymentIntent,
  cancelPaymentIntent,
  listSubscriptionItems,
  getSubscriptionItem,
  createSubscriptionItem,
  updateSubscriptionItem,
  deleteSubscriptionItem,
  getPaymentMethod,
  updateDefaultPaymentMethod,
  searchPaymentMethodByCustomer,
  cancelPaymentMethod,
  attachPaymentMethod,
  detachPaymentMethod,
  listAllPrices,
  getPrice,
  listAllProducts,
  getProduct,
  getSetupIntent,
  createSetupIntent,
  confirmSetupIntent,
  editSetupIntent,
  cancelSetupIntent,
  getSubscription,
  createSubscription,
  editSubscription,
  cancelSubscription,
} from "../../../service/billingService";

// Entity Adapters
const customerAdapter = createEntityAdapter({
  selectId: (customer) => {
    // Check if the customer is an object with an id property
    if (customer && typeof customer === 'object' && customer.id) {
      return customer.id;
    }
    
    // If it's a string (like a customer ID), use that directly
    if (typeof customer === 'string') {
      return customer;
    }
    
    // For any other case, generate a fallback ID to prevent errors
    console.warn('Customer entity without proper ID:', customer);
    return `unknown_${Math.random().toString(36).substring(2, 15)}`;
  }
});
const invoiceAdapter = createEntityAdapter();
const invoiceLineItemAdapter = createEntityAdapter();
const paymentIntentAdapter = createEntityAdapter();
const paymentMethodAdapter = createEntityAdapter({
  selectId: (paymentMethod) => {
    return paymentMethod.id;
  },
});
const priceAdapter = createEntityAdapter({
  selectId: (price) => {
    return price.id;
  },
});
const productAdapter = createEntityAdapter();
const setupIntentAdapter = createEntityAdapter({
  selectId: (setupIntent) => {
    return setupIntent.id;
  },
});
const subscriptionAdapter = createEntityAdapter();
const subscriptionItemAdapter = createEntityAdapter({
  selectId: (subscriptionItem) => {
    return subscriptionItem.id;
  },
});

// Thunks

//  Customer
const customerThunks = buildThunks("Customer", {
  get: getCustomer,
  searchByCustomer: searchCustomerByOktaId,
  create: createCustomer,
  update: editCustomer,
  delete: deleteCustomer,
  updateDefaultPaymentMethod: updateDefaultPaymentMethod,
});

// Invoice
const invoiceThunks = buildThunks("Invoice", {
  get: getInvoice,
  getUpcoming: getUpcomingInvoice,
  finalize: finalizeInvoice,
  pay: payInvoice,
  void: voidInvoice,
  searchByCustomer: listAllInvoicesByCustomer,
  searchBySubscription: listAllInvoicesBySubscription,
});

const invoiceLineItemThunks = buildThunks("InvoiceLineItem", {
  retrieveLineItems: retrieveLineItems,
  retrieveUpcomingLineItems: retrieveUpcomingLineItems,
});

// PaymentIntent
const paymentIntentThunks = buildThunks("PaymentIntent", {
  get: getPaymentIntent,
  create: createPaymentIntent,
  update: editPaymentIntent,
  delete: cancelPaymentIntent,
  searchByCustomer: searchPaymentIntentByCustomer,
  capture: capturePaymentIntent,
});

// TODO: remove create & update
// PaymentMethod
const paymentMethodThunks = buildThunks("PaymentMethod", {
  get: getPaymentMethod,
  searchByCustomer: searchPaymentMethodByCustomer,
  delete: cancelPaymentMethod,
  attach: attachPaymentMethod,
  detach: detachPaymentMethod,
});

// Price
const priceThunks = buildThunks("Price", {
  listAll: listAllPrices,
  get: getPrice,
});

//  Product
const productThunks = buildThunks("Product", {
  listAll: listAllProducts,
  get: getProduct,
});

// SetupIntent
const setupIntentThunks = buildThunks("SetupIntent", {
  get: getSetupIntent,
  create: createSetupIntent,
  update: editSetupIntent,
  delete: cancelSetupIntent,
  confirm: confirmSetupIntent,
});
// Subscription
const subscriptionThunks = buildThunks("Subscription", {
  get: getSubscription,
  create: createSubscription,
  update: editSubscription,
  delete: cancelSubscription,
});

// SubscriptionItem
const subscriptionItemThunks = buildThunks("SubscriptionItem", {
  searchBySubscription: listSubscriptionItems,
  get: getSubscriptionItem,
  create: createSubscriptionItem,
  update: updateSubscriptionItem,
  delete: deleteSubscriptionItem,
});

// Slice
const paymentsSlice = createSlice({
  name: "payments",
  initialState: {
    entities: {
      customer: customerAdapter.getInitialState({}),
      invoices: invoiceAdapter.getInitialState({}),
      invoiceLineItems: invoiceLineItemAdapter.getInitialState({}),
      paymentIntents: paymentIntentAdapter.getInitialState({}),
      paymentMethods: paymentMethodAdapter.getInitialState({}),
      prices: priceAdapter.getInitialState({}),
      products: productAdapter.getInitialState({}),
      setupIntents: setupIntentAdapter.getInitialState({}),
      subscriptions: subscriptionAdapter.getInitialState({}),
      subscriptionItems: subscriptionItemAdapter.getInitialState({}),
    },
    subscriptionId: "",
    customerId: "",
    loading: false,
    successMessage: "",
    error: null,
    enrollmentFlag: false,
    showPaymentMethodModal: false,
    showSuccessModal: false,
    showPaymentMethodDetails: false,
    customerFormState: {
      name: "",
      email: "",
      phone: "",
      address: {
        line1: "",
        line2: "",
        city: "",
        postalCode: "",
        country: "",
      },
      defaultPaymentMethod: "",
      description: "",
      metadata: {},
    },
    subscriptionFormState: {
      customerId: "",
      items: [],
      defaultPaymentMethod: "",
    },
    paymentMethodFormState: {
      paymentMethodId: "",
    },
    subscriptionItemFormState: {
      productId: "",
      priceId: "",
      subscriptionItemId: "",
      currentPriceId: "",
    },
  },
  reducers: {
    setBillingEnrollment(state, action) {
      state.enrollmentFlag = action.payload;
    },
    updateCustomerFormState(state, action) {
      const { field, value } = action.payload;
      if (field.startsWith("address.")) {
        const addressField = field.split(".")[1];
        state.customerFormState.address[addressField] = value;
      } else {
        state.customerFormState[field] = value;
      }
    },
    resetCustomerFormState(state) {
      state.customerFormState = {
        name: "",
        email: "",
        phone: "",
        address: {
          line1: "",
          line2: "",
          city: "",
          postalCode: "",
          country: "",
        },
        defaultPaymentMethod: "",
        description: "",
        metadata: {},
      };
    },
    updateSubscriptionFormState(state, action) {
      const { field, value } = action.payload;
      if (field === "items") {
        state.subscriptionFormState[field] = [...value];
      } else {
        state.subscriptionFormState[field] = value;
      }
    },
    updateSubscriptionItemFormState(state, action) {
      const { field, value } = action.payload;
      state.subscriptionItemFormState[field] = value;
    },
    resetSubscriptionItemFormState(state) {
      state.subscriptionItemFormState = {
        productId: "",
        priceId: "",
        subscriptionItemId: "",
        currentPriceId: "",
      };
    },
    resetSubscriptionFormState(state) {
      state.subscriptionFormState = {
        customerId: "",
        items: [],
        defaultPaymentMethod: "",
      };
    },
    updatePaymentMethodFormState(state, action) {
      const { field, value } = action.payload;
      state.paymentMethodFormState[field] = value;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setShowPaymentMethodModal(state, action) {
      state.showPaymentMethodModal = action.payload;
    },
    setShowPaymentMethodDetails(state, action) {
      state.showPaymentMethodDetails = action.payload;
    },
    setShowSuccessModal(state, action) {
      state.showSuccessModal = action.payload;
    },
    setSuccessMessage(state, action) {
      state.successMessage = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    buildReducers(builder, customerThunks, customerAdapter, "customer");
    buildReducers(builder, invoiceThunks, invoiceAdapter, "invoices");
    buildReducers(
      builder,
      invoiceLineItemThunks,
      invoiceLineItemAdapter,
      "invoiceLineItems"
    );
    buildReducers(
      builder,
      paymentIntentThunks,
      paymentIntentAdapter,
      "paymentIntents"
    );
    buildReducers(
      builder,
      paymentMethodThunks,
      paymentMethodAdapter,
      "paymentMethods"
    );
    buildReducers(builder, priceThunks, priceAdapter, "prices");
    buildReducers(builder, productThunks, productAdapter, "products");
    buildReducers(
      builder,
      setupIntentThunks,
      setupIntentAdapter,
      "setupIntents"
    );
    buildReducers(
      builder,
      subscriptionThunks,
      subscriptionAdapter,
      "subscriptions"
    );
    buildReducers(
      builder,
      subscriptionItemThunks,
      subscriptionItemAdapter,
      "subscriptionItems"
    );
  },
});

export const {
  setBillingEnrollment,
  updateCustomerFormState,
  resetCustomerFormState,
  updateSubscriptionFormState,
  resetSubscriptionFormState,
  updateSubscriptionItemFormState,
  resetSubscriptionItemFormState,
  updatePaymentMethodFormState,
  setLoading,
  setShow,
  resetSuccessModal,
  setSuccessMessage,
  setError,
  setShowPaymentMethodModal,
  setShowPaymentMethodDetails,
  setShowSuccessModal,
} = paymentsSlice.actions;

export const {
  fetchOne: fetchOneCustomerThunk,
  createItem: createCustomerThunk,
  updateItem: updateCustomerThunk,
  updateDefaultPaymentMethod: updateDefaultPaymentMethodThunk,
  deleteItem: deleteCustomerThunk,
  fetchItemsByCustomer: searchCustomersBySysIdThunk,
} = customerThunks;

export const {
  fetchOne: fetchOneInvoiceThunk,
  fetchItemsByCustomer: fetchInvoicesByCustomerThunk,
  fetchItemsBySubscription: fetchInvoicesBySubscriptionThunk,
  finalizeItem: finalizeInvoiceThunk,
  payItem: payInvoiceThunk,
  voidItem: voidInvoiceThunk,
  markUncollectibleItem: markUncollectibleInvoiceThunk,
} = invoiceThunks;

export const {
  retrieveLineItems: retrieveInvoiceLineItemsThunk,
  retrieveUpcomingLineItems: retrieveUpcomingInvoiceLineItemsThunk,
} = invoiceLineItemThunks;

export const {
  fetchOne: fetchOnePaymentIntentThunk,
  createItem: createPaymentIntentThunk,
  updateItem: updatePaymentIntentThunk,
  deleteItem: deletePaymentIntentThunk,
  fetchItemsByCustomer: fetchPaymentIntentsByCustomerThunk,
  captureItem: capturePaymentIntentThunk,
} = paymentIntentThunks;

export const {
  fetchOne: fetchOnePaymentMethodThunk,
  fetchItemsByCustomer: fetchPaymentMethodsByCustomerThunk,
  attachItem: attachPaymentMethodThunk,
  detachItem: detachPaymentMethodThunk,
} = paymentMethodThunks;

export const {
  fetchAll: fetchAllPricesThunk,
  fetchOne: fetchOnePriceThunk,
} = priceThunks;

export const {
  fetchAll: fetchAllProductsThunk,
  fetchOne: fetchOneProductThunk,
} = productThunks;

export const {
  fetchOne: fetchOneSetupIntentThunk,
  createItem: createSetupIntentThunk,
  updateItem: updateSetupIntentThunk,
  deleteItem: deleteSetupIntentThunk,
  confirmItem: confirmSetupIntentThunk,
} = setupIntentThunks;

export const {
  fetchOne: fetchOneSubscriptionThunk,
  createItem: createSubscriptionThunk,
  updateItem: updateSubscriptionThunk,
  deleteItem: deleteSubscriptionThunk,
} = subscriptionThunks;

export const {
  fetchOne: fetchOneSubscriptionItemThunk,
  createItem: createSubscriptionItemThunk,
  updateItem: updateSubscriptionItemThunk,
  deleteItem: deleteSubscriptionItemThunk,
  fetchItemsBySubscription: fetchItemsBySubscriptionThunk,
} = subscriptionItemThunks;

export const selectProducts = createSelector(
  (state) => state.payments.entities["products"].entities,
  (entities) => Object.values(entities || {})
);

export const selectPaymentMethods = createSelector(
  (state) => state.payments.entities["paymentMethods"].entities,
  (entities) => Object.values(entities || {})
);

// Selector to fetch a customer by metadata.okta_id
export const selectCustomerBySysId = createSelector(
  [
    (state) => state.payments?.entities["customers"]?.entities || {}, // Ensure a fallback object
    (_, oktaId) => oktaId,
  ],
  (customers, oktaId) => {
    return (
      Object.values(customers).find(
        (customer) => customer.metadata?.okta_id === oktaId
      ) || null
    );
  }
);

export default paymentsSlice.reducer;
