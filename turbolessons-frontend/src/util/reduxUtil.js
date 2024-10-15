import { createAsyncThunk } from "@reduxjs/toolkit";

// Helper to generate CRUD thunks
export const buildThunks = (entityName, service) => {
  const thunks = {
    fetchAll: createAsyncThunk(`billing/fetchAll${entityName}s`, async () => {
      const response = await service.listAll();
      return response;
    }),
    fetchOne: createAsyncThunk(`billing/fetchOne${entityName}`, async (id) => {
      const response = await service.get(id);
      return response;
    }),
    createItem: createAsyncThunk(
      `billing/create${entityName}`,
      async (data) => {
        const response = await service.create(data);
        return response;
      }
    ),
    updateItem: createAsyncThunk(
      `billing/update${entityName}`,
      async ({ id, data }) => {
        const response = await service.update(id, data);
        return response;
      }
    ),
  };
  if (service.delete) {
    thunks.deleteItem = createAsyncThunk(
      `billing/delete${entityName}`,
      async (id) => {
        const response = await service.delete(id);
        return response;
      }
    );
  }
  if (service.searchByCustomer) {
    thunks.fetchItemsByCustomer = createAsyncThunk(
      `billing/fetch${entityName}sByCustomer`,
      async ({ customerId }) => {
        const response = await service.searchByCustomer(customerId);
        return response;
      }
    );
  }
  if (service.capture) {
    thunks.captureItem = createAsyncThunk(
      `billing/capture${entityName}`,
      async ({ id }) => {
        const response = service.capture(id);
        return response;
      }
    );
  }
  if (service.confirm) {
    thunks.confirmItem = createAsyncThunk(
      `billing/confirm${entityName}`,
      async ({ id }) => {
        const response = service.confirm(id);
        return response;
      }
    );
  }
  return thunks;
};

export const buildReducers = (builder, entityThunks) => {
  builder
    .addCase(entityThunks.fetchAll.pending, (state) => {
      state.loading = true;
    })
    .addCase(entityThunks.fetchAll.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload;
    })
    .addCase(entityThunks.fetchAll.rejected, (state) => {
      state.loading = false;
    })

    .addCase(entityThunks.fetchOne.pending, (state) => {
      state.loading = true;
    })
    .addCase(entityThunks.fetchOne.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedItem = action.payload;
    })
    .addCase(entityThunks.fetchOne.rejected, (state) => {
      state.loading = false;
    })

    .addCase(entityThunks.createItem.fulfilled, (state, action) => {
      state.items.push(action.payload);
    })
    .addCase(entityThunks.updateItem.fulfilled, (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    })
    .addCase(entityThunks.deleteItem.fulfilled, (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    });
};
