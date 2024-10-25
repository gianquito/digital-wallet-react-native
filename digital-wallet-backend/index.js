import express from 'express'
import { createClient } from 'redis'
import CORS from 'cors'
import { nanoid } from 'nanoid'
import QRCode from 'qrcode'

const app = express()

app.use(CORS())

app.use(express.json());

async function connect_db() {
    const client = createClient({ url: 'redis://db-redis:6379' })
    try {
        await client.connect()
    } catch (err) {
        console.log('Error al conectarse a la base de datos ' + err)
    }
    return client
}


async function cargar_datos() {
    const client = await connect_db()
    const size = await client.dbSize()
    // if (size === 0) {
    client.set("saldo", 1500)
    client.del("transacciones")
    client.lPush("transacciones", ['{"id":1,"cantidad":500,"timestamp":1729840360078}', '{"id":2,"cantidad":-200,"timestamp":1729840384180}', '{"id":3,"cantidad":1000,"timestamp":1729840395762}'])
    // }
}

app.post('/deposito', async (req, res) => {
    try {
        const body = req.body;
        console.log(body)
        const client = await connect_db()

        await client.incrBy("saldo", body.cantidad)
        await client.lPush("transacciones", JSON.stringify({ id: nanoid(), cantidad: body.cantidad, timestamp: Date.now() }))


        res.status(200).send({ message: "OK" })
    } catch (err) {
        res.status(500).send({
            message: err,
        })
    }
});

app.post('/retiro', async (req, res) => {
    try {
        const body = req.body;

        const client = await connect_db()

        const saldo = await client.get("saldo")
        if (Number(saldo) >= body.cantidad) {
            await client.decrBy("saldo", body.cantidad)
            await client.lPush("transacciones", JSON.stringify({ id: nanoid(), cantidad: Number(body.cantidad) * -1, timestamp: Date.now() }))

            res.status(200).send({ message: "OK" })
        } else {
            res.status(400).send({
                message: 'Saldo insuficiente',
            })
        }
    } catch (err) {
        res.status(500).send({
            message: err,
        })
    }
});

app.post('/pagoQR', async (req, res) => {
    try {
        const body = req.body;

        const client = await connect_db()

        const pago = await client.get(body.id)

        if (pago) {
            const pagoData = JSON.parse(pago)
            const saldo = await client.get("saldo")
            console.log("saldo: " + saldo)
            console.log(pagoData)
            console.log("pago: " + pagoData.cantidad)
            if (Number(saldo) >= pagoData.cantidad) {
                await client.del(body.id)
                await client.decrBy("saldo", pagoData.cantidad)
                await client.lPush("transacciones", JSON.stringify({ id: body.id, cantidad: Number(pagoData.cantidad) * -1, timestamp: Date.now() }))

                res.status(200).send({ message: "OK" })
            } else {
                res.status(400).send({
                    message: 'Saldo insuficiente',
                })
            }
        } else {
            res.status(404).send({
                message: 'Este pago ya no existe',
            })
        }
    } catch (err) {
        res.status(500).send({
            message: err,
        })
    }
});

app.post('/crearPago', async (req, res) => {
    try {
        const body = req.body;

        const client = await connect_db()

        const pagoId = nanoid()
        const code = await QRCode.toDataURL(JSON.stringify({ cantidad: body.cantidad, id: pagoId }))
        await client.set(pagoId, JSON.stringify({ cantidad: body.cantidad, id: pagoId, code }))

        res.send({ message: "OK", cantidad: body.cantidad, id: pagoId, code })
    } catch (err) {
        res.status(500).send({
            message: err,
        })
    }
});

app.get('/pago', async (req, res) => {
    try {
        const client = await connect_db()

        const pago = await client.get(req.query.id)

        if (pago) {
            res.send({ message: "OK", pago: JSON.parse(pago) })
        } else {
            res.status(404).send({
                message: "El pago ya no existe",
            })
        }
    } catch (err) {
        res.status(500).send({
            message: err,
        })
    }
})


app.get('/saldo', async (req, res) => {
    try {
        const client = await connect_db()

        const saldo = await client.get("saldo")
        res.send({ saldo })
    } catch (err) {
        res.status(500).send({
            message: err,
        })
    }
})

app.get('/transactions', async (req, res) => {
    try {
        const client = await connect_db()
        const transacciones = await client.lRange("transacciones", 0, -1)
        res.send({ transacciones })
    } catch (err) {
        res.status(500).send({
            message: err,
        })
    }
})

app.listen(3000, async () => {
    console.log('Servidor corriendo en el puerto 3000')
    await cargar_datos()
})