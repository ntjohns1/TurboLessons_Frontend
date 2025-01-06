import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { buildThunks, buildReducers } from "../../../util/reduxUtil";

import {
  getCustomer,
  listAllCustomers,
  searchCustomerByOktaId,
  createCustomer,
  editCustomer,
  deleteCustomer,
  listAllPaymentIntents,
  getPaymentIntent,
  searchPaymentIntentByCustomer,
  createPaymentIntent,
  editPaymentIntent,
  capturePaymentIntent,
  cancelPaymentIntent,
  listAllPaymentMethods,
  getPaymentMethod,
  searchPaymentMethodByCustomer,
  createPaymentMethod,
  editPaymentMethod,
  cancelPaymentMethod,
  attachPaymentMethod,
  detachPaymentMethod,
  listAllPrices,
  getPrice,
  createPrice,
  editPrice,
  listAllProducts,
  getProduct,
  createProduct,
  editProduct,
  deleteProduct,
  listAllSetupIntents,
  getSetupIntent,
  createSetupIntent,
  confirmSetupIntent,
  editSetupIntent,
  cancelSetupIntent,
  listAllSubscriptions,
  getSubscription,
  createSubscription,
  editSubscription,
  cancelSubscription,
} from "../../../service/billingService";

// Entity Adapters
const customerAdapter = createEntityAdapter();
const paymentIntentAdapter = createEntityAdapter();
const paymentMethodAdapter = createEntityAdapter({
  selectId: (paymentMethod) => {
    console.log("Resolving ID for:", paymentMethod.id);
    return paymentMethod.id;
  },
});
const priceAdapter = createEntityAdapter({
  selectId: (price) => {
    console.log("Resolving ID for:", price);
    return price.id;
  },
});
const productAdapter = createEntityAdapter();
const setupIntentAdapter = createEntityAdapter({
  selectId: (setupIntent) => {
    console.log("Resolving ID for:", setupIntent);
    return setupIntent.id;
  },
});
const subscriptionAdapter = createEntityAdapter();

// Thunks

//  Customer
const customerThunks = buildThunks("Customer", {
  listAll: listAllCustomers,
  get: getCustomer,
  searchByCustomer: searchCustomerByOktaId,
  create: createCustomer,
  update: editCustomer,
  delete: deleteCustomer,
});

// PaymentIntent
const paymentIntentThunks = buildThunks("PaymentIntent", {
  listAll: listAllPaymentIntents,
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
  listAll: listAllPaymentMethods,
  get: getPaymentMethod,
  searchByCustomer: searchPaymentMethodByCustomer,
  create: createPaymentMethod,
  update: editPaymentMethod,
  delete: cancelPaymentMethod,
  attach: attachPaymentMethod,
  detach: detachPaymentMethod,
});

// Price
const priceThunks = buildThunks("Price", {
  listAll: listAllPrices,
  get: getPrice,
  create: createPrice,
  update: editPrice,
});

//  Product
const productThunks = buildThunks("Product", {
  listAll: listAllProducts,
  get: getProduct,
  create: createProduct,
  update: editProduct,
  delete: deleteProduct,
});

// SetupIntent
const setupIntentThunks = buildThunks("SetupIntent", {
  listAll: listAllSetupIntents,
  get: getSetupIntent,
  create: createSetupIntent,
  update: editSetupIntent,
  delete: cancelSetupIntent,
  confirm: confirmSetupIntent,
});
// Subscription
const subscriptionThunks = buildThunks("Subscription", {
  listAll: listAllSubscriptions,
  get: getSubscription,
  create: createSubscription,
  update: editSubscription,
  delete: cancelSubscription,
});

