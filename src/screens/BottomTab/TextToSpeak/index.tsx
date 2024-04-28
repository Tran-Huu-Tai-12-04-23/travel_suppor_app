import ButtonCustom from '@components/ButtonCustom';
import { useAuth } from '@context/authContext';
import MainLayout from '@layout/MainLayout';
import React from 'react';
import { Text } from 'react-native';

function TextToSpeakScreen() {
   return (
      <MainLayout>
         <Text>TextToSpeakScreen</Text>
      </MainLayout>
   );
}

export default TextToSpeakScreen;
