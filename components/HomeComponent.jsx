import React, { Component, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  Button,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { DISHES } from "../shared/dishes";
import { LEADERS } from "../shared/leaders";
import { PROMOTIONS } from "../shared/promotions";
import { Card } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { dishesFetching } from "../redux/actions/dishesAction";
import { promosFetching } from "../redux/actions/promosAction";
import { leadersFetching } from "../redux/actions/leadersAction";
import { commentsFetching } from "../redux/actions/commentsAction";
import { Chip } from "react-native-elements/dist/buttons/Chip";
import * as Animatable from "react-native-animatable";

function RenderItem({ featured }) {
  return (
    <Animatable.View animation="zoomIn" duration={750}>
      <Card containerStyle={{ marginTop: 10 }}>
        <Card.Title>{featured.data.name}</Card.Title>
        <Card.Divider />
        <Card.Image
          style={{ marginBottom: 10 }}
          source={{
            uri: featured.data.image,
          }}
        ></Card.Image>
        <Card.Divider />
        <Text style={{ marginTop: 10 }}>{featured.data.description}</Text>
        <Text style={{ marginTop: 10 }}>{featured.data.designation}</Text>
      </Card>
    </Animatable.View>
  );
}

export default function HomeComponent() {
  const dispatch = useDispatch();
  const store = useSelector((state) => ({
    dishes: state.dishes,
    comments: state.comments,
    leaders: state.leaders,
    promotions: state.promotions,
  }));

  useEffect(() => {
    dispatch(dishesFetching());
    dispatch(promosFetching());
    dispatch(leadersFetching());
    dispatch(commentsFetching());

    console.log(store);
  }, []);
  return (
    <View
      style={{
        marginBottom: 10,
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {!store.dishes.isLoading &&
      !store.leaders.isLoading &&
      !store.promotions.isLoading ? (
        <ScrollView>
          <Animatable.View animation="fadeInRight" duration={1000}>
            <Chip
              containerStyle={{
                marginLeft: 10,
                marginRight: 10,
                marginTop: 10,
              }}
              title="Featured Dish"
              icon={{
                name: "book-open",
                type: "feather",
                size: 20,
                color: "white",
              }}
            />
          </Animatable.View>
          <RenderItem
            featured={
              store.dishes.dishes.filter((dish) => dish.data.featured)[0]
            }
          />
          <Animatable.View animation="fadeInRight" duration={1000}>
            <Chip
              containerStyle={{
                marginLeft: 10,
                marginRight: 10,
                marginTop: 10,
              }}
              title="Featured Leader"
              icon={{
                name: "user",
                type: "feather",
                size: 20,
                color: "white",
              }}
            />
          </Animatable.View>
          <RenderItem
            featured={
              store.leaders.leaders.filter((leader) => leader.data.featured)[0]
            }
          />
          <Animatable.View animation="fadeInRight" duration={1000}>
            <Chip
              containerStyle={{
                marginLeft: 10,
                marginRight: 10,
                marginTop: 10,
              }}
              title="Featured Promo"
              icon={{
                name: "activity",
                type: "feather",
                size: 20,
                color: "white",
              }}
            />
          </Animatable.View>
          <RenderItem
            featured={
              store.promotions.promotions.filter(
                (promo) => promo.data.featured
              )[0]
            }
          />
        </ScrollView>
      ) : (
        <ActivityIndicator size="large" color="tomato" />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  horizontal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
