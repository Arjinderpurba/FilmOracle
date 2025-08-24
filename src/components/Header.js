import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch)

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        // An error happened.
        Navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // user sign in
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        //redirect to browse page
        Navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        //redirect to login page
        Navigate("/");
      }
    });

    // Unsubscribe when component unmounts
    return () => unsubscribe();
  }, []);

  const handleGptSearchClick = () => {
    // Toggle GPT Search
    dispatch(toggleGptSearchView());
  };

  const handleLanguagechange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between">
      <img className="w-36 mx-auto md:mx-0" src={LOGO} alt="logo" />
      {user && (
        <div className="flex p-2">
          {showGptSearch && <select
            className="p-2 m-2 bg-gray-900 text-white"
            onChange={handleLanguagechange}
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.identifier} value={lang.identifier}>
                {lang.name}
              </option>
            ))}
          </select>}
          <button
            className="py-2 px-4 bg-blue-700 text-white font-bold rounded-l-md "
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? "Home Page" : "GPT Search"}
          </button>
          <img className="w-12 h-12" alt="usericon" src={user?.photoURL}></img>
          <button
            onClick={handleSignOut}
            className="font-bold text-white py-2 px-4 bg-blue-700 rounded-r-md"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
