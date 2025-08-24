import React, { use, useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BGIMG, USER_AVATAR } from "../utils/constants";
import Loader from "./Loader";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, seterrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  // const name = useRef(null); 

  const handleButtonClick = () => {
    // Validate Form Data
    const message = checkValidData(

      email.current.value,
      password.current.value,
      !isSignInForm ? name.current.value : null
    );
    seterrorMessage(message);
    if (message) return; // error encountered dont go ahead to make new user

    setIsLoading(true);

    // Sign In / Sign Up Logic
    if (!isSignInForm) {
      //SignUp logic
      createUserWithEmailAndPassword(
        auth,
        // name.current.value,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL:USER_AVATAR,
          })
            .then(() => {
              // Profile updated!
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              setIsLoading(false);
            })
            .catch((error) => {
              seterrorMessage(error.message);
              setIsLoading(false);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          seterrorMessage(errorCode + "-" + errorMessage);
          setIsLoading(false);
        });
    } else {
      //signIn Logic
      signInWithEmailAndPassword(
        auth,
        email.current.value, 
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          setIsLoading(false);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          seterrorMessage(errorCode + "-" + errorMessage);
          setIsLoading(false);
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          className="h-screen object-cover sm:h-auto"
          src={BGIMG}
          alt="bgimg"
        />
      </div>
      {isLoading && <Loader />}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute w-full md:w-3/12 p-12 bg-black my-40 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-70 bg-gradient-to-tr from-black"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            type="name"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-800 rounded-md"
          />
        )}
        <input
          ref={email}
          type="email"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-800 rounded-md"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full  bg-gray-800 rounded-md"
        />
        <p className="text-red-500 font-normal text-lg text-center px-16">
          {errorMessage}
        </p>
        <button
          className="p-4 my-6 bg-red-600 w-full rounded-md"
          onClick={handleButtonClick}
          disabled={isLoading}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p
          className="py-4 cursor-pointer text-center"
          onClick={toggleSignInForm}
        >
          {isSignInForm
            ? "New to Netflix? Sign Up Now." 
            : "Already registered? Sign in Now."}
        </p>
      </form>
    </div>
  );
};

export default Login;
