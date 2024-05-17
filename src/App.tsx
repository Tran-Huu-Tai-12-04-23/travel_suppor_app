import "react-native-gesture-handler";
import "expo-dev-client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { useLoadedAssets } from "./hooks/useLoadedAssets";
import Navigation from "./navigation";
import React, { useEffect } from "react";
import { AuthProvider } from "@context/authContext";
import { PaperProvider } from "react-native-paper";
import { LoadingProvider } from "@context/loadingGlobalContext";
import { KeyboardAvoidingView, Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ModalProvider from "@context/ModalContext";
import BottomSheetProvider from "@context/BottomSheetContext";
import { AlertNotificationRoot } from "react-native-alert-notification";
import * as Updates from "expo-updates";
import { UserLocationProvider } from "@context/userLocationContext";
const queryClient = new QueryClient();

export default function App() {
  const isLoadingComplete = useLoadedAssets();
  useEffect(() => {
    const checkForUpdates = async () => {
      try {
        const update = await Updates.checkForUpdateAsync();

        if (update.isAvailable) {
          await Updates.fetchUpdateAsync();
          await Updates.reloadAsync();
        }
      } catch (error) {
        console.error("Error checking for updates:", error);
      }
    };

    checkForUpdates();
  }, []);
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
                    <UserLocationProvider>
                      <ModalProvider>
                        <KeyboardAvoidingView
                          style={{ flex: 1 }}
                          behavior={
                            Platform.OS === "ios" ? "padding" : "height"
                          }
                        >
                          <SafeAreaProvider>
                            <StatusBar style="dark" />
                            <Navigation />
                          </SafeAreaProvider>
                        </KeyboardAvoidingView>
                      </ModalProvider>
                    </UserLocationProvider>
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
