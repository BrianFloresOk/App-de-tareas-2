//*************************************//
//*         APP DE TAREAS 2.0         *//
//*************************************// 
// Brian Flores
// COMISION 13

const process = require('process');
const funcionesDeTareas = require('./funcionesDeTareas')
const accion = process.argv[2] && process.argv[2].toLowerCase();

var separador = "--------------------------------------";

switch (accion)
{
    case "listar": // Mustra por consola las tareas.
        console.log("\nEsta es tu lista de tareas:\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n");
        funcionesDeTareas.leerJson().forEach((tarea) => console.log(`Titulo: ${tarea.Titulo}\nEstado: ${tarea.Estado}\n${separador}`));
        break;
    
    case "crear": // Permite crear una nueva tarea que tendrá por defecto el estado PENDIENTE.
        let nuevaTarea = {
            Titulo: process.argv[3],
            Estado: "PENDIENTE"
        }
        funcionesDeTareas.guardarTarea(nuevaTarea);
        console.log(`\nLa nueva tarea "${nuevaTarea.Titulo.toUpperCase()}" se agregó correctamente.`);
        break;
    
    case "filtrar"://Filtra por el estado que tiene la tarea
        let filtro = process.argv[3];
        let tareaFiltrada  = funcionesDeTareas.filtrarPorEstado(filtro);
        console.log(`\nTareas encontradas por: ${filtro.toUpperCase()}.\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n`);
        if (tareaFiltrada.length > 0){
            tareaFiltrada.forEach(estado => console.log(`Titulo: ${estado.Titulo}\nEstado: ${estado.Estado}\n${separador}`))
        } else {
            console.log("Upss...! (O.O)?");
            console.log("No se encontraron tareas.\nPruebe con otra palabra clave.");
        }
        break;
    
    case "cambiar"://Permite cambiarle el estado a una tarea
        let nuevoEstado = {
            Titulo: process.argv[3],
            Estado: process.argv[4]
        }
        let tituloCorrecto = funcionesDeTareas.cambiarEstadoDeTarea(nuevoEstado);
        if (typeof tituloCorrecto != "boolean")
        {
            console.log(`\nLa tarea: ${nuevoEstado.Titulo.toUpperCase()}.\nCambio su estado, ahora está: ${nuevoEstado.Estado.toUpperCase()}.`);
            if (nuevoEstado.Estado.toLowerCase() == "completado")
            {
                console.log("\n¡Buen trabajo, una tarea menos por realizar! :-D");
            }
        }
        else
        {
            console.log(`\nEl titulo "${nuevoEstado.Titulo}" no se encontró en la lista de tareas.`);
            console.log("Por favor verifique que el titulo introducido sea el correcto.");
            console.log(`\nAYUDA: Puede usar la accion "Listar" para ver todas las tareas`);
            console.log("teniendo a disposicion el titulo y el estado.");
        } 
        break;
    case undefined:
        console.log("\n¡¡Atencion!!\nTienes que pasar una acción.");
        console.log("\nAcciones permitidas:\n-> Listar\n-> Crear\n-> Filtrar\n-> Cambiar");
        break;

    default:
        console.log("\nNo entiendo que quieres hacer con esta acción: " + accion+".");
        console.log("\nPor Favor, verifica que la acción ingresada sea la correcta.");
        break;
}
