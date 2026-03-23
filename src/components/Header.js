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

  // State for controlling header visibility
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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

  // Scroll effect - optimized
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          // Show header at top or when scrolling up
          if (currentScrollY < 100 || currentScrollY < lastScrollY) {
            setIsVisible(true);
          } 
          // Hide when scrolling down past threshold
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
      {/* Logo - Responsive sizing */}
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
          {/* Language Selector - Responsive */}
          {showGptSearch && (
            <select
              className="py-1.5 sm:py-2 px-3 sm:px-4 bg-gray-900/90 backdrop-blur-sm text-white font-semibold rounded-lg text-sm sm:text-base border border-gray-700 hover:border-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-600"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}

          {/* GPT Search Button - Responsive */}
          <button
            className="py-1.5 sm:py-2 px-3 sm:px-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white font-semibold rounded-lg hover:from-gray-800 hover:to-gray-700 transition-all duration-200 text-sm sm:text-base border border-gray-700 hover:border-gray-600 active:scale-95 whitespace-nowrap"
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? (
              <span className="flex items-center gap-1.5">
                <span>🏠</span>
                <span className="hidden sm:inline">Home</span>
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <span>🤖</span>
                <span className="hidden sm:inline">GPT Search</span>
                <span className="sm:hidden">GPT</span>
              </span>
            )}
          </button>

          {/* User Profile - Responsive */}
          <div className="flex items-center gap-2 sm:gap-3">
            <img
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full border-2 border-gray-700 object-cover hover:border-red-600 transition-colors"
              alt="User Profile"
              src={user?.photoURL || "https://api.dicebear.com/7.x/avataaars/svg?seed=" + user?.email}
              onError={(e) => {
                e.target.src = "https://api.dicebear.com/7.x/avataaars/svg?seed=" + user?.email;
              }}
            />
            
            {/* Sign Out Button - Responsive */}
            <button
              onClick={handleSignOut}
              className="py-1.5 sm:py-2 px-3 sm:px-4 bg-gradient-to-r from-red-700 to-red-600 text-white font-semibold rounded-lg hover:from-red-600 hover:to-red-500 transition-all duration-200 text-sm sm:text-base border border-red-800 hover:border-red-700 active:scale-95 whitespace-nowrap"
            >
              <span className="flex items-center gap-1.5">
                <span className="hidden sm:inline">Sign Out</span>
                <span className="sm:hidden">Logout</span>
                <span>→</span>
              </span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;