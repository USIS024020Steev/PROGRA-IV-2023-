var db, 
    app = new Vue({
    el:"#app",
    data:{
        forms:{
            materia:{ mostrar:false, },
            alumno:{ mostrar:false, },
            matricula:{ mostrar:false, },
            inscripcion:{ mostrar:false, },
        }
    },
    methods: {
        abrirCerrarFormulario(form){
            this.forms[form].mostrar = !this.forms[form].mostrar;
            this.$refs[form].listar();
        },
        abrirBD() {
            let indexDB = indexedDB.open('db_sistema_academico', 1);
            indexDB.onupgradeneeded = e => {
                let req = e.target.result,
                    tblalumnos = req.createObjectStore('tblalumnos', {
                        keyPath: 'idAlumno'
                    }),
                    tblmaterias = req.createObjectStore('tblmaterias', {
                        keyPath: 'idMateria'
                    });
                    tblmatriculas = req.createObjectStore('tblmatriculas', {
                        keyPath: 'idMatricula'
                    });
                    tblinscripcion = req.createObjectStore('tblinscripcion', {
                        keyPath: 'idInscripcion'
                    });

                tblalumnos.createIndex('idAlumno', 'idAlumno', {
                    unique: true
                });
                tblalumnos.createIndex('codigo', 'codigo', {
                    unique: true
                });
            };
            indexDB.onsuccess = e => {
                db = e.target.result;
            };
            indexDB.onerror = e => {
                console.error('ERROR al crear, abrir la BD', e);
            };
        }
    },
    created() {
        this.abrirBD();
    }
});

function abrirStore(store, modo) {
    let ltx = db.transaction(store, modo);
    return ltx.objectStore(store);
}

async function seleccionarImagen(image){
    let archivo = image.files[0];
    if(archivo){
        let blob = await img(archivo, 1),
            reader = new FileReader();
        reader.onload = e=>{
            app.$refs.matricula.matricula.comprobante = e.target.result;
            console.log(e.target.result);
        };
        reader.readAsDataURL(blob);
    }else {
        console.log("Poir favor seleccione una imagen validad...")
    }
}