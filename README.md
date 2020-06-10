# Form en js tipo componente

## Instalacion
Copia el contenido de la clase Form

## Uso
instanciacion

var ejemplo ={
    id:'pruebaB'
  }
var prueba = new FORM(ejemplo);

###Filas
 filasA = []
  filasA['opcionA']={
    titulo:'titulo opcionA',
    input:'text',
    valor:'' ,
    required: true,
    placeholder:''
  };
  se crea arreglo que contenga un objeto java con las propiedades listadas
*Nota: no todas las propiedades son necesarias, solo titulo, input*

### Columna

 prueba.setColumna('columnaA','50%',filasA);

 Se ingresa Nombre,largo,filas

 *Nota: si se agrega dos columnas que sumadas de largo sean 100% las colocara una a lado de la otra*

 [Contribution guidelines for this project](docs/Diagrama/diagrama.jpg);