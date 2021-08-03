import React, { Component,useContext,useEffect } from "react";
import { Text, View, Platform, StyleSheet, Image, ToastAndroid } from "react-native";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Icon } from "react-native-elements";
import { DISHES } from "../shared/dishes";
import Menu from "../components/MenuComponent";
import FavoriteComponent from "../components/FavoriteComponent";
import DishDetailComponent from "./DishDetailComponent";
import Home from "../components/HomeComponent";
import { NavigationContainer, CommonActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import firebase from "firebase";
import { AuthContext } from "../Auth/Auth";
import NetInfo from "@react-native-community/netinfo";
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import AboutComponent from "./AboutComponent";
import ContactComponent from "./ContactComponent";
import ReservationComponent from "./ReservationComponent";
import LoginComponent from "./LoginComponent";
import RegisterComponent from "./RegisterComponent";




const Tab = createMaterialBottomTabNavigator();
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
      <Stack.Screen
        name="Dishdetail"
        component={DishDetailComponent}
        options={{
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
                    routes: [{ name: "Menu" }],
                  })
                );
              }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function FavoriteStackNavigator({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="Favoritedish"
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
        name="Favoritedish"
        component={FavoriteComponent}
        options={{ title: "Favorite Dishes" }}
      />
      <Stack.Screen
        name="Dishdetail"
        component={DishDetailComponent}
        options={{
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
                    routes: [{ name: "Favoritedish" }],
                  })
                );
              }}
            />
          ),
        }}
      />
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

function CustomDrawerContent(props) {
  const { currentUser,changeStatusOfCurrentUser } = useContext(AuthContext);

  return (
    <DrawerContentScrollView {...props}>
      <View style={{flex:1,display:'flex',height:'100%'}}>
      <View style={styles.drawerHeader}>
        <View style={{ flex: 1 }}>
          <Image
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/restaurante-confusion-fac90.appspot.com/o/icon.png?alt=media&token=db231a4f-56f9-4393-8564-c78be1b3164c",
            }}
            style={styles.drawerImage}
          />
        </View>
        <View style={{ flex: 2 }}>
          <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
        </View>
      </View>
      
      <DrawerItemList {...props} />
      <Text onPress={()=>{
        firebase.auth().signOut().then(res=>{
          changeStatusOfCurrentUser()
        })
      }} style={{width:'80%',textAlign:'center',alignSelf:'center',justifyContent:'center',backgroundColor:'tomato',color:'white',padding:5,margin:5,borderRadius:10}}>Log Out</Text>
   </View>
    </DrawerContentScrollView>
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
        name="Favorites"
        component={FavoriteStackNavigator}
        options={{
          title: "Favorite Dishes",
          drawerIcon: (config) => (
            <Icon size={23} type="feather" name="heart"></Icon>
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

function AuthStackNavigator({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown:false
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginComponent}
      />
      <Stack.Screen name="Register" component={RegisterComponent} />
    </Stack.Navigator>
  );
}



function MyAuthTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Login"
      activeColor="white"
      labelStyle={{ fontSize: 12 }}
      
    >
      <Tab.Screen
        name="Login"
        component={LoginComponent}
        options={{
          tabBarLabel: 'Sign In',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="lock" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Register"
        component={RegisterComponent}
        options={{
          tabBarLabel: 'Sign Up',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="book" color={color} size={26} />
          ),
        }}
      />
     
    </Tab.Navigator>
  );
}

export default function MainComponent() {
  const { currentUser,changeStatusOfCurrentUser } = useContext(AuthContext);
  useEffect(() => {
  
        NetInfo.fetch().then(connectionInfo => {
          ToastAndroid.show('Initial Network Connectivity Type: '
          + connectionInfo.type + ', Connection: ' + connectionInfo.isConnected,
          ToastAndroid.LONG)
        });

    const unsubscribe  = NetInfo.addEventListener(state => handleConnectivityChange(state));
    return () => {
      unsubscribe()
    }
  }, [])

  const handleConnectivityChange = (connectionInfo) => {
    switch (connectionInfo.type) {
      case 'none':
        ToastAndroid.show('You are now offline!', ToastAndroid.LONG);
        break;
      case 'wifi':
        ToastAndroid.show('You are now connected to WiFi!', ToastAndroid.LONG);
        break;
      case 'cellular':
        ToastAndroid.show('You are now connected to Cellular!', ToastAndroid.LONG);
        break;
      case 'unknown':
        ToastAndroid.show('You now have unknown connection!', ToastAndroid.LONG);
        break;
      default:
        break;
    }
  }
 
  return (
    <NavigationContainer>
      {
        currentUser ?
        <MainDrawerNavigator/>
        :
        <MyAuthTabs/>
        
      }

    </NavigationContainer>
  );
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
    height: 80,
    borderRadius: 10,
  },
});
