import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { buildThunks, buildReducers } from "../../../util/reduxUtil";

import {
  getCustomer,
  listAllCustomers,
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
  capture: cancelPaymentIntent,
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
  },
    reducers: {},
  extraReducers: (builder) => {
    buildReducers(builder, customerThunks);
    buildReducers(builder, paymentIntentThunks);
    buildReducers(builder, paymentMethodThunks);
    buildReducers(builder, priceThunks);
    buildReducers(builder, productThunks);
    buildReducers(builder, setupIntentThunks);
    buildReducers(builder, subscriptionThunks);
  },
});

export const {} = billingSlice.actions;

export const {
  fetchAll: fetchAllCustomers,
  fetchOne: fetchOneCustomer,
  createItem: createCustomer,
  updateItem: updateCustomer,
  deleteItem: deleteCustomer,
} = customerThunks;

export const {
  fetchAll: fetchAllPaymentIntents,
  fetchOne: fetchOnePaymentIntent,
  createItem: createPaymentIntent,
  updateItem: updatePaymentIntent,
  deleteItem: deletePaymentIntent,
  fetchItemByCustomer: fetchPaymentIntentsByCustomer,
  captureItem: capturePaymentIntent,
} = paymentIntentThunks;

export const {
  fetchAll: fetchAllPaymentMethods,
  fetchOne: fetchOnePaymentMethod,
  createItem: createPaymentMethod,
  updateItem: updatePaymentMethod,
  deleteItem: deletePaymentMethod,
  fetchItemByCustomer: fetchPaymentMethodsByCustomer,
} = paymentMethodThunks;

export const {
  fetchAll: fetchAllPrices,
  fetchOne: fetchOnePrice,
  createItem: createPrice,
  updateItem: updatePrice,
} = priceThunks;

export const {
  fetchAll: fetchAllProducts,
  fetchOne: fetchOneProduct,
  createItem: createProduct,
  updateItem: updateProduct,
  deleteItem: deleteProduct,
} = productThunks;

export const {
  fetchAll: fetchAllSetupIntents,
  fetchOne: fetchOneSetupIntent,
  createItem: createSetupIntent,
  updateItem: updateSetupIntent,
  deleteItem: deleteSetupIntent,
  confirmItem: confirmSetupIntent,
} = setupIntentThunks;

export const {
  fetchAll: fetchAllSubscriptions,
  fetchOne: fetchOneSubscription,
  createItem: createSubscription,
  updateItem: updateSubscription,
  deleteItem: deleteSubscription,
} = subscriptionThunks;

export default billingSlice.reducer;
