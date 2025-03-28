const readline = require('readline')
const fs = require('fs')
const yargs = require('yargs')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const preguntas = (pregunta) => {
    return new Promise((resolve) => {
        rl.question(pregunta, (respuesta) => {
            resolve(respuesta)
        })
    })
}

const pidiendoDatos = async() => {
    try{
        const argv = yargs.command('archivoJson', 'para pedir nombre de archivo json',{
            file: {
                describe: 'nombre del archivo json',
                default: 'default.json',
                demandOption: true,
                type: 'string'
            }
        })
        .help()
        .argv

        const producto = await preguntas('¿Cual es el nombre del producto?: ')
        const precio = await preguntas('¿Cual es el precio del producto?: ')
        const cantidad = await preguntas('¿Dime la cantidad de unidades del producto: ')

        const dataJson = {
            "producto": producto,
            "precio": precio,
            "cantidad": cantidad
        }


        if(argv.file !== "default.json"){
            const arrayJsons = []
            arrayJsons.push(dataJson)
            fs.writeFileSync(argv.file, JSON.stringify(arrayJsons, null, 2))
        }else{
            const arrayJsons = []
            arrayJsons.push(dataJson)
            fs.writeFileSync('./productos.json', JSON.stringify(arrayJsons, null, 2))
        }

        const contenidoArchivo = fs.readFileSync(argv.file, 'utf-8')

        console.log("Contenido del archivo json:\n" + contenidoArchivo)
        
    }catch(error){
        console.log("Hubo el siguiente error: ", error)
    }finally{
        rl.close()
    }
}

pidiendoDatos()