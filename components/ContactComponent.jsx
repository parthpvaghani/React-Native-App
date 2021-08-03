import React, { useEffect, useContext } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { Card, Divider,Button,Icon } from "react-native-elements";
import * as Animatable from "react-native-animatable";
import * as MailComposer from 'expo-mail-composer';
export default function ContactComponent() {


  const sendMail =()=> {
    MailComposer.composeAsync({
      recipients: ['parthvaghani14@gmail.com'],
        subject: 'Enquiry @ Restaurant',
        body: 'To whom it may concern:'
    })
}

  return (
    <Animatable.View animation="fadeInDown" duration={2000} delay={500}>
      <View style={{ marginBottom: 10 }}>
        <ScrollView>
          <Card>
            <Card.Title>Contact Us @ Address</Card.Title>
            <Divider
              orientation="horizontal"
              width={1}
              style={{ marginBottom: 15 }}
            />
            <View style={{ display: "flex", flexDirection: "column" }}>
              <Text style={{ marginBottom: 15 }}>
                121, Clear Water Bay Road Clear Water Bay, Kowloon HONG KONG
                Tel: +852 1234 5678 Fax: +852 8765 4321 Email:confusion@food.net
              </Text>
              <Button
                        title="Send Email"
                        buttonStyle={{backgroundColor: "tomato"}}
                        icon={<Icon name='envelope-o' type='font-awesome' color='white' />}
                        onPress={sendMail}
                        />
            </View>
          </Card>
        </ScrollView>
      </View>
    </Animatable.View>
  );
}
