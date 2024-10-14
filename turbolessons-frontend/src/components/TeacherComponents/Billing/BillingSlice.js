import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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

// Thunks

export const createThunks = (entityName, service) => ({
  fetchAll: createAsyncThunk(`${entityName}/fetchAll`, async () => {
    const response = await service.listAll();
    return response;
  }),

  fetchOne: createAsyncThunk(`${entityName}/fetchOne`, async (id) => {
    const response = await service.get(id);
    return response;
  }),

  createItem: createAsyncThunk(`${entityName}/create`, async (data) => {
    const response = await service.create(data);
    return response;
  }),

  updateItem: createAsyncThunk(`${entityName}/update`, async ({ id, data }) => {
    const response = await service.update(id, data);
    return response;
  }),

  deleteItem: createAsyncThunk(`${entityName}/delete`, async (id) => {
    const response = await service.delete(id);
    return response;
  }),
});


export const fetchAllCustomers = createAsyncThunk(
  "billing/fetchAllCustomers",
  async () => {
    const response = await listAllCustomers();
    return response;
  }
);

export const fetchCustomer = createAsyncThunk(
  "billing/fetchCustomer",
  async ({ id }) => {
    const response = await getCustomer(id);
    return response;
  }
);

export const createNewCustomer = createAsyncThunk(
  "billing/createCustomer",
  async (customerData) => {
    const response = await createCustomer(customerData);
    return response;
  }
);

export const updateCustomer = createAsyncThunk(
  "billing/editCustomer",
  async ({ id, formState }) => {
    const response = editCustomer(id, formState);
    return response;
  }
);

export const removeCustomer = createAsyncThunk(
  "students/removeCustomer",
  async (id) => {
    const response = await deleteCustomer(id);
    return response;
  }
);

export const fetchAllPaymentIntents = createAsyncThunk(
  "billing/fetchAllPaymentIntents",
  async () => {
    const response = await listAllPaymentIntents();
    return response;
  }
);

export const fetchPaymentIntent = createAsyncThunk(
  "billing/fetchPaymentIntent",
  async ({ id }) => {
    const response = await getPaymentIntent(id);
    return response;
  }
);

export const fetchPaymentIntentByCustomer = createAsyncThunk(
  "billing/fetchPaymentIntentByCustomer",
  async ({ customerId }) => {
    const response = await searchPaymentIntentByCustomer(customerId);
    return response;
  }
);

export const createNewPaymentIntent = createAsyncThunk(
  "billing/createPaymentIntent",
  async (paymentIntentData) => {
    const response = await createPaymentIntent(paymentIntentData);
    return response;
  }
);

export const updatePaymentIntent = createAsyncThunk(
  "billing/editPaymentIntent",
  async ({ id, formState }) => {
    const response = editPaymentIntent(id, formState);
    return response;
  }
);

export const capturePaymentIntent = createAsyncThunk(
  "billing/capturePaymentIntent",
  async ({ id }) => {
    const response = capturePaymentIntent(id);
    return response;
  }
);

export const deletePaymentIntent = createAsyncThunk(
  "billing/deletePaymentIntent",
  async ({ id }) => {
    const response = cancelPaymentIntent(id);
    return response;
  }
);

export const fetchAllPaymentMethods = createAsyncThunk(
  "billing/fetchAllPaymentMethods",
  async () => {
    const response = listAllPaymentMethods();
    return response;
  }
);

export const fetchOnePaymentMethod = createAsyncThunk(
  "billing/fetchOnePaymentMethod",
  async ({ id }) => {
    const response = getPaymentMethod(id);
    return response;
  }
);

export const fetchPaymentMethodsByCustomer = createAsyncThunk(
  "billing/fetchPaymentMethodsByCustomer",
  async ({ customerId }) => {
    const response = searchPaymentMethodByCustomer(customerId);
    return response;
  }
);

export const createNewPaymentMethod = createAsyncThunk(
  "billing/createNewPaymentMethod",
  async (formstate) => {
    const response = await createPaymentMethod(formstate);
    return response;
  }
);

export const updatePaymentMethod = createAsyncThunk(
  "billing/editPaymentMethod",
  async ({ id, formstate }) => {
    const response = editPaymentMethod(id, formstate);
    return response;
  }
);

export const deletePaymentMethod = createAsyncThunk(
  "billing/deletePaymentMethod",
  async ({ id }) => {
    const response = cancelPaymentMethod(id);
    return response;
  }
);

export const fetchAllPrices = createAsyncThunk(
  "billing/fetchAllPrices",
  async () => {
    const response = await listAllPrices();
    return response;
  }
);

