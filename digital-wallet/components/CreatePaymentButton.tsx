import { Link } from 'expo-router'
import { Image, Pressable, Text } from 'react-native'

export default function CreatePaymentButton() {
    return (
        <Link href='/solicitar' asChild>
            <Pressable className='py-2 rounded-md w-full mb-1 px-4 border hover:bg-neutral-200 border-neutral-300 flex flex-row gap-2 justify-center items-center'>
                <Image source={require('../assets/plus.png')} className='w-4 h-4' style={{ height: 16, width: 16 }} />
                <Text style={{ fontFamily: 'InterVariable' }} className='font-medium text-sm'>
                    Solicitar Pago
                </Text>
            </Pressable>
        </Link>
    )
}
