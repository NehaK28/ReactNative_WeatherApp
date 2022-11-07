 import React from 'react';
 import { NavigationContainer } from '@react-navigation/native';
 import { createNativeStackNavigator } from '@react-navigation/native-stack';
 import Home from './components/Home';
import CountryInfo from './components/CountryInfo';
import WeatherInfo from './components/WeatherInfo';

 
 
 
 const Stack = createNativeStackNavigator();
 
 const App = () => {
   return (
     <NavigationContainer>
       <Stack.Navigator initialRouteName='Home'>
         <Stack.Screen name="Home" component={Home} />
         <Stack.Screen name="CountryInfo" component={CountryInfo} />
         <Stack.Screen name="WeatherInfo" component={WeatherInfo} />
       </Stack.Navigator>
     </NavigationContainer>
   );
 };
 
 
 
 export default App;
 