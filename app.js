//
const argv = require('./config/yargs').argv;
const colors = require('colors');
const porHacer = require('./por-hacer/por-hacer');

//const argv = require('yargs').argv;

let comando = argv._[0];

//console.log(argv);

switch (comando) {
    case 'crear':
        let tarea = porHacer.crear(argv.descripcion);
        console.log(tarea);
        break;
    case 'listar':
        let listado = porHacer.getListado();
        //console.log('Mostrar todas las tareas por hacer');
        break;
    case 'actualizar':
        if (porHacer.actualizar(argv.descripcion, argv.completado)) {
            console.log('Operacion realizada con exito')
        } else {
            console.log('Tarea no encontrada')
        }
        break;
    case 'borrar':
        if (porHacer.borrar(argv.descripcion)) {
            console.log('Tarea eliminada con exito')
        } else {
            console.log('Tarea no encontrada')
        }

        break;
    default:
        console.log('Comando no es reconocido');

        break;
}





//console.log(comando);