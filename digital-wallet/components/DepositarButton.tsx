import { Link } from 'expo-router'
import { Image, Pressable, Text } from 'react-native'

export default function DepositarButton() {
    return (
        <Link href='/depositar' asChild>
            <Pressable className='bg-green-500 py-2 rounded-md w-[48%] px-4 hover:bg-green-500/90 flex flex-row gap-2 justify-center items-center'>
                <Image
                    source={require('../assets/arrow-down-to-line.png')}
                    className='w-4 h-4'
                    style={{ height: 16, width: 16 }}
                />
                <Text style={{ fontFamily: 'InterVariable' }} className='text-white font-medium text-sm'>
                    Depositar
                </Text>
            </Pressable>
        </Link>
    )
}