export const fetchPrice = createAsyncThunk(
  "billing/fetchPrice",
  async ({ id }) => {
    const response = await getPrice(id);
    return response;
  }
);

export const createNewPrice = createAsyncThunk(
  "billing/createPrice",
  async (productData) => {
    const response = await createPrice(productData);
    return response;
  }
);

export const updatePrice = createAsyncThunk(
  "billing/editProduct",
  async ({ id, formState }) => {
    const response = editPrice(id, formState);
    return response;
  }
);

export const fetchAllProducts = createAsyncThunk(
  "billing/fetchAllProducts",
  async () => {
    const response = await listAllProducts();
    return response;
  }
);

export const fetchProduct = createAsyncThunk(
  "billing/fetchProduct",
  async ({ id }) => {
    const response = await getProduct(id);
    return response;
  }
);

export const createNewProduct = createAsyncThunk(
  "billing/createProduct",
  async (productData) => {
    const response = await createProduct(productData);
    return response;
  }
);

export const updateProduct = createAsyncThunk(
  "billing/editProduct",
  async ({ id, formState }) => {
    const response = editProduct(id, formState);
    return response;
  }
);

export const removeProduct = createAsyncThunk(
  "students/deleteProduct",
  async (id) => {
    const response = await deleteProduct(id);
    return response;
  }
);

export const fetchAllSetupIntents = createAsyncThunk(
  "billing/fetchAllSetupIntents",
  async () => {
    const response = await listAllSetupIntents();
    return response;
  }
);

export const fetchSetupIntent = createAsyncThunk(
  "billing/fetchSetupIntent",
  async ({ id }) => {
    const response = await getSetupIntent(id);
    return response;
  }
);

export const createNewSetupIntent = createAsyncThunk(
  "billing/createSetupIntent",
  async (setupIntentData) => {
    const response = await createSetupIntent(setupIntentData);
    return response;
  }
);

export const confirmSetupIntent = createAsyncThunk(
  "billing/editSetupIntent",
  async ({ id }) => {
    const response = confirmSetupIntent(id);
    return response;
  }
);

export const updateSetupIntent = createAsyncThunk(
  "billing/editSetupIntent",
  async ({ id, formState }) => {
    const response = editSetupIntent(id, formState);
    return response;
  }
);

export const removeSetupIntent = createAsyncThunk(
  "students/deleteSetupIntent",
  async (id) => {
    const response = await cancelSetupIntent(id);
    return response;
  }
);

export const fetchAllSubscriptions = createAsyncThunk(
  "billing/fetchAllSubscriptions",
  async () => {
    const response = await listAllSubscriptions();
    return response;
  }
);

export const fetchSubscription = createAsyncThunk(
  "billing/fetchSubscription",
  async ({ id }) => {
    const response = await getSubscription(id);
    return response;
  }
);

export const createNewSubscription = createAsyncThunk(
  "billing/createSubscription",
  async (customerData) => {
    const response = await createSubscription(customerData);
    return response;
  }
);

export const updateSubscription = createAsyncThunk(
  "billing/editSubscription",
  async ({ id, formState }) => {
    const response = editSubscription(id, formState);
    return response;
  }
);

export const removeSubscription = createAsyncThunk(
  "students/removeSubscription",
  async (id) => {
    const response = await cancelSubscription(id);
    return response;
  }
);

// Slice
const billingSlice = createSlice({
  name: "billing",
  initialState: {
    customers: [],
    paymentIntents: [],
    paymentMethods: [],
    prices: [],
    products: [],
    setupIntents: [],
    subscriptions: [],
    selectedCustomer: null,
    selectedPaymentIntent: null,
    selectedPaymentMethod: null,
    selectedPrice: null,
    selectedProduct: null,
    selectedSetupIntent: null,
    selectedSubscription: null,
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedCustomer(state, action) {
      state.selected = action.payload;
    },
    setSelectedPaymentIntent(state, action) {
      state.selected = action.payload;
    },
    setSelectedPaymentMethod(state, action) {
      state.selectedPaymentMethod = action.payload;
    },
    setSelectedPrice(state, action) {
      state.selectedPrice = action.payload;
    },
    setSelectedProduct(state, action) {
      state.selectedProduct = action.payload;
    },
    setSelectedSetupIntent(state, action) {
      state.selectedSetupIntent = action.payload;
    },
    setSelectedSubscription(state, action) {
      state.selectedSubscription = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCustomers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllPaymentIntents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllPaymentMethods.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllPrices.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllSetupIntents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllSubscriptions.pending, (state) => {
        state.loading = true;
      })
      .addCase();
  },
});

export const {} = billingSlice.actions;

export default billingSlice.reducer;