// Slice
const billingSlice = createSlice({
  name: "billing",
  initialState: {
    entities: {
      customers: customerAdapter.getInitialState({}),
      paymentIntents: paymentIntentAdapter.getInitialState({}),
      paymentMethods: paymentMethodAdapter.getInitialState({}),
      prices: priceAdapter.getInitialState({}),
      products: productAdapter.getInitialState({}),
      setupIntents: setupIntentAdapter.getInitialState({}),
      subscriptions: subscriptionAdapter.getInitialState({}),
    },
    loading: false,
    successMessage: "",
    error: null,
    enrollmentFlag: false,
    show: false,
    stripeCustomerId: "",
    stripeCustomerSubscription: "",
    stripeCustomerPaymentMethods: [],
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
  },
  reducers: {
    setBillingEnrollment(state, action) {
      state.enrollmentFlag = action.payload;
    },
    resetCustomer(state) {
      state.stripeCustomerId = "";
      state.stripeCustomerSubscription = "";
      state.stripeCustomerPaymentMethods = [];
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
    resetSubscriptionFormState(state) {
      state.subscriptionFormState = {
        customerId: "",
        items: [],
        defaultPaymentMethod: "",
      };
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setShow(state, action) {
      state.show = action.payload;
    },
    setSuccessMessage(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    buildReducers(builder, customerThunks, customerAdapter, "customers");
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
  },
});

export const {
  setBillingEnrollment,
  resetCustomer,
  updateCustomerFormState,
  resetCustomerFormState,
  updateSubscriptionFormState,
  resetSubscriptionFormState,
  setLoading,
  setShow,
  setSuccessMessage,
  setError,
} = billingSlice.actions;

export const {
  fetchAll: fetchAllCustomersThunk,
  fetchOne: fetchOneCustomerThunk,
  createItem: createCustomerThunk,
  updateItem: updateCustomerThunk,
  deleteItem: deleteCustomerThunk,
  fetchItemsByCustomer: searchCustomersBySysIdThunk,
} = customerThunks;

export const {
  fetchAll: fetchAllPaymentIntentsThunk,
  fetchOne: fetchOnePaymentIntentThunk,
  createItem: createPaymentIntentThunk,
  updateItem: updatePaymentIntentThunk,
  deleteItem: deletePaymentIntentThunk,
  fetchItemsByCustomer: fetchPaymentIntentsByCustomerThunk,
  captureItem: capturePaymentIntentThunk,
} = paymentIntentThunks;

export const {
  fetchAll: fetchAllPaymentMethodsThunk,
  fetchOne: fetchOnePaymentMethodThunk,
  createItem: createPaymentMethodThunk,
  updateItem: updatePaymentMethodThunk,
  deleteItem: deletePaymentMethodThunk,
  fetchItemsByCustomer: fetchPaymentMethodsByCustomerThunk,
  attachItem: attachPaymentMethodThunk,
  detachItem: detachPaymentMethodThunk,
} = paymentMethodThunks;

export const {
  fetchAll: fetchAllPricesThunk,
  fetchOne: fetchOnePriceThunk,
  createItem: createPriceThunk,
  updateItem: updatePriceThunk,
} = priceThunks;

export const {
  fetchAll: fetchAllProductsThunk,
  fetchOne: fetchOneProductThunk,
  createItem: createProductThunk,
  updateItem: updateProductThunk,
  deleteItem: deleteProductThunk,
} = productThunks;

export const {
  fetchAll: fetchAllSetupIntentsThunk,
  fetchOne: fetchOneSetupIntentThunk,
  createItem: createSetupIntentThunk,
  updateItem: updateSetupIntentThunk,
  deleteItem: deleteSetupIntentThunk,
  confirmItem: confirmSetupIntentThunk,
} = setupIntentThunks;

export const {
  fetchAll: fetchAllSubscriptionsThunk,
  fetchOne: fetchOneSubscriptionThunk,
  createItem: createSubscriptionThunk,
  updateItem: updateSubscriptionThunk,
  deleteItem: deleteSubscriptionThunk,
} = subscriptionThunks;

export default billingSlice.reducer;
