export const checkValidData = (email, password, name = null) => {
  // Fixed email regex (simplified and reliable)
  const isEmailValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);

  // Password validation
  const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);

  if (!isEmailValid) return "Email is invalid";
  if (!isPasswordValid) return "Password must be 8+ chars with 1 uppercase, 1 number";

  if (name !== null) {
    const isNameValid = /^[a-zA-Z\s-']+$/.test(name.trim());
    if (!isNameValid) return "Name can only contain letters and spaces";
  }

  return null;
};