import { AsyncStorage } from "react-native";
import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import { navigate } from "../navigationRef";
import tracker from "../api/tracker";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signup":
      return { errorMessage: "", token: action.payload };
    case "signin":
      return { errorMessage: "", token: action.payload };
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    case "signout":
      return { token: null, errorMessage: "" };
    default:
      return state;
  }
};

const tryLocalSignin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    dispatch({ type: "signin", payload: token });
    navigate("TrackList");
  } else {
    navigate("Signup");
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "clear_error_message" });
};

const signup = (dispatch) => async ({ email, password }) => {
  // make api request to sign up with that email and password
  try {
    const response = await trackerApi.post("/signup", { email, password });
    //   console.log(response.data);
    await AsyncStorage.setItem("token", response.data.token);

    // if we sign up, modify our state, and say that we are authenticated
    dispatch({ type: "signup", payload: response.data.token });

    // navigate to main flow
    navigate("TrackList");
  } catch (err) {
    // if signing up fails, we probably need to reflect an error message somewhere
    dispatch({
      type: "add_error",
      payload: "Something went wrong with sign up",
    });
  }
};

const signin = (dispatch) => async ({ email, password }) => {
  // Try to sign in
  try {
    const response = await tracker.post("/signin", { email, password });
    await AsyncStorage.setItem("token", response.data.token);

    //Handle success by updating state
    dispatch({ type: "signin", payload: response.data.token });
    navigate("TrackList");
  } catch (err) {
    // Handle failure by showing error message
    dispatch({
      type: "add_error",
      payload: "Something went wrong with sign in",
    });
  }
};

const signout = (dispatch) => async () => {
  // somehow sign out!!!
  await AsyncStorage.removeItem("token");
  dispatch({
    type: "signout",
  });
  navigate("loginFlow");
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup, clearErrorMessage, tryLocalSignin },
  { token: null, errorMessage: "" }
);
