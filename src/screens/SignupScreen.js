import React, { useContext, useEffect } from "react";
import { NavigationEvents } from "react-navigation";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-elements";
import Spacer from "./../components/Spacer";
import { Context as AuthContext } from "../context/AuthContext";
import AuthForm from "./../components/AuthForm";

const SignupScreen = ({ navigation }) => {
  const { state, signup, clearErrorMessage } = useContext(AuthContext);

  // useEffect(() => {
  //   tryLocalSignin();
  // }, []);

  return (
    <View style={styles.container}>
      <NavigationEvents
        // onWillFocus={() => {}}
        // onDidFocus={() => {}}
        onWillFocus={clearErrorMessage}
        // onDidBlur={() => {}}
      />
      <AuthForm
        headerText='Sign Up for Tracker'
        errorMessage={state.errorMessage}
        submitButtonText='Sign Up'
        onSubmit={signup}
      />
      <TouchableOpacity onPress={() => navigation.navigate("Signin")}>
        <Spacer>
          <Text style={styles.link}>
            Already have an account? Sign in instead
          </Text>
        </Spacer>
      </TouchableOpacity>
    </View>
  );
};

SignupScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 200,
  },

  link: {
    color: "blue",
  },
});

export default SignupScreen;
