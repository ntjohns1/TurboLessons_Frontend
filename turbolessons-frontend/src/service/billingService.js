import api from "./axiosConfig";

// Customer

// route((GET("/api/customer")), handler::listAll)
export const listAllCustomers = async () => {
  try {
    const response = await api.get(`/customer`);
    return response.data;
  } catch (error) {
    console.console.error("Error fetching customers:", error);
    throw error;
  }
};
// route(GET("/api/customer/{id}"), handler::retrieve)
export const getCustomer = async (id) => {
  try {
    const response = await api.get(`/customer/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching customer:", error);
    throw error;
  }
};
// route(POST("/api/customer"), handler::create)
export const createCustomer = async (formState) => {
  try {
    const response = await api.post("/customer", formState);
    return response.data;
  } catch (error) {
    console.error("Error creating customer:", error);
    throw error;
  }
};
// route(PUT("/api/customer/{id}"), handler::update)
export const editCustomer = async (id, formState) => {
    try {
      const response = await api.put(`/customer/${id}`, formState);
      return response.data;
    } catch (error) {
      console.error("Error editing customer:", error);
      throw error;
    }
  };
// route(DELETE("/api/customer/{id}"), handler::delete);
export const deleteCustomer = async (id) => {
    try {
        const response = await api.delete(`/customer/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error editing customer:", error);
        throw error;
    }
    
}
// PaymentIntent

// route((GET("/api/paymentintent")), handler::listAll)
export const listAllPaymentIntents = async () => {
    try {
      const response = await api.get(`/paymentintent`);
      return response.data;
    } catch (error) {
      console.error("Error fetching payment intents:", error);
      throw error;
    }
  };
  
  // route(GET("/api/paymentintent/{id}"), handler::retrieve)
  export const getPaymentIntent = async (id) => {
    try {
      const response = await api.get(`/paymentintent/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching payment intent:", error);
      throw error;
    }
  };
  
  // route(GET("/api/paymentintent/customer/{id}"), handler::searchByCustomer)
  export const searchPaymentIntentByCustomer = async (customerId) => {
    try {
      const response = await api.get(`/paymentintent/customer/${customerId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching payment intent by customer:", error);
      throw error;
    }
  };
  
  // route(POST("/api/paymentintent"), handler::create)
  export const createPaymentIntent = async (formState) => {
    try {
      const response = await api.post("/paymentintent", formState);
      return response.data;
    } catch (error) {
      console.error("Error creating payment intent:", error);
      throw error;
    }
  };
  
  // route(PUT("/api/paymentintent/{id}"), handler::update)
  export const editPaymentIntent = async (id, formState) => {
    try {
      const response = await api.put(`/paymentintent/${id}`, formState);
      return response.data;
    } catch (error) {
      console.error("Error editing payment intent:", error);
      throw error;
    }
  };
  
  // route(PUT("/api/paymentintent/capture/{id}"), handler::capture)
  export const capturePaymentIntent = async (id) => {
    try {
      const response = await api.put(`/paymentintent/capture/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error capturing payment intent:", error);
      throw error;
    }
  };
  
  // route(DELETE("/api/paymentintent/{id}"), handler::cancel)
  export const cancelPaymentIntent = async (id) => {
    try {
      const response = await api.delete(`/paymentintent/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error canceling payment intent:", error);
      throw error;
    }
  };

// PaymentMethod

// route((GET("/api/paymentmethod")), handler::listAll)
export const listAllPaymentMethods = async () => {
    try {
      const response = await api.get(`/paymentmethod`);
      return response.data;
    } catch (error) {
      console.error("Error fetching payment methods:", error);
      throw error;
    }
  };
  
  // route(GET("/api/paymentmethod/{id}"), handler::retrieve)
  export const getPaymentMethod = async (id) => {
    try {
      const response = await api.get(`/paymentmethod/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching payment method:", error);
      throw error;
    }
  };
  
  // route(GET("/api/paymentmethod/customer/{id}"), handler::searchByCustomer)
  export const searchPaymentMethodByCustomer = async (customerId) => {
    try {
      const response = await api.get(`/paymentmethod/customer/${customerId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching payment method by customer:", error);
      throw error;
    }
  };
  
  // route(POST("/api/paymentmethod"), handler::create)
  export const createPaymentMethod = async (formState) => {
    try {
      const response = await api.post("/paymentmethod", formState);
      return response.data;
    } catch (error) {
      console.error("Error creating payment method:", error);
      throw error;
    }
  };
  
  // route(PUT("/api/paymentmethod/{id}"), handler::update)
  export const editPaymentMethod = async (id, formState) => {
    try {
      const response = await api.put(`/paymentmethod/${id}`, formState);
      return response.data;
    } catch (error) {
      console.error("Error editing payment method:", error);
      throw error;
    }
  };
  
  // route(DELETE("/api/paymentmethod/{id}"), handler::cancel)
  export const cancelPaymentMethod = async (id) => {
    try {
      const response = await api.delete(`/paymentmethod/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error canceling payment method:", error);
      throw error;
    }
  };

// Price

// route(GET("/api/price"), handler::listAll)
export const listAllPrices = async () => {
    try {
      const response = await api.get(`/price`);
      return response.data;
    } catch (error) {
      console.error("Error fetching prices:", error);
      throw error;
    }
  };
  
  // route(GET("/api/price/{id}"), handler::retrieve)
  export const getPrice = async (id) => {
    try {
      const response = await api.get(`/price/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching price:", error);
      throw error;
    }
  };
  
  // route(POST("/api/price"), handler::create)
  export const createPrice = async (formState) => {
    try {
      const response = await api.post("/price", formState);
      return response.data;
    } catch (error) {
      console.error("Error creating price:", error);
      throw error;
    }
  };
  
  // route(PUT("/api/price/{id}"), handler::update)
  export const editPrice = async (id, formState) => {
    try {
      const response = await api.put(`/price/${id}`, formState);
      return response.data;
    } catch (error) {
      console.error("Error editing price:", error);
      throw error;
    }
  };

// Product

// Product

// route((GET("/api/product")),handler::listAll)
export const listAllProducts = async () => {
    try {
      const response = await api.get(`/product`);
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  };
  
  // route(GET("/api/product/{id}"),handler::retrieve)
  export const getProduct = async (id) => {
    try {
      const response = await api.get(`/product/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching product:", error);
      throw error;
    }
  };
  
  // route(POST("/api/product"),handler::create)
  export const createProduct = async (formState) => {
    try {
      const response = await api.post("/product", formState);
      return response.data;
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  };
  
  // route(PUT("/api/product/{id}"),handler::update)
  export const editProduct = async (id, formState) => {
    try {
      const response = await api.put(`/product/${id}`, formState);
      return response.data;
    } catch (error) {
      console.error("Error editing product:", error);
      throw error;
    }
  };
  
  // route(DELETE("/api/product/{id}"),handler::delete)
  export const deleteProduct = async (id) => {
    try {
      const response = await api.delete(`/product/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  };

// SetupIntent

// route((GET("/api/setupintent")),handler::listAll)
export const listAllSetupIntents = async () => {
    try {
      const response = await api.get(`/setupintent`);
      return response.data;
    } catch (error) {
      console.error("Error fetching setup intents:", error);
      throw error;
    }
  };
  
  // route(GET("/api/setupintent/{id}"),handler::retrieve)
  export const getSetupIntent = async (id) => {
    try {
      const response = await api.get(`/setupintent/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching setup intent:", error);
      throw error;
    }
  };
  
  // route(POST("/api/setupintent"),handler::create)
  export const createSetupIntent = async (formState) => {
    try {
      const response = await api.post("/setupintent", formState);
      return response.data;
    } catch (error) {
      console.error("Error creating setup intent:", error);
      throw error;
    }
  };
  
  // route(PUT("/api/setupintent/confirm/{id}"),handler::confirm)
  export const confirmSetupIntent = async (id) => {
    try {
      const response = await api.put(`/setupintent/confirm/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error confirming setup intent:", error);
      throw error;
    }
  };
  
  // route(PUT("/api/setupintent/{id}"),handler::update)
  export const editSetupIntent = async (id, formState) => {
    try {
      const response = await api.put(`/setupintent/${id}`, formState);
      return response.data;
    } catch (error) {
      console.error("Error editing setup intent:", error);
      throw error;
    }
  };
  
  // route(DELETE("/api/setupintent/{id}"),handler::cancel)
  export const cancelSetupIntent = async (id) => {
    try {
      const response = await api.delete(`/setupintent/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error canceling setup intent:", error);
      throw error;
    }
  };

// Subscription

// route((GET("/api/subscription")), handler::listAll)
export const listAllSubscriptions = async () => {
    try {
      const response = await api.get(`/subscription`);
      return response.data;
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
      throw error;
    }
  };
  
  // route(GET("/api/subscription/{id}"), handler::retrieve)
  export const getSubscription = async (id) => {
    try {
      const response = await api.get(`/subscription/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching subscription:", error);
      throw error;
    }
  };
  
  // route(POST("/api/subscription/{priceId}"), handler::create)
  export const createSubscription = async (priceId, formState) => {
    try {
      const response = await api.post(`/subscription/${priceId}`, formState);
      return response.data;
    } catch (error) {
      console.error("Error creating subscription:", error);
      throw error;
    }
  };
  
  // route(PUT("/api/subscription/{id}"), handler::update)
  export const editSubscription = async (id, formState) => {
    try {
      const response = await api.put(`/subscription/${id}`, formState);
      return response.data;
    } catch (error) {
      console.error("Error editing subscription:", error);
      throw error;
    }
  };
  
  // route(DELETE("/api/subscription/{id}"), handler::cancel)
  export const cancelSubscription = async (id) => {
    try {
      const response = await api.delete(`/subscription/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error canceling subscription:", error);
      throw error;
    }
  };