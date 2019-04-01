const hbs = require('hbs');
const fs = require('fs');
listaCurso = [];
listaCursoDisponibles = [];
listaInscritos = [];
listaPerIns = [];


hbs.registerHelper('listarInscripciones',()=>{
    listar();
    listarPerIns();
    listarInscripcion();
    let texto = 
'<div class="accordion" id="accordionExample">'
    listaCurso.forEach(curso=>{
        texto = texto + 
        '<div class="card">\
            <div class="card-header" id="'+curso.id+'">'
                '<h2 class="mb-0">\
                    <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne'+curso.id+'" aria-expanded="true" aria-controls="collapseOne">\
                     Nombre del curso: '+curso.nombre+
                    '</button>\
                </h2>\
            </div>'
    let duplicado = listaPerIns.find(encontrado => encontrado.curso == curso.id)
    console.log(listaPerIns,curso)
    if(!duplicado){
        
    }
    else{
       
        texto = texto + 
           '<div id="collapseOne'+curso.id+'" class="collapse show" aria-labelledby="'+curso.id+'" data-parent="#accordionExample">\
                <div class="card-body">'

        
        listaInscritos.forEach(ins=>{
            let duplicado2 = listaInscritos.find(encontrado2 => encontrado2.documento == duplicado.documento)
            if(!duplicado2){                
            }
            else {         
                texto = texto +         
                 ' Documento: '+duplicado2.documento+' Nombre: '+duplicado2.nombre+' Correo: '+duplicado2.correo 
   
            }
        })
        texto = texto +             
         '</div>\
        </div>'
    

    }
    texto = texto +'</div>' 
    })
    texto = texto + '</div>' 
    return texto;
})

const listarPerIns = () => {
    try{
        listaPerIns = require('../listadoPerdIns.json');
    //listaEstudiante = JSON.parse(fs.readFileSync('./listado.JSON'))
    }
    catch(error){
        listaPerIns=[];
    }
}



hbs.registerHelper('inscripcionCurso',(documento,nombre,telefono,correo,curso)=>{
    let res = crearInscripcion(documento,nombre,telefono,correo,curso);
    return res;
    }
    )
    
    const crearInscripcion = (documento,nombre,telefono,correo,curso) => {
        listarInscripcion();
        let ins = {
            documento: documento,
            nombre: nombre,
            telefono: telefono,
            correo: correo
            
        };
        let perIns = {
            documento: documento,
            curso: curso
        }
        let duplicado = listaInscritos.find(documentoEncontrado => documentoEncontrado.documento == documento)
        if(!duplicado){
            listaInscritos.push(ins);
            listaPerIns.push(perIns);
            guardarPersIns()
            guardarInscripcion();
        return 'La persona con documento numero '+documento+' se inscribio al curso numero'+curso;
    }
    else{
        return 'Id de grupo ya existe';
    }
    }

    const guardarPersIns = () => {
        let datos = JSON.stringify(listaPerIns);
        fs.writeFile('listadoPerdIns.json',datos,(err)=>{
            if(err) throw(err);
            console.log('Archivo creado con exito');
        });
        console.log(datos);
    }


    const guardarInscripcion = () => {
        let datos = JSON.stringify(listaInscritos);
        fs.writeFile('listadoInscripcion.json',datos,(err)=>{
            if(err) throw(err);
            console.log('Archivo creado con exito');
        });
        console.log(datos);
    }


    const listarInscripcion = () => {
        try{
            listaInscritos = require('../listadoInscripcion.json');
        //listaEstudiante = JSON.parse(fs.readFileSync('./listado.JSON'))
        }
        catch(error){
            listaInscritos=[];
        }
    }

    




    hbs.registerHelper('cursoDisponible',()=>{
        listarCursosDisponibles();
        let texto =
        '<div class="form-group ">\
        <label for="curso" >Cursos</label>\
        <select class="custom-select" id="curso" name="curso" >'
        listaCursoDisponibles.forEach(curso => { 
    texto = texto +
      '<option value="'+curso.id+'">'+curso.nombre+'</option>'  
    });
    texto = texto + '</select>\
    </div>' 

    return texto;
    })


    














