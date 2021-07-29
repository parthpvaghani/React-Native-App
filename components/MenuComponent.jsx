import React, { useEffect, useState } from "react";
import { StyleSheet,ActivityIndicator } from "react-native";
import { View, Text, FlatList } from "react-native";
import { ListItem } from "react-native-elements";
import { Avatar } from "react-native-elements/dist/avatar/Avatar";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { DISHES } from "../shared/dishes";
import { useSelector, useDispatch } from "react-redux";
import { dishesFetching } from "../redux/actions/dishesAction";
import { Button } from "react-native-elements";
import * as Animatable from "react-native-animatable";

export default function MenuComponent({ navigation }) {
  

  const store = useSelector((state) => ({
    dishes: state.dishes,
    comments: state.comments,
    leaders: state.leaders,
    promotions: state.promotions,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(dishesFetching());
  }, []);

  const renderMenuItem = ({ item, index }) => {
    return (
      <Animatable.View animation="fadeInDown" duration={500}>

      <ListItem
        key={index}
        bottomDivider
        onPress={() =>
          navigation.navigate("Dishdetail", { dishId: item.docid })
        }
      >
        <Avatar
          source={{
            uri: item.data.image,
          }}
        />
        <ListItem.Title>{item.data.name}</ListItem.Title>
      </ListItem>
      </Animatable.View>
    );
  };
  return (
    <View style={styles.container}>
      {store.dishes.dishes.length?  (
        <FlatList
          data={store.dishes.dishes}
          renderItem={renderMenuItem}
          keyExtractor={(item) => item.data.id.toString()}
        />
      )
    :
    <View style={styles.horizontal}>
    <ActivityIndicator size="large" color="tomato"  />
    </View>
    }
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  horizontal: {
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  }
});
