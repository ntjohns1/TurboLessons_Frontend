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

// route((GET("/payments/api/customer")), handler::listAll)
export const listAllCustomers = async () => {
  return apiCall("GET", `/payments/customer`, {}, "Error fetching customers:");
};
// route(GET("/payments/api/customer/{id}"), handler::retrieve)
export const getCustomer = async (id) => {
  return apiCall(
    "GET",
    `/payments/customer/${id}`,
    {},
    "Error fetching customer:"
  );
};
// route(POST("/payments/api/customer"), handler::create)
export const createCustomer = async (formState) => {
  return apiCall(
    "POST",
    "/payments/customer",
    { formState },
    "Error creating customer:"
  );
};
// route(PUT("/payments/api/customer/{id}"), handler::update)
export const editCustomer = async (id, formState) => {
  return apiCall(
    "PUT",
    `/payments/customer/${id}`,
    { formState },
    '"Error editing customer:"'
  );
};
// route(DELETE("/payments/api/customer/{id}"), handler::delete);
export const deleteCustomer = async (id) => {
  return apiCall(
    "DELETE",
    `/payments/customer/${id}`,
    {},
    "Error deleting customer:"
  );
};

// PaymentIntent

// route((GET("/payments/api/paymentintent")), handler::listAll)
export const listAllPaymentIntents = async () => {
  return apiCall(
    "GET",
    "/payments/paymentintent",
    {},
    "Error fetching payment intents:"
  );
};

// route(GET("/payments/api/paymentintent/{id}"), handler::retrieve)
export const getPaymentIntent = async (id) => {
  return apiCall(
    "GET",
    `/payments/paymentintent/${id}`,
    {},
    "Error fetching payment intent:"
  );
};

// route(GET("/payments/api/paymentintent/customer/{id}"), handler::searchByCustomer)
export const searchPaymentIntentByCustomer = async (customerId) => {
  return apiCall(
    "GET",
    `/payments/paymentintent/customer/${customerId}`,
    {},
    "Error fetching payment intent by customer:"
  );
};

// route(POST("/payments/api/paymentintent"), handler::create)
export const createPaymentIntent = async (formState) => {
  return apiCall(
    "POST",
    "/payments/paymentintent",
    { formState },
    "Error creating payment intent:"
  );
};

// route(PUT("/payments/api/paymentintent/{id}"), handler::update)
export const editPaymentIntent = async (id, formState) => {
  return apiCall(
    "PUT",
    `/payments/paymentintent/${id}`,
    { formState },
    "Error editing payment intent:"
  );
};

// route(PUT("/payments/api/paymentintent/capture/{id}"), handler::capture)
export const capturePaymentIntent = async (id) => {
  return apiCall(
    "PUT",
    `/payments/paymentintent/capture/${id}`,
    {},
    "Error capturing payment intent:"
  );
};

// route(DELETE("/payments/api/paymentintent/{id}"), handler::cancel)
export const cancelPaymentIntent = async (id) => {
  return apiCall(
    "DELETE",
    `/payments/paymentintent/${id}`,
    {},
    "Error canceling payment intent:"
  );
};

// PaymentMethod

// route((GET("/payments/api/paymentmethod")), handler::listAll)
export const listAllPaymentMethods = async () => {
  return apiCall(
    "GET",
    "/payments/paymentmethod",
    {},
    "Error fetching payment methods:"
  );
};

// route(GET("/payments/api/paymentmethod/{id}"), handler::retrieve)
export const getPaymentMethod = async (id) => {
  return apiCall(
    "GET",
    `/payments/paymentmethod/${id}`,
    {},
    "Error fetching payment method:"
  );
};

// route(GET("/payments/api/paymentmethod/customer/{id}"), handler::searchByCustomer)
export const searchPaymentMethodByCustomer = async (customerId) => {
  return apiCall(
    "GET",
    `/payments/paymentmethod/customer/${customerId}`,
    {},
    "Error fetching payment method by customer:"
  );
};

// route(POST("/payments/api/paymentmethod"), handler::create)
export const createPaymentMethod = async (formState) => {
  return apiCall(
    "POST",
    "/payments/paymentmethod",
    { formState },
    "Error creating payment method:"
  );
};

// route(PUT("/payments/api/paymentmethod/{id}"), handler::update)
export const editPaymentMethod = async (id, formState) => {
  return apiCall(
    "PUT",
    `/payments/paymentmethod/${id}`,
    { formState },
    "Error editing payment method:"
  );
};

