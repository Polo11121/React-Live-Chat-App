import { useEffect, useState } from "react";
import { db } from "firebase-config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { ChatTypes } from "types/types";
import { useAuth } from "contexts/AuthContext";

export const useGetChats = () => {
  const [chats, setChats] = useState<ChatTypes | null>(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    const querySet = query(
      collection(db, "chats"),
      where("members", "array-contains", currentUser?.uid)
    );

    onSnapshot(querySet, (data) =>
      setChats(
        data.docs.map((doc: { id: any; data: () => any }) => ({
          id: doc.id,
          ...doc.data(),
        })) as unknown as ChatTypes
      )
    );
  }, []);

  return chats;
};
