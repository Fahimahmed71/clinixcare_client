import { FcGoogle } from "react-icons/fc";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import Loading from "@/components/Shared/Loading";
import { toast } from "react-toastify";

const GoogleSignIn = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  if (error) {
    return toast.error(error.message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }
  if (loading) {
    return <Loading />;
  }
  if (user) {
    return (
      <div>
        <p>Signed In User:</p>
      </div>
    );
  }

  return (
    <div onClick={() => signInWithGoogle()}>
      <button className="mt-7 btn outline outline-1 outline-[#092d42] w-full">
        <span className="text-3xl">
          <FcGoogle />
        </span>
        <span className="text-base">Google</span>
      </button>
    </div>
  );
};

export default GoogleSignIn;
