Vue.component('inscripciones', {
    data(){
        return{
           db:'',
           buscar:'',
           dias: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'],
           inscripciones:[],
           accion : 'nuevo',
           inscripcion:{
             idInscripcion:1,
             codigo : '',
             nombre : '',
             docente : '',
             de : '',
             a : '',
             dia : '',
             aula : ''
            }
        }
    },
    methods:{
        nuevaIncripcion(){
            this.inscripcion.accion = 'nuevo';
            this.inscripcion.idInscripcion = '';
            this.inscripcion.codigo = '';
            this.inscripcion.nombre = '';
            this.inscripcion.docente = '';
            this.inscripcion.de = '';
            this.inscripcion.a = '';
            this.inscripcion.dia = '';
            this.inscripcion.aula = '';
        },
        modificarInscripcion(inscripcion){
            this.accion = 'modificar';
           this.inscripcion = inscripcion;
        },
        guardarIncripcion(){
            let store = this.abrirStore('tblinscripcion','readwrite');
            if(this.accion==='nuevo'){
              this.inscripcion.idInscripcion = new Date().getTime().toString(16); //las cantidad milisegundo y lo convierte en hexadecimal
      
            }
            let query = store.put( JSON.parse( JSON.stringify(this.inscripcion)));
            query.onsuccess = resp=>{
             this.nuevaIncripcion();
             this.listar();
            };
            query.onerror = err=>{
             console.error('ERROR al guardar inscripcion', err);
            };
        },
        eliminarInscripcion(inscripcion){
            if(confirm(`Esta seguro de eliminar la inscripcion ${inscripcion.nombre}?`)){
                let store = this.abrirStore('tblinscripcion', 'readwrite'),
                req = store.delete(inscripcion.idMateria);
                req.onsuccess = res=>{
                  this.listarMaterias();
                };
                req.onerror = err=>{
                  console.error('ERROR al guardar inscripcion');
                };
            }
        },
        listar(){
            let store = this.abrirStore('tblinscripcion', 'readonly'),
            data = store.getAll();
            data.onsuccess = resp=>{
               this.inscripciones = data.result
              .filter(inscripcion=>inscripcion.nombre.toLowerCase().indexOf(this.buscar.toLowerCase())>-1 || 
              inscripcion.codigo.indexOf(this.buscar)>-1);
            };
    
        }
    },  
    
    template : `
            <div class="card text-white">
                
              <div class="form-register">
                    <div class="h4"> REGISTRO DE MATERIAS 8 DE ENERO 2023 PARA EL 5° CICLO</div>
                    <form method="post" @submit.prevent="guardarMateria" @reset="nuevaMateria">

                        <div class="row p-1">

                            <div class="col-3 col-md-2">INGRESE EL CODIGO DE MATERIA:</div>

                            <div class="col col-md-2">

                                <input title="Ingrese el codigo" v-model="materia.codigo" pattern="[0-9]{3,10}" required
                                type="text" class="controls">

                            </div>

                        </div>

                        <div class="row p-1">

                            <div class="col-3 col-md-2">INGRESA EL NOMBRE DE MATERIA:</div>

                            <div class="col col-md-3">

                                <input title="Ingrese el nombre" v-model="materia.nombre"
                                pattern="[A-Za-zñÑáéíóúü .#0-9_]{3,75}" required type="text" class="controls">

                            </div>

                        </div>

                        <div class="row p-1">

                            <div class="col-3 col-md-2">NOMBRE DEL DOCENTE:</div>

                            <div class="col col-md-3">

                                <input title="Ingrese el docente" v-model="materia.docente"
                                pattern="[A-Za-zñÑáéíóúü .]{3,75}" required type="text" class="controls">

                            </div>

                        </div>

                        <div class="row p-1">

                            <div class="col-3 col-md-2">HORARIO DE ENTRADA:</div>

                            <div class="col col-md-2">

                                <input title="Ingrese la hora de inicio" v-model="materia.de" required type="time"
                                class="controls">

                            </div>

                        </div>

                        <div class="row p-1">

                            <div class="col-3 col-md-2">HORARIO DE SALIDAD:</div>

                            <div class="col col-md-2">

                                <input title="Ingrese la hora de finalizacion" v-model="materia.a" required type="time"
                                class="controls">

                            </div>

                        </div>

                        <div class="row p-1">

                            <div class="col-3 col-md-2">DIA QUE TENDRAS LA MATERIA:</div>

                            <div class="col col-md-2">

                                <select title="Seleccione el dia" v-model="materia.dia" required class="controls">

                                    <option value="">SELECCIONA UNA OPCION</option>

                                    <option v-for="dia in dias" :value="dia">{{dia}}</option>

                                </select>

                            </div>

                        </div>

                        <div class="row p-1">

                            <div class="col-3 col-md-2">AULA:</div>

                            <div class="col col-md-3">

                                <input title="Ingrese el aula" v-model="materia.aula"
                                    pattern="[A-Za-zñÑáéíóúü .#0-9_]{3,75}" required type="text" class="controls">

                            </div>

                        </div>

                        <div class="row m-2">

                            <div class="col col-md-5 text-center">

                                <input class="botons" type="submit" value="Guardar">

                                <input class="botons1" type="reset" value="Nuevo">

                            </div>

                        </div>

                    </form>

                </div>

            </div>

            <div class="table-register" id="carBuscarMateria">
                <div class="h5">BUSQUEDA DE MATERIAS</div>
                <div class="card-body">

                    <table class="table table-dark table-hover">

                        <thead>
                            <tr>
                                <th>BUSCAR:</th>
                                <th colspan="14"><input type="text" @keyup="listarMaterias" v-model="buscar" 
                                   class="form-control" placeholder="Buscar por nombre" ></th>
                            </tr>
                            <tr>

                                <th>Codigo</th>

                                <th>Nombre</th>

                                <th>Docente</th>
            
                                <th>De</th>

                                <th>A</th>

                                <th>Dia</th>

                                <th>Aula</th>

                                <th></th>

                            </tr>

                        </thead>

                        <tbody>

                            <tr v-for="item in materias" @click='modificarMateria( item )' :key="item.idMateria">

                                <td>{{item.codigo}}</td>

                                <td>{{item.nombre}}</td>

                                <td>{{item.docente}}</td>

                                <td>{{item.de}}</td>

                                <td>{{item.a}}</td>

                                <td>{{item.dia}}</td>

                                <td>{{item.aula}}</td>

                                <td>

                                    <button class="botons2" @click="eliminarMateria(item)">Eliminar</button>

                                </td>

                            </tr>

                        </tbody>

                    </table>

                </div>

            </div>
    
       `

});