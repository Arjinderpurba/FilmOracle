import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const currentLang = useSelector((store) => store.config.lang);

  // State for controlling header visibility
  const [isVisible, setIsVisible] = useState(true);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate]);

  // Scroll effect
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          if (currentScrollY < 100 || currentScrollY < lastScrollY) {
            setIsVisible(true);
          } 
          else if (currentScrollY > lastScrollY && currentScrollY > 100) {
            setIsVisible(false);
          }
          
          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full px-4 sm:px-6 md:px-8 py-2 md:py-3 bg-gradient-to-b from-black via-black/95 to-transparent z-50 flex flex-col md:flex-row justify-between items-center transition-all duration-300 ease-out ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      {/* Logo */}
      <div className="flex-shrink-0 mb-2 md:mb-0">
        <img
          className="w-28 h-auto sm:w-32 md:w-36 lg:w-40 cursor-pointer transition-transform duration-200 hover:scale-105"
          src={LOGO}
          alt="FilmOracle Logo"
          onClick={() => navigate("/browse")}
        />
      </div>

      {user && (
        <div className="flex flex-wrap justify-center md:justify-end items-center gap-2 sm:gap-3 w-full md:w-auto">
          {/* Language Selector - ONLY shows on GPT Search page */}
          {showGptSearch && (
            <div className="relative">
              <select
                value={currentLang}
                onChange={handleLanguageChange}
                className="appearance-none pl-4 pr-10 py-2 bg-gray-900/80 backdrop-blur-sm text-white font-medium rounded-lg text-sm border border-gray-700 hover:border-gray-600 transition-all focus:outline-none focus:ring-2 focus:ring-red-600 cursor-pointer"
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.identifier} value={lang.identifier}>
                    {lang.name}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          )}

          {/* GPT Search Button */}
          <button
            className="py-2 px-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white font-semibold rounded-lg hover:from-gray-800 hover:to-gray-700 transition-all duration-200 text-sm border border-gray-700 hover:border-gray-600 active:scale-95 whitespace-nowrap flex items-center gap-2"
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="hidden sm:inline">Home</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="hidden sm:inline">AI Search</span>
              </>
            )}
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            <img
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-gray-700 object-cover hover:border-red-600 transition-colors"
              alt="User Profile"
              src={user?.photoURL || "https://api.dicebear.com/7.x/avataaars/svg?seed=" + user?.email}
              onError={(e) => {
                e.target.src = "https://api.dicebear.com/7.x/avataaars/svg?seed=" + user?.email;
              }}
            />
            
            {/* Sign Out Button */}
            <button
              onClick={handleSignOut}
              className="py-2 px-4 bg-gradient-to-r from-red-700 to-red-600 text-white font-semibold rounded-lg hover:from-red-600 hover:to-red-500 transition-all duration-200 text-sm border border-red-800 hover:border-red-700 active:scale-95 whitespace-nowrap flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;