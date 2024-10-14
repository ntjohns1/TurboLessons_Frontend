export const createCrudReducers = (builder, entityThunks) => {
    builder
      .addCase(entityThunks.fetchAll.pending, (state) => { state.loading = true; })
      .addCase(entityThunks.fetchAll.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(entityThunks.fetchAll.rejected, (state) => { state.loading = false; })
  
      .addCase(entityThunks.fetchOne.pending, (state) => { state.loading = true; })
      .addCase(entityThunks.fetchOne.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedItem = action.payload;
      })
      .addCase(entityThunks.fetchOne.rejected, (state) => { state.loading = false; })
  
      .addCase(entityThunks.createItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(entityThunks.updateItem.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(entityThunks.deleteItem.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  };