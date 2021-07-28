import React from "react";
import { View, Text, Image,ScrollView } from "react-native";
import { Card, Divider } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { LEADERS } from "../shared/leaders";


export default function AboutComponent() {
  let staticimage = "../components/images/uthappizza.png";
  const dispatch = useDispatch();
  const store = useSelector((state) => ({
    dishes: state.dishes,
    comments: state.comments,
    leaders: state.leaders,
    promotions: state.promotions,
  }));
  return (
    
    <View style={{marginBottom:10}}>
        <ScrollView>
      <Card>
        <Card.Title>Our History</Card.Title>
        <Divider
          orientation="horizontal"
          width={1}
          style={{ marginBottom: 15 }}
        />
        <View style={{ display: "flex", flexDirection: "column" }}>
          <Text style={{ marginBottom: 15 }}>
            Started in 2010, Ristorante con Fusion quickly established itself as
            a culinary icon par excellence in Hong Kong. With its unique brand
            of world fusion cuisine that can be found nowhere else, it enjoys
            patronage from the A-list clientele in Hong Kong. Featuring four of
            the best three-star Michelin chefs in the world, you never know what
            will arrive on your plate the next time you visit us.
          </Text>

          <Text>
            The restaurant traces its humble beginnings to The Frying Pan, a
            successful chain started by our CEO, Mr. Peter Pan, that featured
            for the first time the world's best cuisines in a pan.
          </Text>
        </View>
      </Card>
      <Card style={{marginBottom:15}}>
        <Card.Title>Corporate Leadership</Card.Title>
        <Divider
          orientation="horizontal"
          width={1}
          style={{ marginBottom: 15 }}
        />
        {store.leaders.leaders.map((leader, i) => {
          return (
            <View key={i} style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
              <Image
                style={{borderRadius:50,width:50,height:50,margin:10}}
                resizeMode="cover"
                source={{
                  uri: leader.data.image,
                }}
              />
              <View style={{flexDirection:'column',width:250,margin:10}}>
              <Text style={{marginBottom:10,fontStyle:'italic',fontWeight:'bold'}}>{leader.data.name}</Text>
              <Text>{leader.data.description}</Text>
              </View>
            </View>
          );
        })}
      </Card>
      </ScrollView>
    </View>
  );
}