// route(DELETE("/payments/api/paymentmethod/{id}"), handler::cancel)
export const cancelPaymentMethod = async (id) => {
  return apiCall(
    "DELETE",
    `/payments/paymentmethod/${id}`,
    {},
    "Error canceling payment method:"
  );
};

// Price

// route(GET("/payments/api/price"), handler::listAll)
export const listAllPrices = async () => {
  return apiCall("GET", "/payments/price", {}, "Error fetching prices:");
};

// route(GET("/payments/api/price/{id}"), handler::retrieve)
export const getPrice = async (id) => {
  return apiCall("GET", `/payments/price/${id}`, {}, "Error fetching price:");
};

// route(POST("/payments/api/price"), handler::create)
export const createPrice = async (formState) => {
  return apiCall(
    "POST",
    "/payments/price",
    { formState },
    "Error creating price:"
  );
};

// route(PUT("/payments/api/price/{id}"), handler::update)
export const editPrice = async (id, formState) => {
  return apiCall(
    "PUT",
    `/payments/price/${id}`,
    { formState },
    "Error editing price:"
  );
};

// Product

// route((GET("/payments/api/product")),handler::listAll)
export const listAllProducts = async () => {
  return apiCall("GET", "/payments/product", {}, "Error fetching products:");
};

// route(GET("/payments/api/product/{id}"),handler::retrieve)
export const getProduct = async (id) => {
  return apiCall(
    "GET",
    `/payments/product/${id}`,
    {},
    "Error fetching product:"
  );
};

// route(POST("/payments/api/product"),handler::create)
export const createProduct = async (formState) => {
  return apiCall(
    "POST",
    "/payments/product",
    { formState },
    "Error creating product:"
  );
};

// route(PUT("/payments/api/product/{id}"),handler::update)
export const editProduct = async (id, formState) => {
  return apiCall(
    "PUT",
    `/payments/product/${id}`,
    { formState },
    "Error editing product:"
  );
};

// route(DELETE("/payments/api/product/{id}"),handler::delete)
export const deleteProduct = async (id) => {
  return apiCall(
    "DELETE",
    `/payments/product/${id}`,
    {},
    "Error deleting product:"
  );
};

// SetupIntent

export const listAllSetupIntents = async () => {
  return apiCall(
    "GET",
    "/payments/setupintent",
    {},
    "Error fetching setup intents"
  );
};

export const getSetupIntent = async (id) => {
  return apiCall(
    "GET",
    `/payments/setupintent/${id}`,
    {},
    "Error fetching setup intent"
  );
};

export const createSetupIntent = async (formState) => {
  return apiCall(
    "POST",
    "/payments/setupintent",
    { formState },
    "Error creating setup intent"
  );
};

export const confirmSetupIntent = async (id) => {
  return apiCall(
    "PUT",
    `/payments/setupintent/confirm/${id}`,
    {},
    "Error confirming setup intent"
  );
};

export const editSetupIntent = async (id, formState) => {
  return apiCall(
    "PUT",
    `/payments/setupintent/${id}`,
    { formState },
    "Error editing setup intent"
  );
};

export const cancelSetupIntent = async (id) => {
  return apiCall(
    "DELETE",
    `/payments/setupintent/${id}`,
    {},
    "Error canceling setup intent"
  );
};

// Subscription

// route((GET("/payments/api/subscription")), handler::listAll)
export const listAllSubscriptions = async () => {
  return apiCall(
    "GET",
    "/payments/subscription",
    {},
    "Error fetching subscriptions:"
  );
};

// route(GET("/payments/api/subscription/{id}"), handler::retrieve)
export const getSubscription = async (id) => {
  return apiCall(
    "GET",
    `/payments/subscription/${id}`,
    {},
    "Error fetching subscription:"
  );
};

// route(POST("/payments/api/subscription/{priceId}"), handler::create)
export const createSubscription = async (priceId, formState) => {
  return apiCall(
    "POST",
    `/payments/subscription/${priceId}`,
    { formState },
    "Error creating subscription:"
  );
};

// route(PUT("/payments/api/subscription/{id}"), handler::update)
export const editSubscription = async (id, formState) => {
  return apiCall(
    "PUT",
    `/payments/subscription/${id}`,
    { formState },
    "Error editing subscription:"
  );
};

// route(DELETE("/payments/api/subscription/{id}"), handler::cancel)
export const cancelSubscription = async (id) => {
  return apiCall(
    "DELETE",
    `/payments/subscription/${id}`,
    {},
    "Error canceling subscription:"
  );
};
