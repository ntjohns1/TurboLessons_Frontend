// export const fetchAllCustomers = createAsyncThunk(
//   "billing/fetchAllCustomers",
//   async () => {
//     const response = await listAllCustomers();
//     return response;
//   }
// );

// export const fetchCustomer = createAsyncThunk(
//   "billing/fetchCustomer",
//   async ({ id }) => {
//     const response = await getCustomer(id);
//     return response;
//   }
// );

// export const createNewCustomer = createAsyncThunk(
//   "billing/createCustomer",
//   async (customerData) => {
//     const response = await createCustomer(customerData);
//     return response;
//   }
// );

// export const updateCustomer = createAsyncThunk(
//   "billing/editCustomer",
//   async ({ id, formState }) => {
//     const response = editCustomer(id, formState);
//     return response;
//   }
// );

// export const removeCustomer = createAsyncThunk(
//   "students/removeCustomer",
//   async (id) => {
//     const response = await deleteCustomer(id);
//     return response;
//   }
// );


// export const fetchAllPaymentMethods = createAsyncThunk(
//   "billing/fetchAllPaymentMethods",
//   async () => {
//     const response = listAllPaymentMethods();
//     return response;
//   }
// );

// export const fetchOnePaymentMethod = createAsyncThunk(
//   "billing/fetchOnePaymentMethod",
//   async ({ id }) => {
//     const response = getPaymentMethod(id);
//     return response;
//   }
// );


// export const createNewPaymentMethod = createAsyncThunk(
//   "billing/createNewPaymentMethod",
//   async (formstate) => {
//     const response = await createPaymentMethod(formstate);
//     return response;
//   }
// );

// export const updatePaymentMethod = createAsyncThunk(
//   "billing/editPaymentMethod",
//   async ({ id, formstate }) => {
//     const response = editPaymentMethod(id, formstate);
//     return response;
//   }
// );

// export const deletePaymentMethod = createAsyncThunk(
//   "billing/deletePaymentMethod",
//   async ({ id }) => {
//     const response = cancelPaymentMethod(id);
//     return response;
//   }
// );

// export const fetchAllProducts = createAsyncThunk(
//   "billing/fetchAllProducts",
//   async () => {
//     const response = await listAllProducts();
//     return response;
//   }
// );

// export const fetchProduct = createAsyncThunk(
//   "billing/fetchProduct",
//   async ({ id }) => {
//     const response = await getProduct(id);
//     return response;
//   }
// );

// export const createNewProduct = createAsyncThunk(
//   "billing/createProduct",
//   async (productData) => {
//     const response = await createProduct(productData);
//     return response;
//   }
// );

// export const updateProduct = createAsyncThunk(
//   "billing/editProduct",
//   async ({ id, formState }) => {
//     const response = editProduct(id, formState);
//     return response;
//   }
// );

// export const removeProduct = createAsyncThunk(
//   "students/deleteProduct",
//   async (id) => {
//     const response = await deleteProduct(id);
//     return response;
//   }
// );

// export const fetchAllSetupIntents = createAsyncThunk(
//     "billing/fetchAllSetupIntents",
//     async () => {
//       const response = await listAllSetupIntents();
//       return response;
//     }
//   );
  
//   export const fetchSetupIntent = createAsyncThunk(
//     "billing/fetchSetupIntent",
//     async ({ id }) => {
//       const response = await getSetupIntent(id);
//       return response;
//     }
//   );
//
  
//   export const createNewSetupIntent = createAsyncThunk(
//     "billing/createSetupIntent",
//     async (setupIntentData) => {
//       const response = await createSetupIntent(setupIntentData);
//       return response;
//     }
//   );

// export const updateSetupIntent = createAsyncThunk(
//     "billing/editSetupIntent",
//     async ({ id, formState }) => {
//       const response = editSetupIntent(id, formState);
//       return response;
//     }
//   );

// export const confirmSetupIntent = createAsyncThunk(
//     "billing/confirmSetupIntent",
//     async ({ id }) => {
//       const response = confirmSetupIntent(id);
//       return response;
//     }
//   );