import api from "./axiosConfig";

const apiCall = async (method, uri, params = {}, errorMessage) => {
  try {
    let response;
    switch (method) {
      case "GET":
        response = await api.get(uri);
        break;
      case "POST":
        response = await api.post(uri, params);
        break;
      case "PUT":
        response = await api.put(uri, params);
        break;
      case "DELETE":
        response = await api.delete(uri);
        break;
      default:
        throw new Error("Unsupported method");
    }
    return response.data;
  } catch (error) {
    console.error(`${errorMessage}:`, error);
    throw error;
  }
};

// Customer

// route((GET("/api/customer")), handler::listAll)
export const listAllCustomers = async () => {
  return apiCall("GET", `/customer`, {}, "Error fetching customers:");
};
// route(GET("/api/customer/{id}"), handler::retrieve)
export const getCustomer = async (id) => {
  return apiCall("GET", `/customer/${id}`, {}, "Error fetching customer:");
};
// route(POST("/api/customer"), handler::create)
export const createCustomer = async (formState) => {
  return apiCall(
    "POST",
    "/customer",
    { formState },
    "Error creating customer:"
  );
};
// route(PUT("/api/customer/{id}"), handler::update)
export const editCustomer = async (id, formState) => {
  return apiCall(
    "PUT",
    `/customer/${id}`,
    { formState },
    '"Error editing customer:"'
  );
};
// route(DELETE("/api/customer/{id}"), handler::delete);
export const deleteCustomer = async (id) => {
  return apiCall("DELETE", `/customer/${id}`, {}, "Error deleting customer:");
};

// PaymentIntent

// route((GET("/api/paymentintent")), handler::listAll)
export const listAllPaymentIntents = async () => {
  return apiCall(
    "GET",
    "/paymentintent",
    {},
    "Error fetching payment intents:"
  );
};

// route(GET("/api/paymentintent/{id}"), handler::retrieve)
export const getPaymentIntent = async (id) => {
  return apiCall(
    "GET",
    `/paymentintent/${id}`,
    {},
    "Error fetching payment intent:"
  );
};

// route(GET("/api/paymentintent/customer/{id}"), handler::searchByCustomer)
export const searchPaymentIntentByCustomer = async (customerId) => {
  return apiCall(
    "GET",
    `/paymentintent/customer/${customerId}`,
    {},
    "Error fetching payment intent by customer:"
  );
};

// route(POST("/api/paymentintent"), handler::create)
export const createPaymentIntent = async (formState) => {
  return apiCall(
    "POST",
    "/paymentintent",
    { formState },
    "Error creating payment intent:"
  );
};

// route(PUT("/api/paymentintent/{id}"), handler::update)
export const editPaymentIntent = async (id, formState) => {
  return apiCall(
    "PUT",
    `/paymentintent/${id}`,
    { formState },
    "Error editing payment intent:"
  );
};

// route(PUT("/api/paymentintent/capture/{id}"), handler::capture)
export const capturePaymentIntent = async (id) => {
  return apiCall(
    "PUT",
    `/paymentintent/capture/${id}`,
    {},
    "Error capturing payment intent:"
  );
};

// route(DELETE("/api/paymentintent/{id}"), handler::cancel)
export const cancelPaymentIntent = async (id) => {
  return apiCall(
    "DELETE",
    `/paymentintent/${id}`,
    {},
    "Error canceling payment intent:"
  );
};

// PaymentMethod

// route((GET("/api/paymentmethod")), handler::listAll)
export const listAllPaymentMethods = async () => {
  return apiCall(
    "GET",
    "/paymentmethod",
    {},
    "Error fetching payment methods:"
  );
};

// route(GET("/api/paymentmethod/{id}"), handler::retrieve)
export const getPaymentMethod = async (id) => {
  return apiCall(
    "GET",
    `/paymentmethod/${id}`,
    {},
    "Error fetching payment method:"
  );
};

// route(GET("/api/paymentmethod/customer/{id}"), handler::searchByCustomer)
export const searchPaymentMethodByCustomer = async (customerId) => {
  return apiCall(
    "GET",
    `/paymentmethod/customer/${customerId}`,
    {},
    "Error fetching payment method by customer:"
  );
};

// route(POST("/api/paymentmethod"), handler::create)
export const createPaymentMethod = async (formState) => {
  return apiCall(
    "POST",
    "/paymentmethod",
    { formState },
    "Error creating payment method:"
  );
};

