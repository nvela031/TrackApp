import React, { useContext } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { NavigationEvents } from "react-navigation";
import AuthForm from "./../components/AuthForm";
import { Text } from "react-native-elements";
import { Context as AuthContext } from "../context/AuthContext";
import Spacer from "./../components/Spacer";

const SigninScreen = ({ navigation }) => {
  const { state, signin, clearErrorMessage } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <NavigationEvents
        // onWillFocus={() => {}}
        // onDidFocus={() => {}}
        onWillFocus={clearErrorMessage}
        // onDidBlur={() => {}}
      />
      <AuthForm
        headerText='Sign In for Tracker'
        errorMessage={state.errorMessage}
        submitButtonText='Sign In'
        onSubmit={signin}
      />
      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Spacer>
          <Text style={styles.link}>
            Don't have an account? Sign Up instead
          </Text>
        </Spacer>
      </TouchableOpacity>
    </View>
  );
};

SigninScreen.navigationOptions = () => {
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

export default SigninScreen;
