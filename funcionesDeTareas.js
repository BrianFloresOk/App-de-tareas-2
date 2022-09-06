const fs = require('fs');

const funcionesDeTareas =
{   
    archivo: "./tareas.json",

    leerJson: function(){
        let tareasJson = JSON.parse(fs.readFileSync(this.archivo, 'utf-8'));
        return tareasJson;
    },
    guardarTarea: function(nuevaTarea){
        let {Titulo, Estado} = nuevaTarea;
        let tareaCreada = {Titulo: Titulo.toUpperCase(), Estado: Estado};
        let tareasAnteriores = this.leerJson();
        tareasAnteriores.push(tareaCreada);
        return this.escribirJson(tareasAnteriores);
    },
    escribirJson: function(dato){
        return fs.writeFileSync(this.archivo, JSON.stringify(dato), 'utf-8');
    },
    filtrarPorEstado: function(filtro){
        let listaTareas = this.leerJson();
        let tareaFiltrada = listaTareas.filter(tarea => tarea.Estado == filtro.toUpperCase())
        return tareaFiltrada ? tareaFiltrada : 0;

    },
    cambiarEstadoDeTarea: function(nuevoEstado){
        let {Titulo, Estado} = nuevoEstado;
        let tareas = this.leerJson()
        let tareaEncontrada = tareas.find(tarea => tarea.Titulo == Titulo.toUpperCase());
        if (tareaEncontrada){
            tareaEncontrada.Estado = Estado.toUpperCase()
            return this.escribirJson(tareas)
        } else {
            return false
        }
    }
}


module.exports = funcionesDeTareas