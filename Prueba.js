var ejemplo2 ={
  id:'pruebaB',
}
var prueba = new FORM(ejemplo2);
const contenedor = document.getElementById('contenedor');


filasA = []
filasA['opcionA']={
  titulo:'titulo opcionA',
  input:'text',
  valor:''  
};

filasA['opcionB']={
  titulo:'titulo opcionA',
  input:'text',
  valor:''  
}

filasB = []
filasB['opcionA']={
  titulo:'titulo opcionB',
  input:'label',
  valor:'Etiqueta ejemplo'  
};

filasB['opcionB']={
  titulo:'titulo opcionB',
  input:'select',
  valor:'' ,
  options: [
    {
      valor:'v1',
      innerHT:'Opcion uno'
    },
    {
      valor:'v2',
      innerHT:'Opcion dos'
    },

  ] 
};

filasC = []
filasC['opcionC']={
  titulo:'titulo opcionC',
  input:'text',
  valor:''  
};

filasD = []
filasD['opcionC']={
  titulo:'',
  input:'submit',
  valor:'Guardar'  
};

filasE = []
filasE['opcionE']={
  titulo:'textarea titulo',
  input:'textarea',
  valor:'Agregue su texto'  
};

prueba.setColumna('columnaA','50%',filasA);
prueba.setColumna('columnaB','50%',filasB);
prueba.setColumna('columnaC','100%',filasC);
prueba.setColumna('columnaE','100%',filasE)
prueba.setColumna('columnaD','100%',filasD);

prueba.pintarForm(contenedor);
