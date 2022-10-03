const getIsLoggedIn = state => state.auth.isLoggedIn;

const getUsername = state => state.auth.user;

const getToken = state => state.auth.token;

const getIsLogging = state => state.auth.isLogging;


const authSelectors = {
  getIsLoggedIn,
  getUsername,
  getToken,
  getIsLogging,
};
export default authSelectors;
