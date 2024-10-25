import { Image, Pressable, Text } from 'react-native'

export default function ConfirmButton({ handlePress }: { handlePress: () => void }) {
    return (
        <Pressable
            onPress={() => handlePress()}
            className='bg-black py-3 rounded-md w-full px-2 hover:bg-neutral-800 flex flex-row gap-2 justify-center items-center'
        >
            <Image source={require('../assets/check.png')} className='w-5 h-5' style={{ height: 20, width: 20 }} />
            <Text style={{ fontFamily: 'InterVariable' }} className='text-white font-medium text-lg'>
                Confirmar
            </Text>
        </Pressable>
    )
}
