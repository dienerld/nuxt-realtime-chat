interface SendMessage {
  roomId: string
  ownerId: string
  message: string
  createdAt: Date
}

export interface ReceiveMessage extends SendMessage {
  id: string
}
