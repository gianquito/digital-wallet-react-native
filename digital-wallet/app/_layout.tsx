import { useFonts } from 'expo-font'
import { Slot, SplashScreen } from 'expo-router'
import { useEffect } from 'react'
import Container from 'toastify-react-native'

SplashScreen.preventAutoHideAsync() // Prevent splash screen from auto-hiding
export default function Layout() {
    const [fontsLoaded] = useFonts({
        InterVariable: require('../assets/fonts/Inter-VariableFont.ttf'), // Load the variable font
    })
    useEffect(() => {
        async function hideSplashScreen() {
            if (fontsLoaded) {
                await SplashScreen.hideAsync() // Hide splash screen when fonts are loaded
            }
        }
        hideSplashScreen()
    }, [fontsLoaded])
    if (!fontsLoaded) {
        return null // Render nothing while fonts are loading
    }
    return (
        <>
            <Container position='top' textStyle={{ fontSize: 12 }} duration={6000} />
            <Slot />
        </>
    )
}
