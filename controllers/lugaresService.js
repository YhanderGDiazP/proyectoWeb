const lugaresDAO = require('../models/lugaresDAO')

const getAllLugares = (req, res)=> {
    lugaresDAO.getAllLugares(data => {
        try{
            console.log('Data =>',data)
            if(!data) throw new Err("No hay usuario")
            res.send({
                status: true, data: data
            })
        }
        catch (Err){
            console.log('Data =>',data)
            res.send({
                status: false,
                message: 'Usuarios disponibles'
            })
        }
    })
}

const getLugar = (req, res)=> {
    lugaresDAO.getLugar(req.params.idLugares, (data) => {
        try{
            console.log('Data =>',data)
            if(!data) throw new Err("No hay lugar")
            res.send({
                status: true, data: data
            })
        }
        catch (Err){
            console.log('Data =>',data)
            res.send({
                status: false,
                message: 'Usuarios disponibles'
            })
        }
    })
}
const agregar = (req, res) => {
    console.log('Agregar => in')

    if (req.user) {
        const lugar = {
            idLugares : req.body.idLugares,
            nombre : req.body.nombre,
            descripcion : req.body.descripcion,
            imagen : req.body.imagen,
            ubicacion: req.body.ubicacion

        }
        lugaresDAO.insertLugar(lugar, (data) => {
            res.send({
                status: true,
                message: 'Lugar agregado exitosamente'
            })
        }, err => {
            res.send({
                status:false,
                message: 'Ha ocurrido un error al agregar lugar',
                errorMessage: err
            })
        })
    }
    else {
        res.send({
            status:false,
            message: 'Este servicio requiere el uso de un Token válido, contactar al administrador',
            error: '100. Falta token'
        })
    }

}
const editarLugar = (req, res) => {
    console.log('Editar => in')
    if (req.user) {
        const lugar = {
            idLugares : req.body.idLugares,
            nombre : req.body.nombre,
            descripcion : req.body.descripcion,
            imagen : req.body.imagen,
            ubicacion: req.body.ubicacion
        }
        lugaresDAO.updateLugar(lugar, (data) => {
            res.send({
                status: true,
                message: 'Lugar editado exitosamente'
            })
        }, err => {
            res.send({
                status:false,
                message: 'Ha ocurrido un error al editar el lugar',
                errorMessage: err
            })
        })
    }
    else {
        res.send({
            status:false,
            message: 'Este servicio requiere el uso de un Token válido, contactar al administrador',
            error: '100. Falta token'
        })
    }

}

const deleteLugar = (req, res) => {
    lugaresDAO.deleteLugar(req.params.idLugares, data => {
        try {
            if (!data) throw new Err("Hubo un error en el proceso")
            if (data.affectedRows === 0) throw new Err(`Falló la eliminación del lugar :(: ${req.params.idLugares}`)
            res.send({
                status: true,
                message: `Eliminación de lugar: ${req.params.idLugares} fue exitosa`
            })
        }
        catch (Err) {
            res.send({
                status: false,
                message: '<Personalizar el mensaje de error'
            })
        }
    })
}


module.exports = {
agregar,
getAllLugares,
    deleteLugar,
    editarLugar,
getLugar
}