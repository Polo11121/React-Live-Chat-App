export type UserType = {
  id: string;
  displayName: string;
  photoURL: string;
  email: string;
};

export type UsersType = UserType[];

export type MessageType = {
  message: string;
  timestamp: string;
  user: UserType;
};

export type MessagesType = MessageType[];

export type ChatType = {
  chatName: string;
  chatAvatarURL: string;
  id: string;
  messages: MessagesType;
};

export type ChatTypes = ChatType[];
