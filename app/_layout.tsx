import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://60cf2a287eed3cf5842be228bd06c2d3@o4509724046131200.ingest.us.sentry.io/4509755090993152',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

import "./global.css";
import useAuthStore from "@/store/auth.store"; // If you're using Tailwind or other CSS-in-JS solutions

export default Sentry.wrap(function RootLayout() {
  const { isLoading, fetchAuthenticatedUser } = useAuthStore();
  // Load custom fonts
  const [fontsLoaded, error] = useFonts({
    "QuickSand-Bold": require("../assets/fonts/Quicksand-Bold.ttf"),
    "QuickSand-Medium": require("../assets/fonts/Quicksand-Medium.ttf"),
    "QuickSand-Regular": require("../assets/fonts/Quicksand-Regular.ttf"),
    "QuickSand-SemiBold": require("../assets/fonts/Quicksand-SemiBold.ttf"),
    "QuickSand-Light": require("../assets/fonts/Quicksand-Light.ttf"),
  });

  // Hide the splash screen once fonts are loaded
  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  useEffect(() => {
    fetchAuthenticatedUser()
  }, []);
  if(!fontsLoaded || isLoading ) return null;

  // Don't render until fonts are loaded
  if (!fontsLoaded) {
    return null;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
});