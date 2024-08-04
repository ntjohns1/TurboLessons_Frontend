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

//  Payment Service
