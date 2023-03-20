Vue.component('alumnos', {
    data() {
        return {
            db       : '',
            buscar   : '',
            alumnos : [],
            accion   : 'nuevo',
            alumno  : {
                idAlumno : '',
                codigo    : '',
                nombre    : '',
                direccion    : '',
                municipio    : '',
                departamento    : '',
                telefono    : '',
                dui    : '',
                fecha    : '',
                sexo    : ''
            }
        }
    },
    methods:{
        nuevoAlumno(){
            this.accion = 'nuevo';
            this.alumno.idAlumno = '';
            this.alumno.codigo = '';
            this.alumno.nombre = '';
            this.alumno.direccion = '';
            this.alumno.municipio = '';
            this.alumno.departamento = '';
            this.alumno.telefono = '';
            this.alumno.dui = '';
            this.alumno.fecha = '';
            this.alumno.sexo = '';
        },
        modificarAlumno(alumno){
            this.accion = 'modificar';
            this.alumno = alumno;
        },
        guardarAlumno(){
            if( this.alumno.nombre=='' || 
                this.alumno.codigo=='' ){
                console.log( 'Por favor ingrese los datos correspondientes' );
                return;
            }
            let store = abrirStore("tblalumnos", 'readwrite');
            if( this.accion==='nuevo' ){
                this.alumno.idAlumno = new Date().getTime().toString(16);//las cantidad milisegundos y lo convierte en hexadecimal   
            }
            let query = store.put( JSON.parse( JSON.stringify(this.alumno) ));
            query.onsuccess = resp=>{
                this.nuevoAlumno();
                this.listar();
            };
            query.onerror = err=>{
                console.error('ERROR al guardar alumno', err);
            };
        },
        eliminarAlumno(alumno){
            if( confirm(`Esta seguro de eliminar el alumno ${alumno.nombre}?`) ){
                let store = abrirStore('tblalumnos', 'readwrite'),
                    req = store.delete(alumno.idAlumno);
                req.onsuccess = res=>{
                    this.listar();
                };
                req.onerror = err=>{
                    console.error('ERROR al guardar alumno');
                };
            }
        },
        listar(){
            let store = abrirStore('tblalumnos', 'readonly'),
                data = store.getAll();
            data.onsuccess = resp=>{
                this.alumnos = data.result
                    .filter(alumno=>alumno.nombre.toLowerCase().indexOf(this.buscar.toLowerCase())>-1 || 
                        alumno.codigo.indexOf(this.buscar)>-1);
            };
        },
    },
    template : `
                <div class="row">
                <div class="form-register">
                    <div class="card border-primary">
                        <div class="h4">REGISTRO DE ALUMNOS</div>
                        <div class="card-body">
                            <form id="frmAlumno" @submit.prevent="guardarAlumno" @reset.prevent="nuevoAlumno()">
                                <div class="controls11">
                                    <div class="col-3 col-md-2">CODIGO:</div>
                                    <div class="col-9 col-md-3">
                                        <input required title="Ingrese un codigo de estudiante valido" 
                                        pattern="^[US|SM]{2}[IS|LE]{2}[0-9]{6}" class="controls" type="text" v-model="alumno.codigo" name="txtCodigoAlumno" id="txtCodigoAlumno">
                                    </div>
                                </div>
                                <div class="controls11">
                                    <div class="col-3 col-md-2">NOMBRE:</div>
                                    <div class="col-9 col-md-6">
                                        <input required pattern="[A-Za-zÑñáéíóú ]{3,75}"
                                        class="controls" type="text" v-model="alumno.nombre" name="txtNombreAlumno" id="txtNombreAlumno">
                                    </div>
                                </div>
                                <div class="controls11">
                                    <div class="col-3 col-md-2">DIRECCION:</div>
                                    <div class="col-9 col-md-6">
                                    <input required pattern="[0-9#.A-Za-zñÑáéíóúü ]{3,100}"
                                        class="controls" type="text" v-model="alumno.direccion" name="txtDireccionAlumno" id="txtDireccionAlumno">
                                    </div>
                                </div>
                                <div class="controls11">
                                    <div class="col-3 col-md-2">MUNICIPIO:</div>
                                    <div class="col-9 col-md-6">
                                        <input required pattern="[A-Za-zÑñáéíóú ]{3,75}"
                                        class="controls" type="text" v-model="alumno.municipio" name="txtMunicipioAlumno" id="txtMunicipioAlumno">
                                    </div>
                                </div>
                                <div class="controls11">
                                    <div class="col-3 col-md-2">DEPARTAMENTO:</div>
                                    <div class="col-9 col-md-6">
                                        <input required pattern="[A-Za-zÑñáéíóú ]{3,75}"
                                        class="controls" type="text" v-model="alumno.departamento" name="txtDepartamentoAlumno" id="txtDepartamentoAlumno">
                                    </div>
                                </div>
                                <div class="controls11">
                                    <div class="col-3 col-md-2">TELEFONO:</div>
                                    <div class="col-9 col-md-6">
                                        <input required pattern="[0-9]{4}-[0-9]{4}"
                                       class="controls" type="text" v-model="alumno.telefono" name="txtTelefonoAlumno" id="txtTelefonoAlumno">
                                    </div>
                                </div>
                                <div class="controls11">
                                    <div class="col-3 col-md-2">DUI:</div>
                                    <div class="col-9 col-md-6">
                                        <input required pattern="[0-9]{8}-[0-9]{1}"
                                       class="controls" type="text" v-model="alumno.dui" name="txtDuiAlumno" id="txtDuiAlumno">
                                    </div>
                                </div>
                                <div class="controls11">
                                    <div class="col-3 col-md-2">FECHA/NACIMIENTO:</div>
                                    <div class="col-9 col-md-6">
                                        <input class="controls" type="date" v-model="alumno.fecha" name="txtFechaAlumno" id="txtFechaAlumno">
                                    </div>
                                </div>
                                <div class="controls11">
                                    <div class="col-3 col-md-2">SEXO:</div>
                                    <div class="col-9 col-md-6">
                                        <input required pattern="[A-Za-z]{3,75}"
                                        class="controls" type="text" v-model="alumno.sexo" name="txtSexoAlumno" id="txtSexoAlumno">
                                    </div>
                                </div>
                                <div class="row p-1">
                        
                                    <input class="botons" type="submit" value="Guardar Datos">
            
                                    <input  class="botons1" type="reset" value="Nuevo Registro">
                        
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <h2></h2>
                <div class="table-register">
                    <div class="col-3 col-md-2">
                        <div class="h5">CONSULTA DE ALUMNOS</div>
                        <div class="card-body">
                            <form class="form-table">
                                <table class="col-9 col-md-6">
                                    <thead>
                                        <tr>
                                            <th>BUSCAR:</th>
                                            <th colspan="14"><input type="text" @keyup="listar()" v-model="buscar" 
                                                class="form-control" placeholder="Busar por nombre" ></th>
                                        </tr>
                                        <tr>
                                            <th>CODIGO</th>
                                            <th colspan="2">NOMBRE</th>
                                            <th>Direccion</th>
                                            <th>Municipio </th>
                                            <th>Departamento</th>
                                            <th>Telefono</th>
                                            <th>Dui</th>
                                            <th>Nacimiento</th>
                                            <th>Sexo</th>
                                
                                
                                
                                
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="item in alumnos" @click='modificarAlumno(item)' :key="item.idAlumno">
                                            <td>{{item.codigo}}</td>
                                            <td colspan="2">{{item.nombre}}</td>
                                            <td>{{item.direccion}}</td>
                                            <td>{{item.municipio}}</td>
                                            <td>{{item.departamento}}</td>
                                            <td>{{item.telefono}}</td>
                                            <td>{{item.dui}}</td>
                                            <td>{{item.fecha}}</td>
                                            <td colspan="3">{{item.sexo}}</td>
                                            <td colspan="5"><button @click.prevent="eliminarAlumno(item)" class="botons2">Eliminar</button></td>
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