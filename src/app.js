const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const dirNode_modules = path.join(__dirname , '../node_modules')

app.use('/css', express.static(dirNode_modules + '/bootstrap/dist/css'));
app.use('/js', express.static(dirNode_modules + '/jquery/dist'));
app.use('/js', express.static(dirNode_modules + '/popper.js/dist'));
app.use('/js', express.static(dirNode_modules + '/bootstrap/dist/js'));
require('./helpers')

const directorioPublico = path.join(__dirname,'../public');
app.use(express.static(directorioPublico));
const directorioPartials = path.join(__dirname,'../partials');
hbs.registerPartials(directorioPartials);
app.use(bodyParser.urlencoded({extended:false}))
app.set('view engine','hbs');


app.get('/',(req,res) =>{
    res.render('index',{
        nombre:'Matta'
    });
});

app.post("/calculos",(req,res)=> {
    res.render('calculos',{
        nombre: req.body.nombreEst,
        nota1: parseInt(req.body.nota1),
        nota2:parseInt(req.body.nota2),
        nota3:parseInt(req.body.nota3)
    });
});

app.post("/crearCursoLogica",(req,res)=> {
    res.render('crearCursoLogica',{
        id:  req.body.id,
        nombre: req.body.nombre,
        modalidad: req.body.modalidad,
        descripcion: req.body.descripcion,
        valor: parseInt(req.body.valor),
        intensidad: parseInt(req.body.intensidad)
    });
});

app.post("/inscripcionLogica",(req,res)=> {
    res.render('inscripcionLogica',{
        documento:  req.body.documento,
        nombre: req.body.nombre,
        telefono: req.body.telefono,
        correo: req.body.correo,
        curso: req.body.curso
    });
});


app.get("/listarCursos",(req,res)=>{
    res.render('listarCursos')
})


app.get("/crearCurso",(req,res)=>{
    res.render('crearCurso')
})


app.get("/inscripcion",(req,res)=>{
    res.render('inscripcion')
})

app.get("/listarIncripciones",(req,res)=>{
    res.render('listarInscripciones')
})


app.get('*',(req,res)=>{
    res.render('error',{
        nombre:'error'
    })
})


app.listen(3000,() => {
    console.log('Escuchando en el puerto 3000')
})