import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Global } from '../helpers/Global';
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (page, { rejectWithValue }) => {
    try {
      const payload = { page };
      const base64Payload = btoa(JSON.stringify(payload));

      const response = await fetch(Global.url + 'services/list/all', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: base64Payload,
      });

      if (!response.ok) {
        throw new Error('Error en la respuesta de productos principales');
      }

      const base64Data = await response.text();
      const jsonString = atob(base64Data);
      const data = JSON.parse(jsonString);

      const mainProducts = data.data.content || [];
      const totalPages = data.data.totalPages || 1;

      const productsWithDerivatives = await Promise.all(
        mainProducts.map(async (product) => {
          try {
            const derivativePayload = { id: product.id };
            const base64DerivativePayload = btoa(JSON.stringify(derivativePayload));

            const derivativeResponse = await fetch(Global.url + 'services/inventory', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: base64DerivativePayload,
            });

            if (!derivativeResponse.ok) {
              console.warn(`Error fetching derivatives for product ${product.id}`);
              return product;
            }

            const derivativeBase64Data = await derivativeResponse.text();
            const derivativeJsonString = atob(derivativeBase64Data);
            const derivativeData = JSON.parse(derivativeJsonString);

            product.derivedProducts = derivativeData.data.inventories || [];
          } catch (error) {
            console.warn(`Error fetching derivatives for product ${product.id}:`, error);
          }

          return product;
        })
      );

      return { products: productsWithDerivatives, totalPages };
    } catch (error) {
        console.log("Error fetching products",error)
      return rejectWithValue('Error fetching products');
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    error: null,
    currentPage: 1,
    totalPages: 1,
    loading: false,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCurrentPage } = productSlice.actions;
export default productSlice.reducer;
