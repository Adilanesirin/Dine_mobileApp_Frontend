// app/_layout.tsx
import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from "react";
import CustomSplashScreen from "./components/SplashScreen";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        // You can add any initialization logic here
        
        // Simulate some loading time (remove this in production)
        await new Promise(resolve => setTimeout(resolve, 1000));
        
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onSplashFinish = () => {
    setShowSplash(false);
  };

  if (!appIsReady || showSplash) {
    return <CustomSplashScreen onFinish={onSplashFinish} />;
  }

  return (
    <Stack 
      screenOptions={{ 
        headerShown: false,
        animation: 'fade' // Add smooth transition after splash
      }}
    />
  );
}