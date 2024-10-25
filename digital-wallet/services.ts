export async function getSaldo() {
    const req = await fetch('http://192.168.1.12:3000/saldo')
    const data = await req.json()
    return Number(data.saldo)
}

export async function depositar(cantidad: number) {
    const req = await fetch('http://192.168.1.12:3000/deposito', {
        method: 'POST',
        body: JSON.stringify({ cantidad }),
        headers: {
            'Content-Type': 'application/json',
        },
    })

    const data = await req.json()
    return data
}

export async function retirar(cantidad: number) {
    const req = await fetch('http://192.168.1.12:3000/retiro', {
        method: 'POST',
        body: JSON.stringify({ cantidad }),
        headers: {
            'Content-Type': 'application/json',
        },
    })

    const data = await req.json()
    return data
}

export async function getTransactions() {
    const req = await fetch('http://192.168.1.12:3000/transactions')
    const data = await req.json()
    return data.transacciones.map((t) => JSON.parse(t))
}

export async function crearPago(cantidad: number) {
    const req = await fetch('http://192.168.1.12:3000/crearPago', {
        method: 'POST',
        body: JSON.stringify({ cantidad }),
        headers: {
            'Content-Type': 'application/json',
        },
    })

    const data = await req.json()
    return data
}

export async function getPago(id: string) {
    const req = await fetch(`http://192.168.1.12:3000/pago?id=${id}`)
    const data = await req.json()
    return data
}

export async function realizarPagoQR(id: string) {
    const req = await fetch('http://192.168.1.12:3000/pagoQR', {
        method: 'POST',
        body: JSON.stringify({ id }),
        headers: {
            'Content-Type': 'application/json',
        },
    })

    const data = await req.json()
    return data
}
