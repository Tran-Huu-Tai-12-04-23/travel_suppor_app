import 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useLoadedAssets } from './hooks/useLoadedAssets';
import Navigation from './navigation';
import React from 'react';
import { AuthProvider } from '@context/authContext';
import { PaperProvider } from 'react-native-paper';
import { LoadingProvider } from '@context/loadingGlobalContext';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ModalProvider from '@context/ModalContext';
import BottomSheetProvider from '@context/BottomSheetContext';
import { AlertNotificationRoot } from 'react-native-alert-notification';
const queryClient = new QueryClient();
export default function App() {
   const isLoadingComplete = useLoadedAssets();

   if (!isLoadingComplete) {
      return null;
   } else {
      return (
         <QueryClientProvider client={queryClient}>
            <AlertNotificationRoot>
               <GestureHandlerRootView style={{ flex: 1 }}>
                  <PaperProvider>
                     <LoadingProvider>
                        <BottomSheetProvider>
                           <AuthProvider>
                              <ModalProvider>
                                 <KeyboardAvoidingView
                                    style={{ flex: 1 }}
                                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                                 >
                                    <SafeAreaProvider>
                                       <Navigation />
                                       <StatusBar />
                                    </SafeAreaProvider>
                                 </KeyboardAvoidingView>
                              </ModalProvider>
                           </AuthProvider>
                        </BottomSheetProvider>
                     </LoadingProvider>
                  </PaperProvider>
               </GestureHandlerRootView>
            </AlertNotificationRoot>
         </QueryClientProvider>
      );
   }
}