hbs.registerHelper('listarCursosInteresado',()=>{
    listarCursosDisponibles();
let texto = 
'<div class="accordion" id="accordionExample">'
listaCursoDisponibles.forEach(curso => { 
    texto = texto + 
    '<div class="card">\
            <div class="card-header" id="'+curso.id+'">\
                <h2 class="mb-0">\
                    <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne'+curso.id+'" aria-expanded="true" aria-controls="collapseOne">\
                     Nombre del curso: '+curso.nombre+' Valor: '+curso.valor+
                    ' </button>\
                </h2>\
            </div>\
            <div id="collapseOne'+curso.id+'" class="collapse show" aria-labelledby="'+curso.id+'" data-parent="#accordionExample">\
                <div class="card-body">\
                Descripcion: '+curso.descripcion+' Modalidad: '+curso.modalidad+' Intensidad horaria: '+curso.intensidad +
                '</div>\
            </div>\
    </div>' 
});
texto = texto + ' </div>' 

return texto;
})

hbs.registerHelper('listarCursos',()=>{
    listar();

let texto = '<table class="table table-striped">\
  <thead>\
    <tr>\
      <th scope="col">ID</th>\
      <th scope="col">Nombre</th>\
      <th scope="col">Descripcion</th>\
      <th scope="col">Valor</th>\
      <th scope="col">Modalidad</th>\
      <th scope="col">Intensidad</th>\
      <th scope="col">Estado</th>\
    </tr>\
  </thead>\
  <tbody>'
  listaCurso.forEach(curso => { 
       texto=texto + 
    '<tr>'+
      '<th scope="row">'+curso.id+'</th>'+
      '<td>'+curso.nombre+'</td>'+
      '<td>'+curso.descripcion+'</td>'+
      '<td>'+curso.valor+'</td>'+
      '<td>'+curso.modalidad+'</td>'+
      '<td>'+curso.intensidad+'</td>'+
      '<td>'+curso.estado+'</td>'+
    '</tr>'
});
texto = texto + '</tbody></table>' 
return texto;
})

hbs.registerHelper('crearCurso',(id,nombre,modalidad,descripcion,valor,intensidad)=>{
let res = crearCurso(id,nombre,modalidad,descripcion,valor,intensidad);
return res;
}
)

const crearCurso = (id,nombre,modalidad,descripcion,valor,intensidad) => {
    listar();
    let cur = {
        id: id,
        nombre: nombre,
        modalidad: modalidad,
        descripcion: descripcion,
        valor: valor,
        intensidad: intensidad,
        estado: 'disponible'
    };
    let duplicado = listaCurso.find(idEncontrado => idEncontrado.id == id)
    if(!duplicado){
    listaCurso.push(cur);
    guardar();
    return 'Grupo '+id+' creado con exito';
}
else{
    return 'Id de grupo ya existe';
}
}

const guardar = () => {
    let datos = JSON.stringify(listaCurso);
    fs.writeFile('listadoCursos.json',datos,(err)=>{
        if(err) throw(err);
        console.log('Archivo creado con exito');
    });
    console.log(datos);
}

const listar = () => {
    try{
        listaCurso = require('../listadoCursos.json');
    //listaEstudiante = JSON.parse(fs.readFileSync('./listado.JSON'))
    }
    catch(error){
        listaCurso=[];
    }
}


const listarCursosDisponibles = () => {
    listar();
    listaCursoDisponibles = [];
    try{
        listaCurso.forEach(curso => { 
            console.log(curso);
            if(curso.estado == 'disponible'){
                listaCursoDisponibles.push(curso)
            }

        })
       
    }
    catch(error){
        listaCursoDisponibles=[];
    }
}


hbs.registerHelper('obtenerPromedio',(nota1,nota2,nota3) =>{
    return (nota1+nota2+nota3)/3
})

hbs.registerHelper('listar',()=>{
    listaEstudiante = require('./listado.json');


    let texto =" <table> \
<thead> \
<th> Nombre </th> \
<th> Matemtaicas </th>\
</thead>\
<tbody>";
    listaEstudiante.forEach(estudiante => {
        texto=texto +
        '<tr>'+
        '<td>' + estudiante.nombre + '</td>' +
        '<td>' + estudiante.matematicas + '</td>'
    });
    texto = texto + '</tbody></table>' 
    return texto;
})