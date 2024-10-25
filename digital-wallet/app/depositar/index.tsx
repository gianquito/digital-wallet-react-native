import { Link, router } from 'expo-router'
import { useState } from 'react'
import { Image, Text, TextInput, View } from 'react-native'
import ConfirmButton from '../../components/ConfirmButton'
import { depositar } from '../../services'
import { Toast } from 'toastify-react-native'

export default function DepositScreen() {
    const [amount, setAmount] = useState<string | undefined>(undefined)
    const [error, setError] = useState('')

    function handleConfirm(cantidad: string | undefined) {
        if (!cantidad) {
            setError('Cantidad inválida!')
            return
        }
        depositar(Number(cantidad.replaceAll('.', ''))).then((data) => {
            if (data.message === 'OK') {
                Toast.success('Se realizó el depósito con exito!')
                router.push('/')
                return
            }
            setError(data.message)
        })
    }

    return (
        <View className='flex flex-col w-full px-4 py-8 gap-2 bg-slate-50 h-full'>
            <Link href='/' style={{ height: 40, width: 40 }}>
                <Image
                    source={require('../../assets/arrow-left.png')}
                    className='w-8 h-8 mt-4'
                    style={{ height: 32, width: 32 }}
                />
            </Link>
            <Text className='text-2xl font-semibold' style={{ fontFamily: 'InterVariable' }}>
                ¿Cuánto quieres depositar?
            </Text>
            <View className='flex flex-row items-center gap-2 border-gray-400 border p-4 rounded-md'>
                <Text className='text-4xl fontmedium' style={{ fontFamily: 'InterVariable' }}>
                    $
                </Text>
                <TextInput
                    onChangeText={(txt) => setAmount(txt.replace(/[^0-9]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.'))}
                    value={amount}
                    style={{ fontFamily: 'InterVariable' }}
                    keyboardType='numeric'
                    placeholder='1.000'
                    className='border-none font-medium border w-60 rounded-md text-4xl outline-none placeholder:text-neutral-400 border-transparent'
                />
            </View>
            {error && (
                <Text className='text-red-500 font-semibold' style={{ fontFamily: 'InterVariable' }}>
                    {error}
                </Text>
            )}
            <ConfirmButton handlePress={() => handleConfirm(amount)} />
        </View>
    )
}
