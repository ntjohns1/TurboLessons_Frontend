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
// route(GET("/api/paymentintent/{id}"), handler::retrieve)
// route(GET("/api/paymentintent/customer/{id}"), handler::searchByCustomer)
// route(POST("/api/paymentintent"), handler::create)
// route(PUT("/api/paymentintent/{id}"), handler::update)
// route(PUT("/api/paymentintent/capture/{id}"), handler::capture)
// route(DELETE("/api/paymentintent/{id}"), handler::cancel);

// PaymentMethod

// route((GET("/api/paymentintent")), handler::listAll)
// route(GET("/api/paymentintent/{id}"), handler::retrieve)
// route(GET("/api/paymentintent/customer/{id}"), handler::searchByCustomer)
// route(POST("/api/paymentintent"), handler::create)
// route(PUT("/api/paymentintent/{id}"), handler::update)
// route(PUT("/api/paymentintent/capture/{id}"), handler::capture)
// route(DELETE("/api/paymentintent/{id}"), handler::cancel);

// Price

// route(GET("/api/price"), handler::listAll)
// route(GET("/api/price/{id}"), handler::retrieve)
// route(POST("/api/price"), handler::create)
// route(PUT("/api/price/{id}"), handler::update);

// Product

// route((GET("/api/product")),handler::listAll)
// route(GET("/api/product/{id}"),handler::retrieve)
// route(POST("/api/product"),handler::create)
// route(PUT("/api/product/{id}"),handler::update)
// route(DELETE("/api/product/{id}"),handler::delete);

// SetupIntent

// route((GET("/api/setupintent")),handler::listAll)
// route(GET("/api/setupintent/{id}"),handler::retrieve)
// route(POST("/api/setupintent"),handler::create)
// route(PUT("/api/setupintent/confirm/{id}"),handler::confirm)
// route(PUT("/api/setupintent/{id}"),handler::update)
// route(DELETE("/api/setupintent/{id}"),handler::cancel);

// Subscription

// route((GET("/api/subscription")), handler::listAll)
// route(GET("/api/subscription/{id}"), handler::retrieve)
// route(POST("/api/subscription/{priceId}"), handler::create)
// route(PUT("/api/subscription/{id}"), handler::update)
// route(DELETE("/api/subscription/{id}"), handler::cancel);
