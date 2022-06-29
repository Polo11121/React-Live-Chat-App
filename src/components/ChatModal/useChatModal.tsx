import { useEffect, useState } from "react";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "firebase-config";
import { toast } from "react-toastify";
import { useAuth } from "contexts/AuthContext";
import { UsersType, UserType } from "types/types";
import { inputHandler } from "helpers/functions";
import { groupImageUrl } from "constants/imageUrls";

export const useChatModal = () => {
  const { currentUser } = useAuth();
  const [chatName, setChatName] = useState("");
  const [users, setUsers] = useState<UsersType>([]);
  const [members, setMembers] = useState<
    { label: UserType; value: UserType }[]
  >([]);
  const [chatAvatarURL, setChatAvatarURL] = useState("");

  useEffect(() => {
    getDocs(collection(db, "users")).then((data) => {
      setUsers(
        data.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          ?.filter(
            (user) => user.id !== currentUser?.uid
          ) as unknown as UsersType
      );
    });
  }, []);

  const changeChatNameHandler = inputHandler(setChatName);

  const changeChatAvatarURL = inputHandler(setChatAvatarURL);

  const changeMembers = (event: any) => setMembers(event);

  const createChat = async () => {
    await addDoc(collection(db, "chats"), {
      chatName,
      chatAvatarURL: chatAvatarURL || groupImageUrl,
      members: [...members.map((user) => user.value.id), currentUser?.uid],
      messages: [],
    });
    toast.error("Chat successfully created!", {
      style: { backgroundColor: "#50144c" },
    });
  };

  return {
    chatName,
    chatAvatarURL,
    createChat,
    changeChatAvatarURL,
    changeChatNameHandler,
    changeMembers,
    users,
    isDisabled: !chatName || !members.length,
  };
};
