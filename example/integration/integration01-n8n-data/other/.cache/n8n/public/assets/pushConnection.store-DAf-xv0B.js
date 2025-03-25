import { r as ref, di as createHeartbeatMessage, S as defineStore, T as STORES, $ as useRootStore, p as useSettingsStore, I as watch, q as computed } from "./index-DkwrpQEB.js";
const useHeartbeat = (options) => {
  const { interval, onHeartbeat } = options;
  const heartbeatTimer = ref(null);
  const startHeartbeat = () => {
    heartbeatTimer.value = setInterval(onHeartbeat, interval);
  };
  const stopHeartbeat = () => {
    if (heartbeatTimer.value) {
      clearInterval(heartbeatTimer.value);
      heartbeatTimer.value = null;
    }
  };
  return {
    startHeartbeat,
    stopHeartbeat
  };
};
const useReconnectTimer = ({ onAttempt, onAttemptScheduled }) => {
  const initialReconnectDelay = 1e3;
  const maxReconnectDelay = 15e3;
  const reconnectTimer = ref(null);
  const reconnectAttempts = ref(0);
  const scheduleReconnect = () => {
    const delay = Math.min(initialReconnectDelay * 2 ** reconnectAttempts.value, maxReconnectDelay);
    reconnectAttempts.value++;
    onAttemptScheduled(delay);
    reconnectTimer.value = setTimeout(() => {
      onAttempt();
    }, delay);
  };
  const stopReconnectTimer = () => {
    if (reconnectTimer.value) {
      clearTimeout(reconnectTimer.value);
      reconnectTimer.value = null;
    }
  };
  const resetConnectionAttempts = () => {
    reconnectAttempts.value = 0;
  };
  return {
    scheduleReconnect,
    stopReconnectTimer,
    resetConnectionAttempts
  };
};
const useWebSocketClient = (options) => {
  const isConnected = ref(false);
  const socket = ref(null);
  const { startHeartbeat, stopHeartbeat } = useHeartbeat({
    interval: 3e4,
    onHeartbeat: () => {
      socket.value?.send(JSON.stringify(createHeartbeatMessage()));
    }
  });
  const onConnected = () => {
    socket.value?.removeEventListener("open", onConnected);
    isConnected.value = true;
    startHeartbeat();
    reconnectTimer.resetConnectionAttempts();
  };
  const onConnectionLost = (event) => {
    console.warn(`[WebSocketClient] Connection lost, code=${event.code ?? "unknown"}`);
    disconnect();
    reconnectTimer.scheduleReconnect();
  };
  const onMessage = (event) => {
    options.onMessage(event.data);
  };
  const onError = (error) => {
    console.warn("[WebSocketClient] Connection error:", error);
  };
  const disconnect = () => {
    if (socket.value) {
      stopHeartbeat();
      reconnectTimer.stopReconnectTimer();
      socket.value.removeEventListener("message", onMessage);
      socket.value.removeEventListener("error", onError);
      socket.value.removeEventListener("close", onConnectionLost);
      socket.value.close(1e3);
      socket.value = null;
    }
    isConnected.value = false;
  };
  const connect = () => {
    disconnect();
    socket.value = new WebSocket(options.url);
    socket.value.addEventListener("open", onConnected);
    socket.value.addEventListener("message", onMessage);
    socket.value.addEventListener("error", onError);
    socket.value.addEventListener("close", onConnectionLost);
  };
  const reconnectTimer = useReconnectTimer({
    onAttempt: connect,
    onAttemptScheduled: (delay) => {
      console.log(`[WebSocketClient] Attempting to reconnect in ${delay}ms`);
    }
  });
  const sendMessage = (serializedMessage) => {
    if (!isConnected.value || !socket.value) {
      throw new Error("Not connected to the server");
    }
    socket.value.send(serializedMessage);
  };
  return {
    isConnected,
    connect,
    disconnect,
    sendMessage
  };
};
const useEventSourceClient = (options) => {
  const isConnected = ref(false);
  const eventSource = ref(null);
  const onConnected = () => {
    isConnected.value = true;
    reconnectTimer.resetConnectionAttempts();
  };
  const onConnectionLost = () => {
    console.warn("[EventSourceClient] Connection lost");
    isConnected.value = false;
    reconnectTimer.scheduleReconnect();
  };
  const onMessage = (event) => {
    options.onMessage(event.data);
  };
  const disconnect = () => {
    if (eventSource.value) {
      reconnectTimer.stopReconnectTimer();
      eventSource.value.close();
      eventSource.value = null;
    }
    isConnected.value = false;
  };
  const connect = () => {
    disconnect();
    eventSource.value = new EventSource(options.url, { withCredentials: true });
    eventSource.value.addEventListener("open", onConnected);
    eventSource.value.addEventListener("message", onMessage);
    eventSource.value.addEventListener("close", onConnectionLost);
  };
  const reconnectTimer = useReconnectTimer({
    onAttempt: connect,
    onAttemptScheduled: (delay) => {
      console.log(`[EventSourceClient] Attempting to reconnect in ${delay}ms`);
    }
  });
  const sendMessage = (_) => {
  };
  return {
    isConnected,
    connect,
    disconnect,
    sendMessage
  };
};
const usePushConnectionStore = defineStore(STORES.PUSH, () => {
  const rootStore = useRootStore();
  const settingsStore = useSettingsStore();
  const outgoingQueue = ref([]);
  const isConnectionRequested = ref(false);
  const onMessageReceivedHandlers = ref([]);
  const addEventListener = (handler) => {
    onMessageReceivedHandlers.value.push(handler);
    return () => {
      const index = onMessageReceivedHandlers.value.indexOf(handler);
      if (index !== -1) {
        onMessageReceivedHandlers.value.splice(index, 1);
      }
    };
  };
  const useWebSockets = settingsStore.pushBackend === "websocket";
  const getConnectionUrl = () => {
    const restUrl = rootStore.restUrl;
    const url2 = `/push?pushRef=${rootStore.pushRef}`;
    if (useWebSockets) {
      const { protocol, host } = window.location;
      const baseUrl = restUrl.startsWith("http") ? restUrl.replace(/^http/, "ws") : `${protocol === "https:" ? "wss" : "ws"}://${host + restUrl}`;
      return `${baseUrl}${url2}`;
    } else {
      return `${restUrl}${url2}`;
    }
  };
  async function onMessage(data) {
    let receivedData;
    try {
      receivedData = JSON.parse(data);
    } catch (error) {
      return;
    }
    onMessageReceivedHandlers.value.forEach((handler) => handler(receivedData));
  }
  const url = getConnectionUrl();
  const client = useWebSockets ? useWebSocketClient({ url, onMessage }) : useEventSourceClient({ url, onMessage });
  function serializeAndSend(message) {
    if (client.isConnected.value) {
      client.sendMessage(JSON.stringify(message));
    } else {
      outgoingQueue.value.push(message);
    }
  }
  const pushConnect = () => {
    isConnectionRequested.value = true;
    client.connect();
  };
  const pushDisconnect = () => {
    isConnectionRequested.value = false;
    client.disconnect();
  };
  watch(client.isConnected, (didConnect) => {
    if (!didConnect) {
      return;
    }
    if (outgoingQueue.value.length) {
      for (const message of outgoingQueue.value) {
        serializeAndSend(message);
      }
      outgoingQueue.value = [];
    }
  });
  const clearQueue = () => {
    outgoingQueue.value = [];
  };
  const isConnected = computed(() => client.isConnected.value);
  return {
    isConnected,
    isConnectionRequested,
    onMessageReceivedHandlers,
    addEventListener,
    pushConnect,
    pushDisconnect,
    send: serializeAndSend,
    clearQueue
  };
});
export {
  usePushConnectionStore as u
};
