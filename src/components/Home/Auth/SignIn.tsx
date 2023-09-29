"use client";

import Image from "next/image";
import logo from "../../../assets/logo.png";
import logInImage from "../../../assets/loginImg.png";
import { Raleway } from "next/font/google";
import { useForm, SubmitHandler } from "react-hook-form";
import GoogleSignIn from "./GoogleSignIn";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import auth from "@/firebase.init";
import Link from "next/link";
import Loading from "@/components/Shared/Loading";
import { toast } from "react-toastify";

const raleway = Raleway({ subsets: ["latin"] });

interface IFormInput {
  email: string;
  password: string;
}

const SignIn = () => {
  // sign in email and password
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  // if user found
  if (user) {
    toast.success(`Welcome ${user?.user?.displayName} 🎊`, {
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

  // hook form
  const { register, handleSubmit, reset } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const email = data.email;
    const password = data.password;

    // loading condition
    if (loading) {
      return <Loading />;
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

    // sign in
    await signInWithEmailAndPassword(email, password);

    reset();
  };

  return (
    <section className="sm:flex">
      {/* left side */}
      <div className="pt-5 sm:pl-5 sm:w-[30%] w-full">
        {/* logo */}
        <Link className="cursor-pointer block" href="/">
          <div className="flex items-center sm:justify-start justify-center gap-3">
            <Image src={logo} alt="logo" width={80} height={80} />
            <h1
              className={`text-xl font-medium text-[#092d42] ${raleway.className}`}
            >
              ClinixCare
            </h1>
          </div>
        </Link>

        {/* login */}
        <div className="absolute px-5 top-1/2 transform -translate-y-1/2 sm:left-0 left-1/2 sm:-translate-x-0 -translate-x-1/2 sm:w-auto w-full">
          <p className="text-[#092d42] mt-10 font-semibold text-2xl">
            Log in to your account
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
              {/* submit */}
              <input
                className="btn bg-[#092d42] text-white hover:bg-[#1d3b4d]"
                type="submit"
              />
            </form>
          </div>

          {/* sign up */}
          <div className="mt-5 text-sm  text-[#092d42]">
            <span>Don&apos;t have an account?</span>{" "}
            <Link href="/signup">
              <span className="underline cursor-pointer text-[#fc8e44] font-semibold">
                SignUp
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* right side */}
      <div className="bg-[#ecedf5] w-[70%] h-screen relative sm:block hidden">
        <Image
          className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2"
          src={logInImage}
          alt="login"
          width={600}
          height={600}
        />
      </div>
    </section>
  );
};

export default SignIn;
