import React, { Component, Fragment, useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  StatusBar,
  Image,
  Text,
  Platform,
} from "react-native";
import { Button, CheckBox, Avatar } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import * as Yup from "yup";
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";
import storage from "@react-native-firebase/storage";
import ErrorMessage from "../components/ErrorMessage";
import firebase from "firebase";
import { ScrollView } from "react-native";
import { decode, encode } from "base-64";
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .label("Name")
    .required()
    .min(2, "Must have at least 2 characters"),
  email: Yup.string()
    .label("Email")
    .email("Enter a valid email")
    .required("Please enter a registered email"),
  password: Yup.string()
    .label("Password")
    .required()
    .min(4, "Password must have more than 4 characters "),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Confirm Password must matched Password")
    .required("Confirm Password is required"),
  check: Yup.boolean().oneOf([true], "Please check the agreement"),
});

export default function RegisterComponent({ route, navigation }) {
  const [image, setImage] = useState(
    "https://cdn2.iconfinder.com/data/icons/avatars-99/62/avatar-370-456322-512.png"
  );
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] =
    useState(true);
  const [passwordIcon, setPasswordIcon] = useState("ios-eye");
  const [confirmPasswordIcon, setConfirmPasswordIcon] = useState("ios-eye");

  const goToLogin = () => navigation.navigate("Login");

  const handleSubmit = (values) => {
    if (values.email.length > 0 && values.password.length > 0) {
      handleOnSignup(values);
    }
  };

  const createNewUser = async (userData) => {
    let url = await uploadImage(image)
    userData.url = url
      firebase
        .firestore()
        .collection("users")
        .doc(`${userData.uid}`)
        .set(userData);
  };


  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    } else {
      setImage(
        "https://cdn2.iconfinder.com/data/icons/avatars-99/62/avatar-370-456322-512.png"
      );
    }
  };

  const uploadImage = async (uri) => {
    return new Promise(async (res,rej)=>{

      const response = await fetch(uri);
      const blob = await response.blob();
      var ref = firebase.storage().ref().child("my-image");
      var uploadTask = ref.put(blob);

    uploadTask.on(
      "state_changed",
      (snapshot) => {   var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log("Upload is paused");
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
         res(downloadURL)
        });
      }
    );
    })
  

  };

  const handleOnSignup = async (values) => {
    const { name, email, password } = values;

    try {
      const response = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      if (response.user.uid) {
        const { uid } = response.user;
        const userData = { email, name, uid };
        createNewUser(userData);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handlePasswordVisibility = () => {
    if (passwordIcon === "ios-eye") {
      setPasswordIcon("ios-eye-off");
    } else {
      setPasswordIcon("ios-eye");
    }
    setPasswordVisibility(!passwordVisibility);
  };

  handleConfirmPasswordVisibility = () => {
    if (confirmPasswordIcon === "ios-eye") {
      setConfirmPasswordIcon("ios-eye-off");
    } else {
      setConfirmPasswordIcon("ios-eye");
    }
    setConfirmPasswordVisibility(!confirmPasswordVisibility);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            check: false,
          }}
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
            setFieldValue,
          }) => (
            <Fragment>
              <Avatar
                source={{
                  uri: image,
                }}
                onPress={pickImage}
                rounded
                containerStyle={{
                  width: 100,
                  height: 100,
                  alignSelf: "center",
                  marginTop: 10,
                }}
              >
                <Avatar.Accessory size={25} />
              </Avatar>
              <FormInput
                name="name"
                value={values.name}
                onChangeText={handleChange("name")}
                placeholder="Enter your full name"
                iconName="md-person"
                iconColor="#2C384A"
                onBlur={handleBlur("name")}
              />
              <ErrorMessage errorValue={touched.name && errors.name} />
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
                iconName="ios-lock-closed"
                iconColor="#2C384A"
                onBlur={handleBlur("password")}
                secureTextEntry={passwordVisibility}
                rightIcon={
                  <TouchableOpacity onPress={handlePasswordVisibility}>
                    <Ionicons name={passwordIcon} size={28} color="grey" />
                  </TouchableOpacity>
                }
              />
              <ErrorMessage errorValue={touched.password && errors.password} />
              <FormInput
                name="password"
                value={values.confirmPassword}
                onChangeText={handleChange("confirmPassword")}
                placeholder="Confirm password"
                iconName="ios-lock-closed"
                iconColor="#2C384A"
                onBlur={handleBlur("confirmPassword")}
                secureTextEntry={confirmPasswordVisibility}
                rightIcon={
                  <TouchableOpacity onPress={handleConfirmPasswordVisibility}>
                    <Ionicons
                      name={confirmPasswordIcon}
                      size={28}
                      color="grey"
                    />
                  </TouchableOpacity>
                }
              />
              <ErrorMessage
                errorValue={touched.confirmPassword && errors.confirmPassword}
              />
              <CheckBox
                containerStyle={styles.checkBoxContainer}
                checkedIcon="check-box"
                iconType="material"
                uncheckedIcon="check-box-outline-blank"
                title="Agree to terms and conditions"
                checkedTitle="You agreed to our terms and conditions"
                checked={values.check}
                onPress={() => setFieldValue("check", !values.check)}
              />
              <View style={styles.buttonContainer}>
                <FormButton
                  buttonType="outline"
                  onPress={handleSubmit}
                  title="SIGNUP"
                  buttonColor="#F57C00"
                  // disabled={!isValid || isSubmitting}
                  // loading={isSubmitting}
                />
              </View>
            </Fragment>
          )}
        </Formik>

        {/* <Button
        title="Have an account? Login"
        onPress={goToLogin}
        titleStyle={{
          color: "#039BE5",
        }}
        type="clear"
      /> */}
      </ScrollView>
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
  checkBoxContainer: {
    backgroundColor: "#fff",
    borderColor: "#fff",
  },
});
