import api from './axiosConfig';

export async function fetchAllMessages() {
  try {
    const response = await api.get('/messages');
    const res = response.data.map((m) => ({
      id: m.id,
      sender: m.sender,
      recipient: m.recipient,
      msg: m.msg,
      timestamp: m.timestamp,
    }));
    return res;
  } catch (error) {
    console.error('Error fetching all messages:', error);
    throw error;
  }
}

export async function fetchMessagesByReceiver(receiverId) {
  try {
    const response = await api.get(`/messages/recipient/${receiverId}`);
    const res = response.data.map((m) => ({
      id: m.id,
      sender: m.sender,
      recipient: m.recipient,
      msg: m.msg,
      timestamp: m.timestamp,
    }));
    return res;
  } catch (error) {
    console.error('Error fetching messages by receiver:', error);
    throw error;
  }
}

export async function fetchMessagesBySender(senderId) {
  try {
    const response = await api.get(`/messages/sender/${senderId}`);
    const res = response.data.map((m) => ({
      id: m.id,
      sender: m.sender,
      recipient: m.recipient,
      msg: m.msg,
      timestamp: m.timestamp,
    }));
    return res;
  } catch (error) {
    console.error('Error fetching messages by sender:', error);
    throw error;
  }
}

export async function fetchMessagesBySenderAndReceiver(sender, receiver) {
  try {
    const response = await api.get(`/messages/${sender}/to/${receiver}`);
    const res = response.data.map((m) => ({
      id: m.id,
      sender: m.sender,
      recipient: m.recipient,
      msg: m.msg,
      timestamp: m.timestamp,
    }));
    console.log(`/messages/${sender}/to/${receiver}`);
    return res;
  } catch (error) {
    console.error('Error fetching messages by sender and receiver:', error);
    throw error;
  }
}

export async function sendMessage(sendTo, message) {
  try {
    const response = await api.post(`/messages/${sendTo}`, message);
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
}