import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AddItemModal from './src/components/AddItemModal';
import DrawerNavigation from './src/navigation/DrawerNavigation';

export default function AppComponent() {
  return (
    <NavigationContainer>
      <AddItemModal />
      <DrawerNavigation />
    </NavigationContainer>
  );
}
