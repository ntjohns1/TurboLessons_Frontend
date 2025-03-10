// Admin Service

// SingleStudent.jsx line 20
export const getStudentProfile = async () => {
  const accessToken = oktaAuth.getAccessToken();

  await fetch(`${config.resourceServer.userAdminUrl}/profile/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((response) => response.json())
    .then((result) => setStudent(result))
    .catch(console.log);
};

// StudentContext.jsx line 22
export const getStudentsByTeacher = async () => {
  if (authState && authState.isAuthenticated) {
    console.log(accessToken);
    const principle = authState.idToken.claims.name;
    const url = `${config.resourceServer.userAdminUrl}/teacher/${principle}`;
    fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          setStudentFetchFailed(true);
          return Promise.reject();
        }
        return response.json();
      })
      .then((data) => {
        const res = data.map((s) => {
          return {
            id: s.id,
            displayName: s.profile.displayName,
            email: s.profile.email,
          };
        });
        setStudents(res);
        setStudentFetchFailed(false);
        console.log("fetched students:", res);
      })
      .catch((err) => {
        setStudentFetchFailed(true);
        console.error(err);
      });
  }
};

// AddStudent.jsx line 29
export const createStudent = async (event) => {
  event.preventDefault();
  const accessToken = oktaAuth.getAccessToken();
  await fetch(config.resourceServer.userAdminUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formState),
  })
    .then((response) => {
      if (response.status === 200 || response.status === 201) {
        return response.json();
      }
      return Promise.reject("Didn't receive expected status: 201");
    })
    .then((data) => {
      console.log(data);
      alert(
        `Successfully Added Account for: ${formState.firstName} ${formState.lastName}`
      );
    })
    .then(() => goBack())
    .catch((error) => {
      console.error("Error:", error);
    });
};

// EditStudent.jsx line 25
export const editStudent = async (evt) => {
  evt.preventDefault();

  const url = `${config.resourceServer.userAdminUrl}/${id}`;
  const accessToken = oktaAuth.getAccessToken();
  const method = "PUT";

  const init = {
    method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      login: formState.login,
      displayName: formState.displayName,
      firstName: formState.firstName,
      middleName: formState.middleName,
      lastName: formState.lastName,
      email: formState.email,
      mobilePhone: formState.mobilePhone,
      primaryPhone: formState.primaryPhone,
      streetAddress: formState.streetAddress,
      city: formState.city,
      state: formState.state,
      zipCode: formState.zipCode,
      userType: formState.userType,
    }),
  };

  await fetch(url, init)
    .then(() => {
      setStudent({ ...formState });
      return formState;
    })
    .then((data) => {
      console.log("/updateStudent: ", data);
      alert(`${data.displayName} successfully updated`);
    })
    .then(() => setIsUpdate(false))
    .catch((error) => {
      console.error("Error:", error);
    });
};

// DeleteUserBtn.jsx line 32
const deleteStudent = async (e) => {
  // e.preventDefault();
  const accessToken = oktaAuth.getAccessToken();
  try {
    fetch(`${config.resourceServer.userAdminUrl}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(() => alert(`${studentName} Deleted`))
      .then(() => goBack())
      .catch((error) => console.log(error));
  } catch (err) {
    return console.error(err);
  }
};

// Event Service
export const createLessonEvent = async (eventData) => {
  try {
    const response = await api.post("/lessons", eventData);
    return response.data;
  } catch (error) {
    console.error("Error creating lesson event:", error);
    throw error;
  }
};

// Calendar.jsx line 47
// note: current implementation uses useCallback hook
export const fetchEvents = () => {
  return new Promise((resolve, reject) => {
    if (authState && authState.isAuthenticated) {
      const url = `${config.resourceServer.eventsUrl}/teacher/${principle}`;
      console.log(url);
      fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          const events = data.map((s) => ({
            id: s.id,
            start: s.start,
            end: s.end,
            title: s.title,
          }));
          setCurrentEvents(events);
          resolve(events);
          console.log("events: \n" + JSON.stringify(events, null, 2));
        })
        .catch((err) => {
          reject(err);
        });
    } else {
      reject(new Error("User is not authenticated."));
    }
  });
};

