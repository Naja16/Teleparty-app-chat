// src/services/telepartyService.ts
import {
  TelepartyClient,
  SocketEventHandler,
  SocketMessageTypes,
  SessionChatMessage,
} from "teleparty-websocket-lib";

export class TelepartyService {
  private client: TelepartyClient | null = null;
  public eventHandler: SocketEventHandler;
  public isConnected: boolean; // Track connection status

  constructor() {
    this.eventHandler = {
      onConnectionReady: () => {
        this.isConnected = true;
        console.log("Connection ready");
      },
      onClose: () => {
        console.log("Connection closed");
        this.isConnected = false;
      },
      onMessage: (message) => {
        console.log("Received message:", message);
      },
    };
    this.isConnected = false;
    this.client = new TelepartyClient(this.eventHandler);
  }

  public createChatRoom(nickname: string, userIcon: string) {
    // return this.client?.createChatRoom(nickname, userIcon);
    const createData = {
      controlLock: false,
      videoId: "0",
      videoDuration: 0,
      videoService: "netflix",
      permId: "0000000000000000",
      userSettings: {
        userIcon: userIcon,
        userNickname: nickname,
      },
    };

    console.log("CreatedDate", createData);
    // return this.client?.sendMessage(SocketMessageTypes.CREATE_SESSION, {
    //   body: createData,
    // });
    return this.client?.createChatRoom(nickname, userIcon);
  }

  public joinChatRoom(roomId: string, nickname: string, userIcon: string) {
    // if(this.isConnected) {
    //   console.log("IsConnected--->", this.isConnected);
    // }
    const joinData = {
      videoId: "0",
      sessionId: roomId,
      videoService: "netflix",
      permId: "0000000000000000",
      userSettings: {
        userIcon: userIcon,
        userNickname: nickname,
      },
    };
    console.log(" Join", joinData);
    // return this.client?.joinChatRoom(nickname, roomId, userIcon);
    return this.client?.sendMessage(SocketMessageTypes.JOIN_SESSION, {
      body: joinData,
    });
  }

  public sendMessage(messageBody: string) {
    if (this.client) {
      return this.client.sendMessage(SocketMessageTypes.SEND_MESSAGE, {
        body: messageBody,
      });
    }
  }

  public setTypingPresence(typing: boolean) {
    if (this.client) {
      this.client.sendMessage(SocketMessageTypes.SET_TYPING_PRESENCE, {
        typing,
      });
    }
  }

  public close() {
    console.log("Close");
    // this.client?.teardown();
  }
}
