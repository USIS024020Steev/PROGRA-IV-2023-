Vue.component('materias', {
    data() {
        return {
            db       : '',
            buscar   : '',
            materias : [],
            accion   : 'nuevo',
            materia  : {
                idMateria : '',
                codigo    : '',
                nombre    : '',
                uv        : '',
            }
        }
    },
    methods:{
        nuevoMateria(){
            this.accion = 'nuevo';
            this.materia.idMateria = '';
            this.materia.codigo = '';
            this.materia.nombre = '';
            this.materia.uv = '';
        },
        modificarMateria(materia){
            this.accion = 'modificar';
            this.materia = materia;
        },
        guardarMateria(){
            if( this.materia.nombre=='' || 
                this.materia.codigo=='' ){
                console.log( 'Por favor ingrese los datos correspondientes' );
                return;
            }
            let store = abrirStore("tblmaterias", 'readwrite');
            if( this.accion==='nuevo' ){
                this.materia.idMateria = new Date().getTime().toString(16);//las cantidad milisegundos y lo convierte en hexadecimal   
            }
            let query = store.put( JSON.parse( JSON.stringify(this.materia) ));
            query.onsuccess = resp=>{
                this.nuevoMateria();
                this.listar();
            };
            query.onerror = err=>{
                console.error('ERROR al guardar materia', err);
            };
        },
        eliminarMateria(materia){
            if( confirm(`Esta seguro de eliminar el materia ${materia.nombre}?`) ){
                let store = abrirStore('tblmaterias', 'readwrite'),
                    req = store.delete(materia.idMateria);
                req.onsuccess = res=>{
                    this.listar();
                };
                req.onerror = err=>{
                    console.error('ERROR al guardar materia');
                };
            }
        },
        listar(){
            let store = abrirStore('tblmaterias', 'readonly'),
                data = store.getAll();
            data.onsuccess = resp=>{
                this.materias = data.result
                    .filter(materia=>materia.nombre.toLowerCase().indexOf(this.buscar.toLowerCase())>-1 || 
                        materia.codigo.indexOf(this.buscar)>-1);
            };
        },
    },
    template : `
            <div class="row">
                <div class="form-register">
                    <div class="card border-primary">
                        <div class="h4">REGISTRO DE MATERIAS</div>
                        <div class="card-body">
                            <form id="frmMateria" @submit.prevent="guardarMateria" @reset.prevent="nuevoMateria()">
                                <div class="controls11">
                                    <div class="col-3 col-md-2">CODIGO:</div>
                                    <div class="col-9 col-md-3">
                                        <input required pattern="[0-9]{3}" class="controls" type="text" v-model="materia.codigo">
                                    </div>
                                </div>
                                <div class="controls11">
                                    <div class="col-3 col-md-2">NOMBRE:</div>
                                    <div class="col-9 col-md-6">
                                        <input required pattern="[a-zA-Z ]{3,65}" class="controls" type="text" v-model="materia.nombre">
                                    </div>
                                </div>
                                <div class="controls11">
                                    <div class="col-3 col-md-2">UV:</div>
                                    <div class="col-9 col-md-6">
                                        <input required pattern="[0-9]{1,3}" class="controls" type="text" v-model="materia.uv">
                                    </div>
                                </div>
                                <div class="row p-1">
                                    
                                    <input class="botons" type="submit" value="Guardar Datos">
                                    
                                
                                    <input class="botons1" type="reset" value="Nuevo Registro">
                                   
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="table-register">
                    <div class="card text-bg-light">
                        <div class="h5">CONSULTA DE MATERIAS</div>
                        <div class="card-body">
                            <form>
                                <table class="table table-dark table-hover">
                                    <thead>
                                        <tr>
                                            <th>BUSCAR:</th>
                                            <th colspan="3"><input type="text" @keyup="listar()" v-model="buscar" 
                                                class="form-control" placeholder="Busar por nombre" ></th>
                                        </tr>
                                        <tr>
                                            <th>CODIGO</th>
                                            <th>NOMBRE</th>
                                            <th colspan="2">UV</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="materia in materias" @click='modificarMateria(materia)' :key="materia.idMateria">
                                            <td>{{materia.codigo}}</td>
                                            <td>{{materia.nombre}}</td>
                                            <td>{{materia.uv}}</td>
                                            <td><button @click.prevent="eliminarMateria(materia)" class="botons2">Eliminar</button></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        `
});