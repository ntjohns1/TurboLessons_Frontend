import config from '../../config'

export async function fetchAllMessage(accessToken) {

    const response = await fetch(`http://localhost:8080/api/messages`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
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
            timestamp: m.timestamp
        };
    });
    return res;
}

export async function fetchMessagesByReceiver(receiverId, accessToken) {

    const response = await fetch(`http://localhost:8080/api/messages/recipient/${receiverId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
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
            timestamp: m.timestamp
        };
    });
    return res;
}

export async function fetchMessagesBySender(senderId, accessToken) {

    const response = await fetch(`http://localhost:8080/api/messages/recipient/${senderId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
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
            timestamp: m.timestamp
        };
    });
    return res;
}

export async function fetchMessagesBySenderAndReceiver(sender, receiver, accessToken) {

    const response = await fetch(`http://localhost:8080/api/messages/${sender}/to/${receiver}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
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
            timestamp: m.timestamp
        };
    });
    console.log(`http://localhost:8080/api/messages/${sender}/to/${receiver}`);
    return res;
}

export async function sendMessage(sendTo, message, accessToken) {

    const response = await fetch(`http://localhost:8080/api/messages/${sendTo}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message),
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response;
}
