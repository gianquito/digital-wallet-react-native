import { Link, router, useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { Image, Text, TextInput, View } from 'react-native'
import ConfirmButton from '../../components/ConfirmButton'
import { depositar, getPago } from '../../services'

export default function PagoCreadoScreen() {
    const [pago, setPago] = useState<{ cantidad: number; id: string; code: string } | undefined>(undefined)
    const { id } = useLocalSearchParams<{ id: string }>()

    useEffect(() => {
        getPago(id).then((data) => setPago(data.pago))
    }, [])

    if (!pago) return <></>

    return (
        <View className='flex flex-col w-full px-4 py-8 gap-2 bg-slate-50 h-full'>
            <Link href='/'>
                <Image
                    source={require('../../assets/arrow-left.png')}
                    className='w-8 h-8'
                    style={{ height: 32, width: 32 }}
                />
            </Link>
            <View className='flex flex-col items-center'>
                <Text className='text-2xl font-semibold' style={{ fontFamily: 'InterVariable' }}>
                    Se creó el pago
                </Text>
                <Text className='text-2xl font-semibold' style={{ fontFamily: 'InterVariable' }}>
                    {id}
                </Text>
                <Text className='text-2xl font-semibold' style={{ fontFamily: 'InterVariable' }}>
                    por
                </Text>
                <Text className='text-2xl font-semibold mb-8' style={{ fontFamily: 'InterVariable' }}>
                    ${pago.cantidad.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                </Text>
                <Image source={{ uri: pago.code }} className='w-48 h-48' style={{ height: 192, width: 192 }} />
            </View>
        </View>
    )
}
