import React,{useState, useEffect} from 'react';
import {View, SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';

 import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
 import { AntDesign } from '@expo/vector-icons';
 import AsyncStorage from '@react-native-async-storage/async-storage';

 import axios from 'axios';

 import config from '../../../config';
 const {apiUrl} = config;


const UserProfil = ({navigation}) => {

  const [user, setUser] = useState([])

  const fetchData = async()=>{

    try{  
      let user = await AsyncStorage.getItem('user'); 
      // console.log(user); 
      let parsed = JSON.parse(user);  
      const id = parsed._id 
      setUser(parsed) 

    }  

    catch(error){  
      alert(error)  
    }
  
  }
  
  useEffect(()=>{
    fetchData();
  }, [])


  const  logOut = async()=> {
       
    const url = apiUrl + '/Epicier/logout'

      await axios.get(url)
      .then(response=>{

        AsyncStorage.removeItem('Usertoken');
        alert('Success logout')
        navigation.navigate('TypeUser')
      }).catch(err=>{
        console.log(err);
      })
  
  }



  return (
    <View style={styles.container}>

     <ScrollView >
     <View style={styles.userInfoSection}>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <Avatar.Image 
            source={{
              uri: 'https://api.adorable.io/avatars/80/abott@adorable.png',
            }}
            size={80}
          />
          {<View style={{marginLeft: 20}}>
            <Title style={[styles.title, {
              marginTop:15,
              marginBottom: 5,
              fontSize: 20
            }]}>{user.last_name} {user.first_name}</Title>
            <Caption style={styles.caption}>Magazin Othmane</Caption>
          </View>}
        </View>
      </View>

    {  <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon name="map-marker-radius" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>{user.address}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="phone" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>(+212){user.phone}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="email" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>{user.email}</Text>
        </View>
      </View>}

      <View style={styles.infoBoxWrapper}>
          <View style={[styles.infoBox, {
            borderRightColor: '#dddddd',
            borderRightWidth: 1
          }]}>
            <Title>2</Title>
            <Caption>Clients</Caption>
          </View>
          <View style={styles.infoBox}>
            <Title>######</Title>
            <Caption>#####</Caption>
          </View>
      </View>

      <View style={styles.menuWrapper}>
      
        <TouchableRipple onPress={() => navigation.navigate('Support')}>
          <View style={styles.menuItem}>
            <Icon name="account-check-outline" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Support</Text>
          </View>
        </TouchableRipple>

        <TouchableRipple onPress={() => {navigation.navigate('UserUpdate', {id : user._id})}}>
          <View style={styles.menuItem}>
            <AntDesign name="setting" size={24} color="#FF6347" />
            <Text style={styles.menuItemText}>Settings</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => logOut()}>
          <View style={styles.menuItem}>
            <AntDesign name="logout" size={24} color="#FF6347" />
            <Text style={styles.menuItemText}>LogOut</Text>
          </View>
        </TouchableRipple>
      </View>
     </ScrollView>
    </View>
  );
};

export default UserProfil;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 0,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
});