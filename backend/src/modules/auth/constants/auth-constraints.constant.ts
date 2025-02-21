export const AUTH_CONSTRAINTS = {
  PASSWORD: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 32,
    REGEX:
      // allow only alphanumeric characters, symbols, and special characters
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,32}$/,
  },
  FIRST_NAME: {
    MIN_LENGTH: 1,
    MAX_LENGTH: 32,
    // allow only letters
    REGEX: /^[a-zA-Z]{3,32}$/,
  },
  LAST_NAME: {
    MIN_LENGTH: 1,
    MAX_LENGTH: 32,
    // allow only letters
    REGEX: /^[a-zA-Z]{3,32}$/,
  },
};
