export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  export const validatePassword = (password) => {
    return password.length >= 6; // Password must be at least 6 characters
  };

  export const validateName = (name) => {
    // Name should not start with a number
    return !/^\d/.test(name);
  };