import { useCallback, useEffect, useReducer, useState } from 'react';
import { ChatMessage } from '../models/chatmessage.model';
import { EventTypes } from '../models/eventtype.enum';
import { Server } from '../models/server.model';
import { getServerInfo } from '../services/serverservice';

interface ServerAction {
  type: EventTypes;
  payload: ChatMessage;
}

interface ServerState {
  chatMessages: ChatMessage[];
  serverInfo: Server | undefined;
}

const reducer = (state: ServerState, action: ServerAction): ServerState => {
  const { type, payload } = action;
  switch (type) {
    case EventTypes.CHAT_MESSAGE:
      const uniqueChatMessages = [...state.chatMessages, payload].filter(
        (item, index, self) =>
          index === self.findIndex((message) => message.id === item.id)
      );
      return { ...state, chatMessages: uniqueChatMessages };
    default:
      return state;
  }
};

export const useServerInfo = () => {
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState<WebSocket>();
  const [state, dispatch] = useReducer(reducer, {
    chatMessages: [],
    serverInfo: undefined,
  });

  const handleMessage = (message: { type: EventTypes; data: any }) => {
    switch (message.type) {
      case EventTypes.CHAT_MESSAGE:
        dispatch({ type: EventTypes.CHAT_MESSAGE, payload: message.data });
        break;
    }
  };

  const connectToWebSocketServer = useCallback(() => {
    const socket = new WebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_ENDPOINT);

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      handleMessage(message);
      //setServerInfo(data);
    };

    socket.onclose = () => {
      console.log('Connexion perdue. Tentative de reconnexion...');
      setTimeout(() => {
        connectToWebSocketServer();
      }, 5000);
    };

    setSocket(socket);
  }, []);

  useEffect(() => {
    connectToWebSocketServer();
    return () => {
      if (socket) socket.close();
    };
  }, [connectToWebSocketServer]);

  useEffect(() => {
    const fetchServerInfo = async () => {
      const serverInfo = await getServerInfo();
      state.serverInfo = serverInfo;
      setLoading(false);
    };

    setLoading(true);
    fetchServerInfo();
  }, []);

  return { state, loading };
};
