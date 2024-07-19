//parte dos
import http from "http";
import express, { Application } from "express";
import { Server as SocketServer, Socket } from "socket.io";
import { PrismaClient } from "@prisma/client";
import { ChatServices } from "../chat/chat.services";

const prisma = new PrismaClient();
const chatServices = new ChatServices();

export class ServerSocket {
  private server: http.Server;
  private io: SocketServer;

  constructor(server: http.Server) {
    this.server = server;
    this.io = new SocketServer(this.server, {
      cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type"],
      },
    });

    this.initializeSocket();
  }

  private initializeSocket(): void {
    this.io.on("connection", (socket: Socket) => {
      console.log("a user connected:", socket.id);

      socket.on("sendMessage", async (data) => {
        const { userSendID, userReceiveId, message, roomId } = data;

        try {
          const newMessage = await chatServices.createMessage(
            userSendID,
            userReceiveId,
            message
          );
          this.io.to(roomId).emit("receiveMessage", newMessage);
        } catch (err) {
          console.error("Error saving message:", err);
        }
      });

      socket.on("disconnect", () => {
        console.log("user disconnected:", socket.id);
      });
    });
  }

  public start(port: number): void {
    this.server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
}
