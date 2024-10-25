import { FlatList, StyleSheet, Text, View } from 'react-native'
import '../global.css'
import { useEffect, useState } from 'react'
import RetirarButton from '../components/RetirarButton'
import DepositarButton from '../components/DepositarButton'
import Operacion from '../components/Operacion'
import ScanButton from '../components/ScanButton'
import { Camera, CameraView } from 'expo-camera'
import { depositar, getPago, getSaldo, getTransactions, realizarPagoQR, retirar } from '../services'
import CreatePaymentButton from '../components/CreatePaymentButton'
import { Toast } from 'toastify-react-native'

export default function App() {
    const [transactions, setTransactions] = useState<{ id: number; cantidad: number; timestamp: string }[]>()

    const [isScanning, setIsScanning] = useState(false)
    const [hasPermission, setHasPermission] = useState(false)

    const [saldo, setSaldo] = useState<number | undefined>(undefined)
    // const onLayoutRootView = useCallback(async () => {

    // }, [fontsLoaded])

    useEffect(() => {
        const getCameraPermissions = async () => {
            const { status } = await Camera.requestCameraPermissionsAsync()
            setHasPermission(status === 'granted')
        }

        getCameraPermissions()

        getSaldo().then((s) => setSaldo(s))
        getTransactions().then((t) => setTransactions(t))
    }, [])

    const handleQrScanned = ({ type, data }) => {
        setIsScanning(false)
        const codeData = JSON.parse(data)
        realizarPagoQR(codeData.id).then((pagoData) => {
            if (pagoData.message === 'OK') {
                getSaldo().then((s) => setSaldo(s))
                getTransactions().then((t) => setTransactions(t))
                Toast.success('Se realizó el pago con exito!')
                return
            }
            Toast.error(`Error en el pago: ${pagoData.message}`)
        })
    }

    if (isScanning) {
        return (
            <CameraView
                onBarcodeScanned={handleQrScanned}
                barcodeScannerSettings={{
                    barcodeTypes: ['qr'],
                }}
                style={StyleSheet.absoluteFillObject}
            />
        )
    }

    return (
        <View className='flex flex-row justify-center w-full bg-slate-50 h-full'>
            <View className='px-4 py-14 w-96'>
                <View className='mb-4'>
                    <Text style={{ fontFamily: 'InterVariable' }} className='text-xl font-semibold mb-1'>
                        Saldo actual
                    </Text>
                    <Text style={{ fontFamily: 'InterVariable' }} className='text-4xl font-bold'>
                        ${saldo !== undefined ? saldo.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') : ''}
                    </Text>
                </View>
                <View className='flex flex-row justify-between gap-2 mb-1'>
                    <DepositarButton />
                    <RetirarButton />
                </View>
                <CreatePaymentButton />
                <ScanButton setIsScanning={setIsScanning} />
                <View>
                    <Text style={{ fontFamily: 'InterVariable' }} className='text-xl font-semibold mb-2'>
                        Transacciones recientes
                    </Text>
                    <FlatList
                        data={transactions}
                        renderItem={({ item }) => (
                            <Operacion
                                amount={Math.abs(item.cantidad)}
                                date={new Date(item.timestamp)}
                                type={item.cantidad >= 0 ? 'deposit' : 'withdrawal'}
                                id={item.id}
                            />
                        )}
                        keyExtractor={(item) => item.id}
                    />
                </View>
            </View>
        </View>
    )
}
