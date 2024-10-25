import { Text, View } from 'react-native'

export default function Operacion({
    type,
    amount,
    date,
}: {
    id: number
    type: 'deposit' | 'withdrawal'
    amount: number
    date: Date
}) {
    return (
        <View className='flex flex-row justify-between items-center border-b border-b-gray-200 py-2'>
            <Text
                style={{ fontFamily: 'InterVariable' }}
                className={type === 'deposit' ? 'text-green-600' : 'text-red-600'}
            >
                {type === 'deposit' ? '+' : '-'}${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
            </Text>
            <Text style={{ fontFamily: 'InterVariable' }} className='text-sm text-gray-500'>
                {date.getDate() + '/' + (date.getMonth() + 1) + ' ' + date.getHours() + ':' + date.getMinutes()}
            </Text>
        </View>
    )
}
