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

// route(GET("/api/payments/customer/lookup/{id}"), handler::search)
export const searchCustomerByOktaId = async (id) => {
  return apiCall(
    "GET",
    `/payments/customer/lookup/${id}`,
    {},
    "Error fetching customer:"
  );
};

// route(POST("/payments/api/customer"), handler::create)
export const createCustomer = async (formState) => {
  const { metadata = {}, ...rest } = formState;
  const correctedPayload = {
    ...rest,
    metadata: {
      ...metadata,
      okta_id: formState["metadata.okta_id"],
    },
  };
  return apiCall(
    "POST",
    "/payments/customer",
    correctedPayload,
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

// Invoice

// (GET("/api/payments/invoice")), handler::listAll)
export const listAllInvoices = async () => {
  return apiCall("GET", "/payments/invoice", {}, "Error fetching invoices:");
};

// (GET("/api/payments/invoice/{id}/customer"), handler::listAllByCustomer)
export const listAllInvoicesByCustomer = async (customerId) => {
  return apiCall(
    "GET",
    `/payments/invoice/${customerId}/customer`,
    {},
    "Error fetching invoices by customer"
  );
};

// (GET("/api/payments/invoice/{id}/subscription"), handler::listAllBySubscription)
export const listAllInvoicesBySubscription = async (subscriptionId) => {
  return apiCall(
    "GET",
    `/payments/invoice/${subscriptionId}/subscription`,
    {},
    "Error fetching invoices by subscription"
  );
};

// (GET("/api/payments/invoice/{id}"), handler::retrieve)
export const getInvoice = async (id) => {
  return apiCall(
    "GET",
    `/payments/invoice/${id}`,
    {},
    "Error fetching invoice:"
  );
};

// (GET("/api/payments/invoice/{id}/upcoming"), handler::retrieveUpcoming)
export const getUpcomingInvoice = async (id) => {
  return apiCall(
    "GET",
    `/payments/invoice/${id}/upcoming`,
    {},
    "Error fetching upcoming invoice:"
  );
};

// (POST("/api/payments/invoice"), handler::create)
export const createInvoice = async (formState) => {
  return apiCall(
    "POST",
    "/payments/invoice",
    { formState },
    "Error creating invoice:"
  );
};

// (PUT("/api/payments/invoice/{id}"), handler::update)
export const editInvoice = async (id, formState) => {
  return apiCall(
    "PUT",
    `/payments/invoice/${id}`,
    { formState },
    "Error editing invoice:"
  );
};

// (DELETE("/api/payments/invoice/{id}"), handler::deleteDraft)
export const deleteInvoice = async (id) => {
  return apiCall(
    "DELETE",
    `/payments/invoice/${id}`,
    {},
    "Error deleting invoice:"
  );
};
// (POST("/api/payments/invoice/{id}/finalize"), handler::finalize)
export const finalizeInvoice = async (id) => {
  return apiCall(
    "POST",
    `/payments/invoice/${id}/finalize`,
    {},
    "Error finalizing invoice:"
  );
};

// (POST("/api/payments/invoice/{id}/pay"), handler::payInvoice)
export const payInvoice = async (id) => {
  return apiCall(
    "POST",
    `/payments/invoice/${id}/pay`,
    {},
    "Error paying invoice:"
  );
};

// (POST("/api/payments/invoice/{id}/void"), handler::voidInvoice)
export const voidInvoice = async (id) => {
  return apiCall(
    "POST",
    `/payments/invoice/${id}/void`,
    {},
    "Error voiding invoice:"
  );
};

// (POST("/api/payments/invoice/{id}/mark_uncollectible"), handler::markUncollectible)
export const markUncollectibleInvoice = async (id) => {
  return apiCall(
    "POST",
    `/payments/invoice/${id}/mark_uncollectible`,
    {},
    "Error marking invoice uncollectible:"
  );
};

// (POST("/api/payments/invoice/{id}/line_items"), handler::retrieveLineItems)
export const retrieveLineItems = async (id) => {
  return apiCall(
    "POST",
    `/payments/invoice/${id}/line_items`,
    {},
    "Error retrieving line items:"
  );
};

// (POST("/api/payments/invoice/{id}/upcoming/line_items"), handler::retrieveUpcomingLineItems);
export const retrieveUpcomingLineItems = async (id) => {
  return apiCall(
    "POST",
    `/payments/invoice/${id}/upcoming/line_items`,
    {},
    "Error retrieving upcoming line items:"
  );
};

// Meter

// (GET("/api/payments/meter")), handler::listAll)
export const listAllMeters = async () => {
  return apiCall("GET", "/payments/meter", {}, "Error fetching meters:");
};

// (GET("/api/payments/meter/{id}"), handler::retrieve)
export const getMeter = async (id) => {
  return apiCall("GET", `/payments/meter/${id}`, {}, "Error fetching meter:");
};

// (POST("/api/payments/meter"), handler::create)
export const createMeter = async (formState) => {
  return apiCall(
    "POST",
    "/payments/meter",
    { formState },
    "Error creating meter:"
  );
};

// (POST("/api/payments/meter/{id}"), handler::update)
export const editMeter = async (id, formState) => {
  return apiCall(
    "POST",
    `/payments/meter/${id}`,
    { formState },
    "Error editing meter:"
  );
};

// (POST("/api/payments/meter/{id}/deactivate"), handler::deactivate)
export const deactivateMeter = async (id) => {
  return apiCall(
    "POST",
    `/payments/meter/${id}/deactivate`,
    {},
    "Error deactivating meter:"
  );
};

// (POST("/api/payments/meter/{id}/reactivate"), handler::reactivate)
export const reactivateMeter = async (id) => {
  return apiCall(
    "POST",
    `/payments/meter/${id}/reactivate`,
    {},
    "Error reactivating meter:"
  );
};

// (POST("/api/payments/meter_event"), handler::createEvent);
export const createMeterEvent = async (formState) => {
  return apiCall(
    "POST",
    "/payments/meter_event",
    { formState },
    "Error creating meter event:"
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

export const attachPaymentMethod = async (id, customerId) => {
  return apiCall(
    "PUT",
    `/payments/paymentmethod/attach/${id}/${customerId}`,
    {},
    "Error attaching payment method: "
  );
};

export const detachPaymentMethod = async (id) => {
  return apiCall(
    "PUT",
    `/payments/paymentmethod/detach/${id}`,
    {},
    "Error attaching payment method: "
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
export const createSubscription = async (formState) => {
  const subscriptionDto = {
    customer: formState.customerId,
    items: formState.items,
    defaultPaymentMethod: formState.defaultPaymentMethod,
    cancelAtPeriodEnd: false,
    cancelAt: null,
  };

  return apiCall(
    "POST",
    `/payments/subscription`,
    subscriptionDto,
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

// (GET("/api/payments/invoice")), handler::listAll)
// (GET("/api/payments/invoice/{id}/customer"), handler::listAllByCustomer)
// (GET("/api/payments/invoice/{id}/subscription"), handler::listAllBySubscription)
// (GET("/api/payments/invoice/{id}"), handler::retrieve)
// (GET("/api/payments/invoice/{id}/upcoming"), handler::retrieveUpcoming)
// (POST("/api/payments/invoice"), handler::create)
// (PUT("/api/payments/invoice/{id}"), handler::update)
// (DELETE("/api/payments/invoice/{id}"), handler::deleteDraft)
// (POST("/api/payments/invoice/{id}/finalize"), handler::finalize)
// (POST("/api/payments/invoice/{id}/pay"), handler::payInvoice)
// (POST("/api/payments/invoice/{id}/void"), handler::voidInvoice)
// (POST("/api/payments/invoice/{id}/mark_uncollectible"), handler::markUncollectible)
// (POST("/api/payments/invoice/{id}/line_items"), handler::retrieveLineItems)
// (POST("/api/payments/invoice/{id}/upcoming/line_items"), handler::retrieveUpcomingLineItems);

// (GET("/api/payments/meter")), handler::listAll)
// (GET("/api/payments/meter/{id}"), handler::retrieve)
// (POST("/api/payments/meter"), handler::create)
// (POST("/api/payments/meter/{id}"), handler::update)
// (POST("/api/payments/meter/{id}/deactivate"), handler::deactivate)
// (POST("/api/payments/meter/{id}/reactivate"), handler::reactivate)
// (POST("/api/payments/meter_event"), handler::createEvent);
