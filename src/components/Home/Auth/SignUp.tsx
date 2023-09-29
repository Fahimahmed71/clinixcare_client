"use client";

import Image from "next/image";
import signUpImage from "../../../assets/signUpImg.jpg";
import Link from "next/link";
import logo from "../../../assets/logo.png";
import { Raleway } from "next/font/google";
import GoogleSignIn from "./GoogleSignIn";
import { useForm, SubmitHandler } from "react-hook-form";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import auth from "@/firebase.init";
import { toast } from "react-toastify";
import Loading from "@/components/Shared/Loading";
import { useUpdateProfile } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";

const raleway = Raleway({ subsets: ["latin"] });

interface IFormInput {
  email: string;
  name: string;
  password: string;
  retypepassword: string;
}

const SignUp = () => {
  // user create
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  // update profile
  const [updateProfile, updating] = useUpdateProfile(auth);

  // router
  const router = useRouter();

  // if user fount this popup will be arrived
  if (user) {
    toast.success(`New account created`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    // return to home page
    router.push("/");
  }

  // hook form
  const { register, handleSubmit, reset } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const email = data.email;
    const password = data.password;
    const name = data.name;
    const retypepassword = data.retypepassword;

    // password didn't match
    if (password != retypepassword) {
      return toast.warn("Password didn't match", {
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

    // err condition
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

    // loading condition
    if (loading) {
      return <Loading />;
    }

    // create account
    await createUserWithEmailAndPassword(email, password);
    // create name
    await updateProfile({ displayName: name });

    // reset the form
    reset();
  };
  return (
    <section className="sm:flex">
      {/* left side */}
      <div className="w-[60%] sm:block hidden">
        <Image
          className="w-full h-screen object-cover"
          width={1000}
          height={1000}
          src={signUpImage}
          alt="sign up"
        />
      </div>

      {/* right side */}
      <div className="sm:w-[40%] w-full h-screen bg-[#ecedf5] relative">
        {/* logo */}
        <Link className="cursor-pointer block pt-4" href="/">
          <div className="flex items-center justify-center gap-3">
            <Image src={logo} alt="logo" width={80} height={80} />
            <h1
              className={`text-xl font-medium text-[#092d42] ${raleway.className}`}
            >
              ClinixCare
            </h1>
          </div>
        </Link>

        <div className="mt-5 w-full sm:px-[7rem] px-5 absolute transform -translate-x-1/2 left-1/2">
          <p className="text-[#092d42] text-center font-semibold text-2xl">
            Create your account
          </p>

          {/* login with google */}
          <GoogleSignIn />

          <div className="divider text-sm">Or with email and password</div>

          <div className="mt-10">
            {/* form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-5"
            >
              {/* name */}
              <input
                {...register("name", { required: true })}
                required
                type="text"
                placeholder="User"
                className="input input-bordered w-full"
              />{" "}
              {/* email */}
              <input
                {...register("email", { required: true })}
                required
                type="email"
                placeholder="User@mail.com"
                className="input input-bordered w-full"
              />
              {/* password */}
              <input
                {...register("password", { required: true })}
                required
                type="password"
                placeholder="Password"
                className="input input-bordered w-full"
              />
              {/* retype password */}
              <input
                {...register("retypepassword", { required: true })}
                required
                type="password"
                placeholder="Retype Password"
                className="input input-bordered w-full"
              />
              {/* submit */}
              <input
                className="btn bg-[#092d42] text-white hover:bg-[#1d3b4d]"
                type="submit"
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
