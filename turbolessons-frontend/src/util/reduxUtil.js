import { createAsyncThunk } from "@reduxjs/toolkit";

// Helper to generate CRUD thunks
export const buildThunks = (entityName, service) => {
  const thunks = {
    fetchAll: createAsyncThunk(
      `billing/fetchAll${entityName}sThunk`,
      async () => {
        const response = await service.listAll();

        // Transform response to extract the `data` array
        const transformedData = response.data.map((item) => ({
          id: item.id,
          ...item,
        }));

        return transformedData;
      }
    ),
    fetchOne: createAsyncThunk(
      `billing/fetchOne${entityName}Thunk`,
      async (id) => {
        const response = await service.get(id);
        return response;
      }
    ),
    createItem: createAsyncThunk(
      `billing/create${entityName}Thunk`,
      async (data) => {
        const response = await service.create(data);
        console.log(
          `create${entityName}Thunk Response: ` +
            JSON.stringify(response, null, 2)
        );

        return response;
      }
    ),
    updateItem: createAsyncThunk(
      `billing/update${entityName}Thunk`,
      async ({ id, data }) => {
        const response = await service.update(id, data);
        return response;
      }
    ),
  };
  if (service.delete) {
    thunks.deleteItem = createAsyncThunk(
      `billing/delete${entityName}Thunk`,
      async (id) => {
        const response = await service.delete(id);
        return response;
      }
    );
  }
  if (service.searchByCustomer) {
    thunks.fetchItemsByCustomer = createAsyncThunk(
      `billing/search${entityName}sBySystemIdThunk`,
      async ({ customerId }) => {
        const response = await service.searchByCustomer(customerId);
        return response;
      }
    );
  }
  if (service.capture) {
    thunks.captureItem = createAsyncThunk(
      `billing/capture${entityName}Thunk`,
      async ({ id }) => {
        const response = service.capture(id);
        return response;
      }
    );
  }
  if (service.confirm) {
    thunks.confirmItem = createAsyncThunk(
      `billing/confirm${entityName}Thunk`,
      async ({ id }) => {
        const response = service.confirm(id);
        return response;
      }
    );
  }
  if (service.attach) {
    thunks.attachItem = createAsyncThunk(
      `billing/attach${entityName}Thunk`,
      async ({ id, customerId }) => {
        const response = service.attach(id, customerId);
        return response;
      }
    );
  }
  if (service.detach) {
    thunks.detachItem = createAsyncThunk(
      `billing/detach${entityName}Thunk`,
      async ({ id }) => {
        const response = service.detach(id);
        return response;
      }
    );
  }
  return thunks;
};

export const buildReducers = (builder, entityThunks, adapter, namespace) => {
  builder
    .addCase(entityThunks.fetchAll.pending, (state) => {
      state.loading = true;
    })
    .addCase(entityThunks.fetchAll.fulfilled, (state, action) => {
      if (!state.entities[namespace]) {
        state.entities[namespace] = adapter.getInitialState();
      }
      adapter.setAll(state.entities[namespace], action.payload);
      state.loading = false;
    })
    .addCase(entityThunks.fetchAll.rejected, (state) => {
      state.loading = false;
    })

    .addCase(entityThunks.fetchOne.pending, (state) => {
      state.loading = true;
    })
    .addCase(entityThunks.fetchOne.fulfilled, (state, action) => {
      state.loading = false;
      adapter.upsertOne(state, action.payload);
    })
    .addCase(entityThunks.fetchOne.rejected, (state) => {
      state.loading = false;
    })

    .addCase(entityThunks.createItem.fulfilled, (state, action) => {
      adapter.addOne(state.entities[namespace], action.payload);
      state.successMessage = `${namespace} created successfully.`;
    })
    .addCase(entityThunks.updateItem.fulfilled, (state, action) => {
      adapter.upsertOne(state, action.payload);
    });

  if (entityThunks.deleteItem) {
    builder.addCase(entityThunks.deleteItem.fulfilled, (state, action) => {
      adapter.removeOne(state, action.payload.id);
    });
  }
  if (entityThunks.fetchItemsByCustomer) {
    builder
      .addCase(entityThunks.fetchItemsByCustomer.pending, (state) => {
        state.loading = true; // Set loading to true
      })
      .addCase(entityThunks.fetchItemsByCustomer.fulfilled, (state, action) => {
        state.loading = false; // Set loading to false
        if (action.payload) {
          if (!state.entities[namespace]) {
            state.entities[namespace] = adapter.getInitialState();
          }
          // adapter.setAll(state, [action.payload]);
          if (namespace === "customers") {
            state.stripeCustomerId = action.payload.id || null;
            state.stripeCustomerSubscription =
              action.payload.subscriptions[0] || null;

            adapter.setAll(state.entities[namespace], [action.payload]);
          } else if (namespace === "paymentMethods") {
            state.stripeCustomerPaymentMethods = action.payload.data;
            adapter.setAll(state.entities[namespace], action.payload.data);
          } else {
            adapter.setAll(state.entities[namespace], [action.payload]);
          }
        } else {
          state.stripeCustomerId = null;
          state.stripeCustomerSubscription = null;
        }
      })
      .addCase(entityThunks.fetchItemsByCustomer.rejected, (state) => {
        state.loading = false;
      });
  }
  if (entityThunks.attachItem) {
    builder
      .addCase(entityThunks.attachItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(entityThunks.attachItem.fulfilled, (state, action) => {
        state.loading = false;

        const newPaymentMethod = action.payload;

        if (Array.isArray(state.stripeCustomerPaymentMethods)) {
          state.stripeCustomerPaymentMethods = [
            ...state.stripeCustomerPaymentMethods,
            newPaymentMethod,
          ];
        } else {
          state.stripeCustomerPaymentMethods = [newPaymentMethod];
        }
        state.successMessage = "";
      })
      .addCase(entityThunks.attachItem.rejected, (state) => {
        state.loading = false;
      });
  }
};
