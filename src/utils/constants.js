export const LOGO =
  "https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2025-07-01/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png";

export const USER_AVATAR ="https://i.pinimg.com/736x/54/c6/1c/54c61cf7a35db1d073a60ffe1f8c7e79.jpg";
  // "https://i.namu.wiki/i/roVsJIOXbX6rn_99QO9XPuvWI1HArqKewRKkfQlpdTDryx2iq00SlrLYtpTMsYQdSFzaxrVAKo0RDCPWsAJejvXRoDCtzrwe6w9Zjz3mXWX62-j3jsrUXzl4aJVvSQCFHz0-95O3PbxyBgN0WDWhyvVdf1_SeD3CDujs6ffxPVo.webp";

//"https://i.pinimg.com/736x/54/c6/1c/54c61cf7a35db1d073a60ffe1f8c7e79.jpg";

export const BGIMG =
  "https://assets.nflxext.com/ffe/siteui/vlv3/05e91faa-6f6d-4325-934e-5418dcc2567b/web/IN-en-20250630-TRIFECTA-perspective_159086b1-425f-435b-bcd5-1ed8039cdef9_large.jpg";

export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer " + process.env.REACT_APP_TMDB_KEY,
  },
};
 
export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w500";

export const SUPPORTED_LANGUAGES = [
  { identifier: "en", name: "English" },
  { identifier: "punjabi", name: "ਪੰਜਾਬੀ" },
  { identifier: "hindi", name: "हिन्दी" },
  { identifier: "spanish", name: "Española" },
];