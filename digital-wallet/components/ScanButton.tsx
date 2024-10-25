import { Image, Pressable, Text } from 'react-native'

export default function ScanButton({
    setIsScanning,
}: {
    setIsScanning: React.Dispatch<React.SetStateAction<boolean>>
}) {
    return (
        <Pressable
            onPress={() => setIsScanning(true)}
            className='py-2 rounded-md w-full mb-4 px-4 border hover:bg-neutral-200 border-neutral-300 flex flex-row gap-2 justify-center items-center'
        >
            <Image source={require('../assets/qr-code.png')} className='w-4 h-4' style={{ height: 16, width: 16 }} />
            <Text style={{ fontFamily: 'InterVariable' }} className='font-medium text-sm'>
                Escanear QR
            </Text>
        </Pressable>
    )
}
