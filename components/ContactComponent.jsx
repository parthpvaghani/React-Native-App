import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { Card, Divider } from "react-native-elements";
import * as Animatable from "react-native-animatable";

export default function ContactComponent() {
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
              121, Clear Water Bay Road Clear Water Bay, Kowloon HONG KONG Tel:
              +852 1234 5678 Fax: +852 8765 4321 Email:confusion@food.net
            </Text>
          </View>
        </Card>
      </ScrollView>
    </View>
    </Animatable.View>
  );
}
