import React, { useRef, useState } from "react";
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
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    // Validate Form Data
    const message = checkValidData(
      email.current.value,
      password.current.value,
      !isSignInForm ? name.current.value : null
    );
    setErrorMessage(message);
    if (message) return;

    setIsLoading(true);

    // Sign In / Sign Up Logic
    if (!isSignInForm) {
      // SignUp logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
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
              setErrorMessage(error.message);
              setIsLoading(false);
            });
        })
        .catch((error) => {
          setErrorMessage(error.code + " - " + error.message);
          setIsLoading(false);
        });
    } else {
      // SignIn Logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then(() => {
          setIsLoading(false);
        })
        .catch((error) => {
          setErrorMessage(error.code + " - " + error.message);
          setIsLoading(false);
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
    setErrorMessage(null);
    setShowPassword(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleButtonClick();
    }
  };

  return (
    <div className="min-h-screen relative">
      <Header />
      
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 -z-10">
        <img
          className="h-full w-full object-cover"
          src={BGIMG}
          alt="Background"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black"></div>
      </div>

      {/* Loader Overlay */}
      {isLoading && <Loader />}

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 py-8 sm:py-12">
        {/* Login Form Container */}
        <div 
          className="w-full max-w-md bg-black/80 backdrop-blur-sm rounded-xl border border-gray-800 shadow-2xl overflow-hidden"
          onKeyPress={handleKeyPress}
        >
          {/* Form Header */}
          <div className="p-6 sm:p-8 text-center border-b border-gray-800">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              {isSignInForm ? "Welcome Back" : "Join FilmOracle"}
            </h1>
            <p className="text-gray-400 text-sm sm:text-base">
              {isSignInForm 
                ? "Sign in to continue your cinematic journey" 
                : "Create an account for personalized recommendations"}
            </p>
          </div>

          {/* Form Body */}
          <form onSubmit={(e) => e.preventDefault()} className="p-6 sm:p-8">
            {!isSignInForm && (
              <div className="mb-4">
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Full Name
                </label>
                <input
                  ref={name}
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all"
                  disabled={isLoading}
                />
              </div>
            )}

            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                ref={email}
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all"
                disabled={isLoading}
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  ref={password}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all pr-12"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Must be at least 6 characters
              </p>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="mb-6 p-3 bg-red-900/30 border border-red-800 rounded-lg">
                <p className="text-red-400 text-sm text-center">{errorMessage}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleButtonClick}
              disabled={isLoading}
              className="w-full py-3.5 bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>{isSignInForm ? "Sign In" : "Create Account"}</span>
                  <span>→</span>
                </>
              )}
            </button>

            {/* Toggle Form */}
            <div className="mt-6 pt-6 border-t border-gray-800 text-center">
              <p className="text-gray-400">
                {isSignInForm ? "New to FilmOracle?" : "Already have an account?"}
                <button
                  type="button"
                  onClick={toggleSignInForm}
                  className="ml-2 text-red-400 hover:text-red-300 font-medium transition-colors"
                  disabled={isLoading}
                >
                  {isSignInForm ? "Sign up now" : "Sign in"}
                </button>
              </p>
            </div>

            {/* Quick Demo Info */}
            <div className="mt-6 p-3 bg-gray-900/50 rounded-lg border border-gray-800">
              <p className="text-xs text-gray-400 text-center">
                <span className="font-medium">Demo:</span> Use ubanto@gmail.com / Ubanto1234@
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Footer Note */}
      <div className="absolute bottom-4 left-0 right-0 text-center">
        <p className="text-gray-500 text-sm">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Login;