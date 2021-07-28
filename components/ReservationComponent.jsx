import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Switch,
  Modal,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Card, Icon,Button } from "react-native-elements";
// import DatePicker from 'react-native-datepicker'
import DateTimePicker from "@react-native-community/datetimepicker";
import { Input } from "react-native-elements/dist/input/Input";
import moment from "moment";
import firebase from "firebase";
export default function ReservationComponent() {
  const [state, setState] = useState({
    guests: 1,
    smoking: false,
    date: moment().format("DD/MM/YYYY @ HH:mm"),
    name:'',
    contact:'',
  });
  const [modal, setmodal] = useState(false);

  const toggleModal = () => {
    setmodal(!modal);
  };
  const handleReservation = () => {
    setmodal(true);
    console.log(JSON.stringify(state));
    setState({
      guests: state.guests,
      smoking: state.smoking,
      date: state.date,
      name:state.name,
      contact:state.contact
    });
  };

  return (
    <ScrollView>
      <View style={styles.formRow}>
        <Input
          placeholder="Enter Your Name"
          value={state.name}
          leftIcon={{ type: "feather", name: "user" }}
          onChangeText={(value) =>
            setState({
              ...state,
              name: value,
            })
          }
        />
      </View>
      <View style={styles.formRow}>
        <Input
          placeholder="Enter Your Contact"
          value={state.contact}
          leftIcon={{ type: "feather", name: "phone" }}
          onChangeText={(value) =>
            setState({
              ...state,
              contact: value,
            })
          }
        />
      </View>
      <View style={styles.formRow}>
        <Text style={styles.formLabel}>Number of Guests</Text>
        <View style={{ flex: 1 }}>
          <Picker
            style={styles.formItem}
            selectedValue={state.guests}
            onValueChange={(itemValue, itemIndex) =>
              setState({ ...state, guests: itemValue })
            }
          >
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value="3" />
            <Picker.Item label="4" value="4" />
            <Picker.Item label="5" value="5" />
            <Picker.Item label="6" value="6" />
          </Picker>
        </View>
      </View>
      <View style={styles.formRow}>
        <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
        <Switch
          style={styles.formItem}
          value={state.smoking}
          onTintColor="tomato"
          onValueChange={(value) => setState({ ...state, smoking: value })}
        ></Switch>
      </View>

      <View style={styles.formRow}>
        <Input
          placeholder="Date & Time: DD/MM/YYYY @ HH:MM "
          value={state.date}
          leftIcon={{ type: "feather", name: "clock" }}
          onChangeText={(value) =>
            setState({
              ...state,
              date: value,
            })
          }
          onFocus={() => {
            setState({
              ...state,
              date: moment().format("DD/MM/YYYY @ HH:mm"),
            });
          }}
        />
      </View>

      <View style={styles.formRow}>
        <Button
          onPress={() => handleReservation()}
          title="Reserve"
          containerStyle={{width:'100%',backgroundColor:'tomato'}}
        />
      </View>
      <Modal
        animationType={"slide"}
        transparent={false}
        visible={modal}
        onDismiss={toggleModal}
        onRequestClose={toggleModal}
      >
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>Your Reservation</Text>
          <Text style={styles.modalText}>Number of Guests: {state.guests}</Text>
          <Text style={styles.modalText}>
            Smoking?: {state.smoking ? "Yes" : "No"}
          </Text>
          <Text style={styles.modalText}>Date and Time: {state.date}</Text>
          <Text style={styles.modalText}>Name: {state.name}</Text>
          <Text style={styles.modalText}>Contact: {state.contact}</Text>
          <Button
            containerStyle={{ borderRadius: 7,width:'100%' }}
            onPress={() => {
              firebase
                .firestore()
                .collection("reservations")
                .add({
                  guests: state.guests,
                  smoking: state.smoking,
                  date: state.date,
                  name:state.name,
                  contact:state.contact
                })
                .then((res) => {
                  alert("Reservation Done Successfully");
                  toggleModal();
                });
            }}
            color="tomato"
            title="Submit"
            
          />
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  formRow: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    margin: 20,
  },
  formLabel: {
    fontSize: 18,
    flex: 2,
    marginLeft:10
  },
  formItem: {
    flex: 1,
  },
  modal: {
    justifyContent: "center",
    margin: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    backgroundColor: "tomato",
    textAlign: "center",
    color: "white",
    marginBottom: 20,
    borderRadius: 7,
  },
  modalText: {
    fontSize: 18,
    margin: 10,
  },
});