// route(PUT("/api/paymentmethod/{id}"), handler::update)
export const editPaymentMethod = async (id, formState) => {
  return apiCall(
    "PUT",
    `/paymentmethod/${id}`,
    { formState },
    "Error editing payment method:"
  );
};

// route(DELETE("/api/paymentmethod/{id}"), handler::cancel)
export const cancelPaymentMethod = async (id) => {
  return apiCall(
    "DELETE",
    `/paymentmethod/${id}`,
    {},
    "Error canceling payment method:"
  );
};

// Price

// route(GET("/api/price"), handler::listAll)
export const listAllPrices = async () => {
  return apiCall("GET", "/price", {}, "Error fetching prices:");
};

// route(GET("/api/price/{id}"), handler::retrieve)
export const getPrice = async (id) => {
  return apiCall("GET", `/price/${id}`, {}, "Error fetching price:");
};

// route(POST("/api/price"), handler::create)
export const createPrice = async (formState) => {
  return apiCall("POST", "/price", { formState }, "Error creating price:");
};

// route(PUT("/api/price/{id}"), handler::update)
export const editPrice = async (id, formState) => {
  return apiCall("PUT", `/price/${id}`, { formState }, "Error editing price:");
};

// Product

// route((GET("/api/product")),handler::listAll)
export const listAllProducts = async () => {
  return apiCall("GET", "/product", {}, "Error fetching products:");
};

// route(GET("/api/product/{id}"),handler::retrieve)
export const getProduct = async (id) => {
  return apiCall("GET", `/product/${id}`, {}, "Error fetching product:");
};

// route(POST("/api/product"),handler::create)
export const createProduct = async (formState) => {
  return apiCall("POST", "/product", { formState }, "Error creating product:");
};

// route(PUT("/api/product/{id}"),handler::update)
export const editProduct = async (id, formState) => {
  return apiCall(
    "PUT",
    `/product/${id}`,
    { formState },
    "Error editing product:"
  );
};

// route(DELETE("/api/product/{id}"),handler::delete)
export const deleteProduct = async (id) => {
  return apiCall("DELETE", `/product/${id}`, {}, "Error deleting product:");
};

// SetupIntent

export const listAllSetupIntents = async () => {
  return apiCall("GET", "/setupintent", {}, {}, "Error fetching setup intents");
};

export const getSetupIntent = async (id) => {
  return apiCall(
    "GET",
    `/setupintent/${id}`,
    {},
    {},
    "Error fetching setup intent"
  );
};

export const createSetupIntent = async (formState) => {
  return apiCall(
    "POST",
    "/setupintent",
    {},
    formState,
    "Error creating setup intent"
  );
};

export const confirmSetupIntent = async (id) => {
  return apiCall(
    "PUT",
    `/setupintent/confirm/${id}`,
    {},
    {},
    "Error confirming setup intent"
  );
};

export const editSetupIntent = async (id, formState) => {
  return apiCall(
    "PUT",
    `/setupintent/${id}`,
    {},
    formState,
    "Error editing setup intent"
  );
};

export const cancelSetupIntent = async (id) => {
  return apiCall(
    "DELETE",
    `/setupintent/${id}`,
    {},
    {},
    "Error canceling setup intent"
  );
};

// Subscription

// route((GET("/api/subscription")), handler::listAll)
export const listAllSubscriptions = async () => {
  return apiCall("GET", "/subscription", {}, "Error fetching subscriptions:");
};

// route(GET("/api/subscription/{id}"), handler::retrieve)
export const getSubscription = async (id) => {
  return apiCall(
    "GET",
    `/subscription/${id}`,
    {},
    "Error fetching subscription:"
  );
};

// route(POST("/api/subscription/{priceId}"), handler::create)
export const createSubscription = async (priceId, formState) => {
  return apiCall(
    "POST",
    `/subscription/${priceId}`,
    { formState },
    "Error creating subscription:"
  );
};

// route(PUT("/api/subscription/{id}"), handler::update)
export const editSubscription = async (id, formState) => {
  return apiCall(
    "PUT",
    `/subscription/${id}`,
    { formState },
    "Error editing subscription:"
  );
};

// route(DELETE("/api/subscription/{id}"), handler::cancel)
export const cancelSubscription = async (id) => {
  return apiCall(
    "DELETE",
    `/subscription/${id}`,
    {},
    "Error canceling subscription:"
  );
};