// NewLesson.jsx line 56, NewLessonModal.jsx line 61
const createLesson = async (event) => {
  event.preventDefault();
  console.log("Request Payload:", JSON.stringify(formState)); // Log the request payload

  const accessToken = oktaAuth.getAccessToken();
  await fetch(config.resourceServer.eventsUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formState),
  })
    .then((response) => {
      if (response.status === 200 || response.status === 204) {
        return response.json();
      }
      return Promise.reject("Didn't receive expected status: 201");
    })
    .then((responseData) => {
      console.log("Response Data:", JSON.stringify(responseData));
      alert("Successfully Added Lesson Event");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

// Messsage Service
import config from "../config";

export async function fetchAllMessage(accessToken) {
  const response = await fetch(config.resourceServer.messagesUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  const res = data.map((m) => {
    return {
      id: m.id,
      sender: m.sender,
      recipient: m.recipient,
      msg: m.msg,
      timestamp: m.timestamp,
    };
  });
  return res;
}

export async function fetchMessagesByReceiver(receiverId, accessToken) {
  const response = await fetch(
    `${config.resourceServer.messagesUrl}/recipient/${receiverId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  const res = data.map((m) => {
    return {
      id: m.id,
      sender: m.sender,
      recipient: m.recipient,
      msg: m.msg,
      timestamp: m.timestamp,
    };
  });
  return res;
}

export async function fetchMessagesBySender(senderId, accessToken) {
  const response = await fetch(
    `${config.resourceServer.messagesUrl}/recipient/${senderId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  const res = data.map((m) => {
    return {
      id: m.id,
      sender: m.sender,
      recipient: m.recipient,
      msg: m.msg,
      timestamp: m.timestamp,
    };
  });
  return res;
}

export async function fetchMessagesBySenderAndReceiver(
  sender,
  receiver,
  accessToken
) {
  const response = await fetch(
    `${config.resourceServer.messagesUrl}/${sender}/to/${receiver}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  const res = data.map((m) => {
    return {
      id: m.id,
      sender: m.sender,
      recipient: m.recipient,
      msg: m.msg,
      timestamp: m.timestamp,
    };
  });
  console.log(`${config.resourceServer.messagesUrl}/${sender}/to/${receiver}`);
  return res;
}

export async function sendMessage(sendTo, message, accessToken) {
  const response = await fetch(
    `${config.resourceServer.messagesUrl}/${sendTo}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    }
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response;
}

// Video Service
// SelectVideo.jsx line 20
export const fetchVideos = async () => {
  try {
    const response = await api.get("/video");
    return response.data;
  } catch (error) {
    console.error("Error fetching videos:", error);
    throw error;
  }
};

// PlayVideo.jsx line 11
export const getVideo = async () => {
  if (!authState.isAuthenticated) {
    // If the user is not authenticated, do nothing
    return;
  }

  // Fetch video
  fetch(videoSrc, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => res.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      videoRef.current.src = url;
    })
    .catch((err) => console.error(err));
};

export const uploadVideo = async (event) => {
  event.preventDefault();

  const accessToken = oktaAuth.getAccessToken();

  let formData = new FormData();
  formData.append("file", formState);

  console.log("File Data:", formData.get("file"));

  await fetch(config.resourceServer.videoUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  })
    .then((response) => {
      if (response.status === 200 || response.status === 204) {
        return response.text();
      }
      return Promise.reject("Didn't receive expected status: 201");
    })
    .then((responseData) => {
      console.log("Response Data:", JSON.stringify(responseData));
      alert("Successfully Uploaded Video");
    })
    .catch((errorResponse) => {
      console.error("Error:", errorResponse);
      errorResponse.text().then((text) => {
        console.error("Error Body:", text);
      });
    });
};

//  Payment Service - before refactoring

// import api from "./axiosConfig";

// // Customer

// // route((GET("/api/customer")), handler::listAll)
// export const listAllCustomers = async () => {
//   try {
//     const response = await api.get(`/customer`);
//     return response.data;
//   } catch (error) {
//     console.console.error("Error fetching customers:", error);
//     throw error;
//   }
// };
// // route(GET("/api/customer/{id}"), handler::retrieve)
// export const getCustomer = async (id) => {
//   try {
//     const response = await api.get(`/customer/${id}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching customer:", error);
//     throw error;
//   }
// };
// // route(POST("/api/customer"), handler::create)
// export const createCustomer = async (formState) => {
//   try {
//     const response = await api.post("/customer", formState);
//     return response.data;
//   } catch (error) {
//     console.error("Error creating customer:", error);
//     throw error;
//   }
// };
// // route(PUT("/api/customer/{id}"), handler::update)
// export const editCustomer = async (id, formState) => {
//     try {
//       const response = await api.put(`/customer/${id}`, formState);
//       return response.data;
//     } catch (error) {
//       console.error("Error editing customer:", error);
//       throw error;
//     }
//   };
// // route(DELETE("/api/customer/{id}"), handler::delete);
// export const deleteCustomer = async (id) => {
//     try {
//         const response = await api.delete(`/customer/${id}`);
//         return response.data;
//     } catch (error) {
//         console.error("Error editing customer:", error);
//         throw error;
//     }
    
// }
// // PaymentIntent

// // route((GET("/api/paymentintent")), handler::listAll)
// export const listAllPaymentIntents = async () => {
//     try {
//       const response = await api.get(`/paymentintent`);
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching payment intents:", error);
//       throw error;
//     }
//   };
  
//   // route(GET("/api/paymentintent/{id}"), handler::retrieve)
//   export const getPaymentIntent = async (id) => {
//     try {
//       const response = await api.get(`/paymentintent/${id}`);
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching payment intent:", error);
//       throw error;
//     }
//   };
  
//   // route(GET("/api/paymentintent/customer/{id}"), handler::searchByCustomer)
//   export const searchPaymentIntentByCustomer = async (customerId) => {
//     try {
//       const response = await api.get(`/paymentintent/customer/${customerId}`);
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching payment intent by customer:", error);
//       throw error;
//     }
//   };
  
//   // route(POST("/api/paymentintent"), handler::create)
//   export const createPaymentIntent = async (formState) => {
//     try {
//       const response = await api.post("/paymentintent", formState);
//       return response.data;
//     } catch (error) {
//       console.error("Error creating payment intent:", error);
//       throw error;
//     }
//   };
  
//   // route(PUT("/api/paymentintent/{id}"), handler::update)
//   export const editPaymentIntent = async (id, formState) => {
//     try {
//       const response = await api.put(`/paymentintent/${id}`, formState);
//       return response.data;
//     } catch (error) {
//       console.error("Error editing payment intent:", error);
//       throw error;
//     }
//   };
  
//   // route(PUT("/api/paymentintent/capture/{id}"), handler::capture)
//   export const capturePaymentIntent = async (id) => {
//     try {
//       const response = await api.put(`/paymentintent/capture/${id}`);
//       return response.data;
//     } catch (error) {
//       console.error("Error capturing payment intent:", error);
//       throw error;
//     }
//   };
  
//   // route(DELETE("/api/paymentintent/{id}"), handler::cancel)
//   export const cancelPaymentIntent = async (id) => {
//     try {
//       const response = await api.delete(`/paymentintent/${id}`);
//       return response.data;
//     } catch (error) {
//       console.error("Error canceling payment intent:", error);
//       throw error;
//     }
//   };

// // PaymentMethod

// // route((GET("/api/paymentmethod")), handler::listAll)
// export const listAllPaymentMethods = async () => {
//     try {
//       const response = await api.get(`/paymentmethod`);
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching payment methods:", error);
//       throw error;
//     }
//   };
  
//   // route(GET("/api/paymentmethod/{id}"), handler::retrieve)
//   export const getPaymentMethod = async (id) => {
//     try {
//       const response = await api.get(`/paymentmethod/${id}`);
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching payment method:", error);
//       throw error;
//     }
//   };
  
//   // route(GET("/api/paymentmethod/customer/{id}"), handler::searchByCustomer)
//   export const searchPaymentMethodByCustomer = async (customerId) => {
//     try {
//       const response = await api.get(`/paymentmethod/customer/${customerId}`);
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching payment method by customer:", error);
//       throw error;
//     }
//   };
  
//   // route(POST("/api/paymentmethod"), handler::create)
//   export const createPaymentMethod = async (formState) => {
//     try {
//       const response = await api.post("/paymentmethod", formState);
//       return response.data;
//     } catch (error) {
//       console.error("Error creating payment method:", error);
//       throw error;
//     }
//   };
  
//   // route(PUT("/api/paymentmethod/{id}"), handler::update)
//   export const editPaymentMethod = async (id, formState) => {
//     try {
//       const response = await api.put(`/paymentmethod/${id}`, formState);
//       return response.data;
//     } catch (error) {
//       console.error("Error editing payment method:", error);
//       throw error;
//     }
//   };
  
//   // route(DELETE("/api/paymentmethod/{id}"), handler::cancel)
//   export const cancelPaymentMethod = async (id) => {
//     try {
//       const response = await api.delete(`/paymentmethod/${id}`);
//       return response.data;
//     } catch (error) {
//       console.error("Error canceling payment method:", error);
//       throw error;
//     }
//   };

// // Price

// // route(GET("/api/price"), handler::listAll)
// export const listAllPrices = async () => {
//     try {
//       const response = await api.get(`/price`);
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching prices:", error);
//       throw error;
//     }
//   };
  
//   // route(GET("/api/price/{id}"), handler::retrieve)
//   export const getPrice = async (id) => {
//     try {
//       const response = await api.get(`/price/${id}`);
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching price:", error);
//       throw error;
//     }
//   };
  
//   // route(POST("/api/price"), handler::create)
//   export const createPrice = async (formState) => {
//     try {
//       const response = await api.post("/price", formState);
//       return response.data;
//     } catch (error) {
//       console.error("Error creating price:", error);
//       throw error;
//     }
//   };
  
//   // route(PUT("/api/price/{id}"), handler::update)
//   export const editPrice = async (id, formState) => {
//     try {
//       const response = await api.put(`/price/${id}`, formState);
//       return response.data;
//     } catch (error) {
//       console.error("Error editing price:", error);
//       throw error;
//     }
//   };

// // Product

// // Product

// // route((GET("/api/product")),handler::listAll)
// export const listAllProducts = async () => {
//     try {
//       const response = await api.get(`/product`);
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       throw error;
//     }
//   };
  
//   // route(GET("/api/product/{id}"),handler::retrieve)
//   export const getProduct = async (id) => {
//     try {
//       const response = await api.get(`/product/${id}`);
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching product:", error);
//       throw error;
//     }
//   };
  
//   // route(POST("/api/product"),handler::create)
//   export const createProduct = async (formState) => {
//     try {
//       const response = await api.post("/product", formState);
//       return response.data;
//     } catch (error) {
//       console.error("Error creating product:", error);
//       throw error;
//     }
//   };
  
//   // route(PUT("/api/product/{id}"),handler::update)
//   export const editProduct = async (id, formState) => {
//     try {
//       const response = await api.put(`/product/${id}`, formState);
//       return response.data;
//     } catch (error) {
//       console.error("Error editing product:", error);
//       throw error;
//     }
//   };
  
//   // route(DELETE("/api/product/{id}"),handler::delete)
//   export const deleteProduct = async (id) => {
//     try {
//       const response = await api.delete(`/product/${id}`);
//       return response.data;
//     } catch (error) {
//       console.error("Error deleting product:", error);
//       throw error;
//     }
//   };

// // SetupIntent

// // route((GET("/api/setupintent")),handler::listAll)
// export const listAllSetupIntents = async () => {
//     try {
//       const response = await api.get(`/setupintent`);
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching setup intents:", error);
//       throw error;
//     }
//   };
  
//   // route(GET("/api/setupintent/{id}"),handler::retrieve)
//   export const getSetupIntent = async (id) => {
//     try {
//       const response = await api.get(`/setupintent/${id}`);
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching setup intent:", error);
//       throw error;
//     }
//   };
  
//   // route(POST("/api/setupintent"),handler::create)
//   export const createSetupIntent = async (formState) => {
//     try {
//       const response = await api.post("/setupintent", formState);
//       return response.data;
//     } catch (error) {
//       console.error("Error creating setup intent:", error);
//       throw error;
//     }
//   };
  
//   // route(PUT("/api/setupintent/confirm/{id}"),handler::confirm)
//   export const confirmSetupIntent = async (id) => {
//     try {
//       const response = await api.put(`/setupintent/confirm/${id}`);
//       return response.data;
//     } catch (error) {
//       console.error("Error confirming setup intent:", error);
//       throw error;
//     }
//   };
  
//   // route(PUT("/api/setupintent/{id}"),handler::update)
//   export const editSetupIntent = async (id, formState) => {
//     try {
//       const response = await api.put(`/setupintent/${id}`, formState);
//       return response.data;
//     } catch (error) {
//       console.error("Error editing setup intent:", error);
//       throw error;
//     }
//   };
  
//   // route(DELETE("/api/setupintent/{id}"),handler::cancel)
//   export const cancelSetupIntent = async (id) => {
//     try {
//       const response = await api.delete(`/setupintent/${id}`);
//       return response.data;
//     } catch (error) {
//       console.error("Error canceling setup intent:", error);
//       throw error;
//     }
//   };

// // Subscription

// // route((GET("/api/subscription")), handler::listAll)
// export const listAllSubscriptions = async () => {
//     try {
//       const response = await api.get(`/subscription`);
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching subscriptions:", error);
//       throw error;
//     }
//   };
  
//   // route(GET("/api/subscription/{id}"), handler::retrieve)
//   export const getSubscription = async (id) => {
//     try {
//       const response = await api.get(`/subscription/${id}`);
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching subscription:", error);
//       throw error;
//     }
//   };
  
//   // route(POST("/api/subscription/{priceId}"), handler::create)
//   export const createSubscription = async (priceId, formState) => {
//     try {
//       const response = await api.post(`/subscription/${priceId}`, formState);
//       return response.data;
//     } catch (error) {
//       console.error("Error creating subscription:", error);
//       throw error;
//     }
//   };
  
//   // route(PUT("/api/subscription/{id}"), handler::update)
//   export const editSubscription = async (id, formState) => {
//     try {
//       const response = await api.put(`/subscription/${id}`, formState);
//       return response.data;
//     } catch (error) {
//       console.error("Error editing subscription:", error);
//       throw error;
//     }
//   };
  
//   // route(DELETE("/api/subscription/{id}"), handler::cancel)
//   export const cancelSubscription = async (id) => {
//     try {
//       const response = await api.delete(`/subscription/${id}`);
//       return response.data;
//     } catch (error) {
//       console.error("Error canceling subscription:", error);
//       throw error;
//     }
//   };

  