import React, { Component, Fragment, useEffect, useState,useContext } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
  Text,
  ActivityIndicator
} from "react-native";
import { Button } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import * as Yup from "yup";
import HideWithKeyboard from "react-native-hide-with-keyboard";
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";
import ErrorMessage from "../components/ErrorMessage";
import firebase from "firebase";
import { AuthContext } from "../Auth/Auth";
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label("Email")
    .email("Enter a valid email")
    .required("Please enter a registered email"),
  password: Yup.string()
    .label("Password")
    .required()
    .min(4, "Password must have more than 4 characters "),
});

export default function LoginComponent({ route, navigation }) {
  const { currentUser,changeStatusOfCurrentUser,authLoader } = useContext(AuthContext);

  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState("ios-eye");

  const goToSignup = () => navigation.navigate("Register");

  const handleSubmit = (values) => {
    if (values.email.length > 0 && values.password.length > 0) {
      firebase
        .auth()
        .signInWithEmailAndPassword(values.email, values.password)
        .then((userCredential) => {
          const user = userCredential.user;
        //   navigation.navigate("Home");
        })
        .catch((error) => {
          const errorMessage = error.message;
          alert(errorMessage);
        });
    }
  };

  const handlePasswordVisibility = () => {
    if (rightIcon === "ios-eye") {
      setRightIcon("ios-eye-off");
    } else {
      setRightIcon("ios-eye");
    }
    setPasswordVisibility(!passwordVisibility);
  };

  return (
    <SafeAreaView style={styles.container}>
      {
 authLoader?
 <View style={styles.horizontal}>
    <ActivityIndicator size="large" color="tomato"  />
    <Text>Signing in...</Text>
    </View>
 :
 <>
 <HideWithKeyboard style={styles.logoContainer}>
   <Image
     source={require("../assets/icon.png")}
     style={{
       borderRadius: 20,
       width: 150,
       height: 150,
       margin: 10,
     }}
   />
 </HideWithKeyboard>
 <Formik
   initialValues={{ email: "", password: "" }}
   onSubmit={(values) => {
     handleSubmit(values);
   }}
   validationSchema={validationSchema}
 >
   {({
     handleChange,
     values,
     handleSubmit,
     errors,
     isValid,
     touched,
     handleBlur,
     isSubmitting,
   }) => (
     <Fragment>
       <FormInput
         name="email"
         value={values.email}
         onChangeText={handleChange("email")}
         placeholder="Enter email"
         autoCapitalize="none"
         iconName="ios-mail"
         iconColor="#2C384A"
         onBlur={handleBlur("email")}
       />
       <ErrorMessage errorValue={touched.email && errors.email} />
       <FormInput
         name="password"
         value={values.password}
         onChangeText={handleChange("password")}
         placeholder="Enter password"
         secureTextEntry={passwordVisibility}
         iconName="ios-lock-closed"
         iconColor="#2C384A"
         onBlur={handleBlur("password")}
         rightIcon={
           <TouchableOpacity onPress={handlePasswordVisibility}>
             <Ionicons name={rightIcon} size={28} color="grey" />
           </TouchableOpacity>
         }
       />
       <ErrorMessage errorValue={touched.password && errors.password} />
       <View style={styles.buttonContainer}>
         <FormButton
           buttonType="outline"
           onPress={handleSubmit}
           title="LOGIN"
           buttonColor="#039BE5"
           // disabled={!isValid || isSubmitting}
          //  loading={isSubmitting}
         />
       </View>
     </Fragment>
   )}
 </Formik>
 {/* <Button
   title="Don't have an account? Sign Up"
   onPress={goToSignup}
   titleStyle={{
     color: "#F57C00",
   }}
   type="clear"
 /> */}
 </>
    }
     
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: StatusBar.currentHeight,
  },
  logoContainer: {
    marginBottom: 15,
    alignItems: "center",
  },
  buttonContainer: {
    margin: 25,
  },
  horizontal: {
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  }
});
