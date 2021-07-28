import React, { Component } from "react";
import { Text, View, Platform, StyleSheet, Image } from "react-native";
import { Icon } from "react-native-elements";
import { DISHES } from "../shared/dishes";
import Menu from "../components/MenuComponent";
import DishDetailComponent from "./DishDetailComponent";
import Home from "../components/HomeComponent";
import { NavigationContainer,CommonActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator,DrawerItemList,DrawerContentScrollView} from "@react-navigation/drawer";
import AboutComponent from "./AboutComponent";
import ContactComponent from "./ContactComponent";
import ReservationComponent from "./ReservationComponent";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function MenuStackNavigator({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="Menu"
      screenOptions={{
        headerTintColor: "white",
        headerStyle: { backgroundColor: "tomato" },
        headerLeft: () => (
          <Icon
            name="menu"
            size={35}
            color="#ffffff"
            iconStyle={{ marginLeft: 10 }}
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    >
      <Stack.Screen
        name="Menu"
        component={Menu}
        options={{ title: "Menu Dishes" }}
      />
      <Stack.Screen name="Dishdetail" component={DishDetailComponent} options={{
        headerLeft: () => (
          <Icon
            name="arrow-left"
            type="feather"
            size={35}
            color="#ffffff"
            iconStyle={{ marginLeft: 10 }}
            onPress={() => {
              navigation.dispatch(
                CommonActions.reset({
                  // index: 0,
                  routes: [
                    { name: 'Menu' }
                  ],
                })
              );}
            
            }
          />
        ),
      }}/>
    </Stack.Navigator>
  );
}

function AboutStackNavigator({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="About"
      screenOptions={{
        headerTintColor: "white",
        headerStyle: { backgroundColor: "tomato" },
        headerLeft: () => (
          <Icon
            name="menu"
            size={35}
            color="#ffffff"
            iconStyle={{ marginLeft: 10 }}
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    >
      <Stack.Screen
        name="Menu"
        component={AboutComponent}
        options={{ title: "About Us" }}
      />
      <Stack.Screen name="About" component={AboutComponent} />
    </Stack.Navigator>
  );
}


function ReservationStackNavigator({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="Reservation"
      screenOptions={{
        headerTintColor: "white",
        headerStyle: { backgroundColor: "tomato" },
        headerLeft: () => (
          <Icon
            name="menu"
            size={35}
            color="#ffffff"
            iconStyle={{ marginLeft: 10 }}
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    >
      <Stack.Screen
        name="Menu"
        component={ReservationComponent}
        options={{ title: "Table Reservation" }}
      />
      <Stack.Screen name="Reservation" component={ReservationComponent} />
    </Stack.Navigator>
  );
}

function ContactStackNavigator({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="Contact"
      screenOptions={{
        headerTintColor: "white",
        headerStyle: { backgroundColor: "tomato" },
        headerLeft: () => (
          <Icon
            name="menu"
            size={35}
            color="#ffffff"
            iconStyle={{ marginLeft: 10 }}
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    >
      <Stack.Screen
        name="Menu"
        component={ContactComponent}
        options={{ title: "Contact Us" }}
      />
      <Stack.Screen name="Contact" component={ContactComponent} />
    </Stack.Navigator>
  );
}

function MainDrawerNavigator(props) {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          drawerIcon: (config) => <Icon size={23} name="home"></Icon>,
        }}
      />
      <Drawer.Screen
        name="Menu"
        component={MenuStackNavigator}
        options={{
          title: "Menu",
          drawerIcon: (config) => (
            <Icon size={23} type="feather" name="disc"></Icon>
          ),
        }}
      />
         <Drawer.Screen
        name="Reservation"
        component={ReservationStackNavigator}
        options={{
          drawerIcon: (config) => (
            <Icon size={23} type="feather" name="bookmark"></Icon>
          ),
        }}
      />
      <Drawer.Screen
        name="About"
        component={AboutStackNavigator}
        options={{
          drawerIcon: (config) => (
            <Icon size={23} type="feather" name="info"></Icon>
          ),
        }}
      />
      <Drawer.Screen
        name="Contact"
        component={ContactStackNavigator}
        options={{
          drawerIcon: (config) => (
            <Icon size={23} type="feather" name="phone-call"></Icon>
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <View style={{ flex: 1 }}>
          <Image
            source={require("./images/logo.png")}
            style={styles.drawerImage}
          />
        </View>
        <View style={{ flex: 2 }}>
          <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
        </View>
      </View>
      <DrawerItemList {...props}/>
    </DrawerContentScrollView>
  );
}

function HomeStackNavigator({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTintColor: "white",
        headerStyle: { backgroundColor: "tomato" },
        headerLeft: () => (
          <Icon
            name="menu"
            size={35}
            color="#ffffff"
            iconStyle={{ marginLeft: 10 }}
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    >
      <Stack.Screen name="Home" component={Home} options={{ title: "Home" }} />
    </Stack.Navigator>
  );
}

export default class MainComponent extends Component {
  render() {
    return (
      <NavigationContainer>
        <MainDrawerNavigator />
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: "tomato",
    height: 140,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
  },
  drawerHeaderText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60,
  },
});
