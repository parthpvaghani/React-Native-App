import React, { useState, useEffect } from "react";
import { StyleSheet, ActivityIndicator, Alert } from "react-native";
import { View, Text, FlatList } from "react-native";
import { ListItem } from "react-native-elements";
import { Avatar } from "react-native-elements/dist/avatar/Avatar";
import { useSelector, useDispatch } from "react-redux";
import { dishesFetching } from "../redux/actions/dishesAction";
import { deleteFavorite } from "../redux/actions/dishesAction";
import Swipeout from "react-native-swipeout";
import * as Animatable from "react-native-animatable";

export default function FavoriteComponent({ navigation }) {
  const store = useSelector((state) => ({
    dishes: state.dishes,
    comments: state.comments,
    leaders: state.leaders,
    promotions: state.promotions,
  }));
  const dispatch = useDispatch();

  const [favoriteDishes, setFavoriteDish] = useState([]);

  useEffect(() => {
    setFavoriteDish(store.dishes.dishes.filter((dish) => dish.data.favorite));
  }, [store.dishes]);

  const renderMenuItem = ({ item, index }) => {
    const swipeoutBtns = [
      {
        text: "Delete",
        type: "delete",
        onPress: () => {
          Alert.alert(
            "Delete Favorite?",
            "Are you sure you wish to delete the favorite dish " +
              item.name +
              "?",
            [
              {
                text: "Cancel",
                style: " cancel",
              },
              {
                text: "OK",
                onPress: () => dispatch(deleteFavorite(item.docid)),
              },
            ],
            { cancelable: false }
          );
        },
      },
    ];
    return (
      <Animatable.View animation="fadeInRightBig" duration={1000}>
      <Swipeout right={swipeoutBtns} autoClose={true}>
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
      </Swipeout>
      </Animatable.View>
    );
  };
  return (
    <View style={styles.container}>
      {store.dishes.dishes.length > 0 ? (
        <FlatList
          data={favoriteDishes}
          renderItem={renderMenuItem}
          keyExtractor={(item) => item.data.id.toString()}
        />
      ) : (
        <View style={styles.horizontal}>
          <ActivityIndicator size="large" color="tomato" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  horizontal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
