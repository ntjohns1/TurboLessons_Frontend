import { createAsyncThunk } from "@reduxjs/toolkit";

// Helper to generate CRUD thunks
export const createCrudThunks = (entityName, service) => ({
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