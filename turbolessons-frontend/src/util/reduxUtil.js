import { createAsyncThunk } from "@reduxjs/toolkit";

// Helper to generate CRUD thunks
export const buildThunks = (entityName, service) => {
  const thunks = {
    fetchAll: createAsyncThunk(
      `billing/fetchAll${entityName}sThunk`,
      async () => {
        const response = await service.listAll();
        return response;
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
  return thunks;
};

export const buildReducers = (builder, entityThunks, adapter) => {
  builder
    .addCase(entityThunks.fetchAll.pending, (state) => {
      state.loading = true;
    })
    .addCase(entityThunks.fetchAll.fulfilled, (state, action) => {
      state.loading = false;
      adapter.setAll(state, action.payload);
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
      adapter.addOne(state, action.payload);
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
        console.log("Payload received in fulfilled:", action.payload); // Debug the payload

        // if (Array.isArray(action.payload)) {
        //   adapter.setAll(state, action.payload);
        //   state.stripeCustomerId = action.payload[0]?.id || null; // Extract first customer ID
        //   state.stripeCustomerSubscription = action.payload[0]?.subscriptions[0] || null;
        // }
        // else
        if (action.payload) {
          adapter.setAll(state, [action.payload]);
          state.stripeCustomerId = action.payload.id || null;
          state.stripeCustomerSubscription =
            action.payload.subscriptions[0] || null;
        } else {
          state.stripeCustomerId = null;
          state.stripeCustomerSubscription = null;
        }
      })
      .addCase(entityThunks.fetchItemsByCustomer.rejected, (state) => {
        state.loading = false;
      });
  }
};
