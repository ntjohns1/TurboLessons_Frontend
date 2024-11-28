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
const paymentMethodAdapter = createEntityAdapter();
const priceAdapter = createEntityAdapter();
const productAdapter = createEntityAdapter();
const setupIntentAdapter = createEntityAdapter();
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

// PaymentMethod
const paymentMethodThunks = buildThunks("PaymentMethod", {
  listAll: listAllPaymentMethods,
  get: getPaymentMethod,
  searchByCustomer: searchPaymentMethodByCustomer,
  create: createPaymentMethod,
  update: editPaymentMethod,
  delete: cancelPaymentMethod,
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
    ...customerAdapter.getInitialState({ loading: false, error: null }),
    ...paymentIntentAdapter.getInitialState({ loading: false, error: null }),
    ...paymentMethodAdapter.getInitialState({ loading: false, error: null }),
    ...priceAdapter.getInitialState({ loading: false, error: null }),
    ...productAdapter.getInitialState({ loading: false, error: null }),
    ...setupIntentAdapter.getInitialState({ loading: false, error: null }),
    ...subscriptionAdapter.getInitialState({ loading: false, error: null }),
    enrollmentFlag: false,
  },
  reducers: {
    setBillingEnrollment(state, action) {
      state.enrollmentFlag = action.payload;
    },
  },
  extraReducers: (builder) => {
    buildReducers(builder, customerThunks, customerAdapter);
    buildReducers(builder, paymentIntentThunks, paymentIntentAdapter);
    buildReducers(builder, paymentMethodThunks, paymentMethodAdapter);
    buildReducers(builder, priceThunks, priceAdapter);
    buildReducers(builder, productThunks, productAdapter);
    buildReducers(builder, setupIntentThunks, setupIntentAdapter);
    buildReducers(builder, subscriptionThunks, subscriptionAdapter);
  },
});

export const { setBillingEnrollment } = billingSlice.actions;

export const {
  fetchAll: fetchAllCustomersThunk,
  fetchOne: fetchOneCustomerThunk,
  createItem: createCustomerThunk,
  updateItem: updateCustomerThunk,
  deleteItem: deleteCustomerThunk,
  fetchItemsByCustomer: fetchCustomersByCustomerThunk,
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
