import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Navigation from './src/navigation/navigation';

const Stack = createStackNavigator()

export default function App() {
  return (
    <Navigation />
  );
}
