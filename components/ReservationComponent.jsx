import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Switch,
  Button,
  Modal,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Card, Icon } from "react-native-elements";
// import DatePicker from 'react-native-datepicker'
import DateTimePicker from "@react-native-community/datetimepicker";
import { Input } from "react-native-elements/dist/input/Input";
import moment from "moment";
export default function ReservationComponent() {
  const [state, setState] = useState({
    guests: 1,
    smoking: false,
    date: moment().format("DD/MM/YYYY @ HH:mm"),
  });
  const [modal, setmodal] = useState(false);

  const toggleModal = () => {
    setmodal(!modal);
  };
  const handleReservation = () => {
    setmodal(true);
    console.log(JSON.stringify(state));
    setState({
      guests: 1,
      smoking: false,
      date: state.date,
    });
  };

  return (
    <ScrollView>
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
          color="tomato"
          accessibilityLabel="Learn more about this purple button"
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

          <Button
            onPress={toggleModal}
            color="tomato"
            title="Close"
            style={{ borderRadius: 7 }}
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
