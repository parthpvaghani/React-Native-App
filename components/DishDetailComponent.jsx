import React, { useState, useRef } from "react";
import { Rating, AirbnbRating, Input } from "react-native-elements";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  Modal,
  Alert,
  PanResponder,
} from "react-native";
import { Card, ListItem, Button, Icon } from "react-native-elements";
import { DISHES } from "../shared/dishes";
import { COMMENTS } from "../shared/comments";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import firebase from "firebase";
import { commentsFetching } from "../redux/actions/commentsAction";
import * as Animatable from "react-native-animatable";
import {
  dishesFetching,
  fetchDishes,
  deleteFavorite,
  addFavorite,
} from "../redux/actions/dishesAction";
// import Modal from 'react-native-modal';
function RenderComments(props) {
  const comments = props.comments;
  console.log("commets array", comments);
  const renderCommentItem = ({ item, index }) => {
    return (
      <SafeAreaView>
        <Animatable.View animation="fadeInRightBig" duration={1000}>
          <ListItem>
            <View
              key={index}
              style={{
                margin: 10,
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                flexDirection: "column",
              }}
            >
              <View>
                <Text style={{ fontSize: 14 }}>{item.data.comment}</Text>
                <Text style={{ fontSize: 12 }}>
                  {"-- " + item.data.author + ", " + item.data.date}{" "}
                </Text>
              </View>
              <AirbnbRating
                count={5}
                isDisabled
                reviews={["Terrible", "Bad", "Average", "OK", "Good"]}
                defaultRating={item.data.rating}
                size={10}
              />
            </View>
          </ListItem>
        </Animatable.View>
      </SafeAreaView>
    );
  };

  return (
    <SafeAreaView>
      <Card title="Comments">
        <FlatList
          data={comments}
          renderItem={renderCommentItem}
          keyExtractor={(item) => item.data.id.toString()}
        />
      </Card>
    </SafeAreaView>
  );
}

function RenderDish({ dishes, dishId, onPress, toggleModal, setDoc }) {
  let staticimage = "../components/images/uthappizza.png";

  let dish = dishes.filter((dish) => dish.docid == dishId)[0];

  const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
    if (dx < -200) return true;
    else return false;
  };

  const recognizeComment = ({ moveX, moveY, dx, dy }) => {
    if (dx > 200) return true;
    else return false;
  };

  const viewRef = useRef(null);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (e, gestureState) => {
      return true;
    },
    onPanResponderGrant: () => {
      if (viewRef) {
        viewRef.current
          .bounce(1000)
          .then((endState) =>
            console.log(endState.finished ? "finished" : "cancelled")
          );
      }
    },

    onPanResponderEnd: (e, gestureState) => {
      console.log("pan responder end", gestureState.dx);
      if (recognizeDrag(gestureState))
        Alert.alert(
          "Add Favorite",
          "Are you sure you wish to add " + dish.data.name + " to favorite?",
          [
            {
              text: "No",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            {
              text: "Yes",
              onPress: () => {
                dish.data.favorite
                  ? console.log("Already favorite")
                  : onPress(dish.docid, "favorite");
              },
            },
          ],
          { cancelable: false }
        );

      if (recognizeComment(gestureState)) {
        setDoc(dishId);
      }
      return true;
    },
  });
  return (
    <Animatable.View
      animation="fadeInDown"
      duration={1000}
      ref={viewRef}
      {...panResponder.panHandlers}
    >
      <>
        {Object.keys(dish).length ? (
          <Card>
            <Card.Title>{dish.data.name}</Card.Title>

            <Card.Divider />
            <Card.Image
              style={{ marginBottom: 10 }}
              source={{
                uri: dish.data.image,
              }}
            ></Card.Image>
            <Card.Divider />
            <Text style={{ marginTop: 10 }}>{dish.data.description}</Text>
            <View
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
              }}
            >
              <Icon
                raised
                reverse
                name={dish.data.favorite ? "heart" : "heart-o"}
                type="font-awesome"
                color="#f50"
                onPress={() =>
                  dish.data.favorite
                    ? onPress(dish.docid, "notfavorite")
                    : onPress(dish.docid, "favorite")
                }
              />
              <Icon
                raised
                reverse
                name="edit"
                type="font-awesome"
                color="grey"
                onPress={() => setDoc(dishId)}
              />
            </View>
          </Card>
        ) : (
          <Text>''</Text>
        )}
      </>
    </Animatable.View>
  );
}

export default function DishDetailComponent({ route, navigation }) {
  const [comments, setComments] = useState(COMMENTS);
  const [isModalVisible, setModalVisible] = useState(false);
  const [docid, setDocid] = useState(null);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const setDoc = (id) => {
    setModalVisible(!isModalVisible);
    setDocid(id);
  };
  const { dishId } = route.params;
  const dispatch = useDispatch();
  const store = useSelector((state) => ({
    dishes: state.dishes,
    comments: state.comments,
    leaders: state.leaders,
    promotions: state.promotions,
  }));
  const onPress = (id, flag) => {
    if (flag == "favorite") {
      dispatch(addFavorite(id));
    } else if (flag == "notfavorite") {
      dispatch(deleteFavorite(id));
    }
  };

  return (
    <View
      style={{
        marginBottom: 10,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {store.dishes.dishes.length > 0 ? (
        <RenderDish
          dishes={store.dishes.dishes}
          dishId={dishId}
          onPress={onPress}
          toggleModal={toggleModal}
          setDoc={setDoc}
        />
      ) : (
        <ActivityIndicator size="large" color="tomato" />
      )}
      {store.comments.comments.filter(
        (comment) => comment.data.dishId == dishId
      ).length > 0 &&
        store.dishes.dishes.length > 0 && (
          <ScrollView style={{ marginTop: 5 }}>
            <RenderComments
              comments={store.comments.comments.filter(
                (comment) => comment.data.dishId == dishId
              )}
            />
          </ScrollView>
        )}
      <AddCommentModal
        isModalVisible={isModalVisible}
        toggleModal={toggleModal}
        docid={docid}
      />
    </View>
  );
}

function AddCommentModal({ isModalVisible, toggleModal, docid }) {
  const [author, setAuthor] = useState(null);
  const [comment, setComment] = useState(null);
  const [rating, setRating] = useState(5);
  const dispatch = useDispatch();
  const addComment = () => {
    let docRef = firebase.firestore().collection("comments").doc();
    docRef
      .set({
        author: author,
        comment: comment,
        date: new Date().toLocaleString(),
        id: docRef.id,
        rating: rating,
        dishId: docid,
      })
      .then((res) => {
        dispatch(commentsFetching());
        toggleModal();
      });
  };
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Input
              placeholder="Author Name"
              value={author}
              leftIcon={{ type: "font-awesome", name: "user" }}
              onChangeText={(value) => setAuthor(value)}
            />
            <Input
              placeholder="Comment"
              value={comment}
              leftIcon={{ type: "font-awesome", name: "comment" }}
              onChangeText={(value) => setComment(value)}
            />
            <AirbnbRating
              count={5}
              reviews={["Terrible", "Bad", "Average", "OK", "Good"]}
              defaultRating={rating}
              size={20}
              onFinishRating={(value) => setRating(value)}
            />
            <Button
              title="Add Comment"
              onPress={addComment}
              containerStyle={{ width: "100%", marginTop: 10 }}
            />
          </View>
        </View>
      </Modal>
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
  modalView: {
    width: "100%",
    margin: 50,
    backgroundColor: "whitesmoke",
    borderRadius: 10,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 22,
  },
});
