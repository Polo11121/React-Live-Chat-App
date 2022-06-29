import {
  useContext,
  useState,
  useEffect,
  createContext,
  ReactNode,
} from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
  User,
} from "firebase/auth";
import { auth, db } from "firebase-config";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { avatarUrl } from "constants/imageUrls";

const AuthContext = createContext({
  currentUser: auth.currentUser,
  signUp: (email: string, displayName: string, password: string) => {},
  signIn: (email: string, password: string) => {},
  logout: () => {},
  updateUserPhoto: (
    photoURL: string,
    setPhotoInput: React.Dispatch<React.SetStateAction<string>>
  ) => {},
  isLoading: false,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<null | User>(null);
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setCurrentUser(currentUser);
      setIsAppLoading(false);
    });

    return unsubscribe;
  }, []);

  const singUpErrorMessages = (message: string) => {
    const style = { backgroundColor: "#50144c" };

    if (message.includes("invalid-email") || message.includes("missing-email"))
      toast.error("Invalid email!", {
        style,
      });
    else if (
      message.includes("weak-password") ||
      message.includes("internal-error")
    ) {
      toast.error("Password should be at least 6 characters!", {
        style,
      });
    } else if (message.includes("email-already-in-use")) {
      toast.error("Email already in use!", {
        style,
      });
    }
  };

  const signUp = (email: string, displayName: string, password: string) => {
    if (!displayName) {
      toast.error("Invalid username!", {
        style: { backgroundColor: "#50144c" },
      });
    } else {
      setIsLoading(true);

      createUserWithEmailAndPassword(auth, email, password)
        .then((currentUser) =>
          updateProfile(currentUser.user, {
            displayName,
            photoURL: avatarUrl,
          }).then(() =>
            setDoc(doc(db, "users", currentUser.user.uid), {
              email,
              displayName,
              photoURL: avatarUrl,
            }).then(() => {
              setCurrentUser({
                ...currentUser.user,
                displayName,
                photoURL: avatarUrl,
              });
              setIsLoading(false);
            })
          )
        )
        .catch((error) => {
          setIsLoading(false);
          singUpErrorMessages(error.message);
        });
    }
  };

  const signIn = (email: string, password: string) => {
    setIsLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then(() => setIsLoading(false))
      .catch(() => {
        setIsLoading(false);
        toast.error("Invalid email or password!", {
          style: { backgroundColor: "#50144c" },
        });
      });
  };

  const updateUserPhoto = (
    photoURL: string,
    setPhotoInput: React.Dispatch<React.SetStateAction<string>>
  ) => {
    if (currentUser && auth.currentUser) {
      setIsLoading(true);

      updateProfile(auth.currentUser, {
        photoURL,
      })
        .then(() =>
          updateDoc(doc(db, "users", currentUser.uid), {
            photoURL,
          })
        )
        .then(() => {
          setCurrentUser({
            ...currentUser,
            photoURL,
          });
          setIsLoading(false);
          setPhotoInput("");
          toast.success("Avatar successfully changed!", {
            style: { backgroundColor: "#50144c" },
          });
        });
    }
  };

  const logout = () => {
    auth.signOut();
  };

  const value = {
    currentUser,
    signUp,
    signIn,
    logout,
    isLoading,
    updateUserPhoto,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isAppLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
