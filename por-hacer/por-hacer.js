const fs = require('fs');
const colors = require('colors');
const { describe } = require('yargs');

let listadoPorHacer = [];

const guardarDB = () => {

    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
    });
}

const cargarDB = () => {

    try {
        listadoPorHacer = require('../db/data.json');

    } catch (error) {
        listadoPorHacer = [];
    }

    //console.log(listadoPorHacer);

}

const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    if (!listadoPorHacer.find(item => item.descripcion === porHacer.descripcion))
        listadoPorHacer.push(porHacer);

    guardarDB();

    return porHacer;
}

const getListado = () => {
    cargarDB();
    for (let tarea of listadoPorHacer) {
        console.log('========================'.green);
        console.log(tarea.descripcion);
        console.log('Estado :', tarea.completado);
        console.log('========================'.green);
    }

}


const actualizar = (descripcion, completado = true) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(item => item.descripcion === descripcion);
    if (index > -1) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    }
    return false;
}

const borrar = (descripcion) => {
    cargarDB();

    let nuevoListado = listadoPorHacer.filter(item => item.descripcion !== descripcion);
    //let index = listadoPorHacer.findIndex(item => item.descripcion === descripcion);
    //if (index > -1) {
    if (nuevoListado.length < listadoPorHacer.length) {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }
    return false;
}


module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}


//