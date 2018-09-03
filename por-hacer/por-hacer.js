const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile("./db/data.JSON", data, (err) => {
        if (err) {
            throw new Error(err);
            return;
        } else {
            console.log("El archivo JSON se creo correctamente");
        }
    })

}

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }

}


const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };


    listadoPorHacer.push(porHacer);
    guardarDB();
    return listadoPorHacer;
}


const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);


    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    listado = [];
    if (index >= 0) {
        for (let i = 0; i < listadoPorHacer.length; i++) {
            if (i != index) {
                listado.push(listadoPorHacer[i]);
            }
        }
        listadoPorHacer = listado;
        guardarDB();
        return true;
    } else {
        return false;
    }

}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}