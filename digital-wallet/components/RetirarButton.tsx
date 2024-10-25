import { Link } from 'expo-router'
import { Image, Pressable, Text } from 'react-native'

export default function RetirarButton() {
    return (
        <Link href='/retirar' asChild>
            <Pressable className='bg-red-500 py-2 rounded-md w-[48%] px-4 hover:bg-red-500/90 flex flex-row gap-2 justify-center items-center'>
                <Image
                    source={require('../assets/arrow-up-from-line.png')}
                    className='w-4 h-4'
                    style={{ height: 16, width: 16 }}
                />
                <Text style={{ fontFamily: 'InterVariable' }} className='text-white font-medium text-sm'>
                    Retirar
                </Text>
            </Pressable>
        </Link>
    )
}
