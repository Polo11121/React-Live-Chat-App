import { User } from "firebase/auth";

export const formatChatMember = (member: User | null) => ({
  photoURL: member?.photoURL,
  id: member?.uid,
  email: member?.email,
  displayName: member?.displayName,
});
