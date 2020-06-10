
class FORM {

  constructor(form_base){
    this.id = form_base.id,
    this.columnas = [],
    this.columnas_width = [],
    this.contenedor;       
    this.data ='';
    this.form;
  }
  
  //=========================
  //======GET y SET=======
  //=========================
  
  setColumna(nombre,width,filas){
  
    this.columnas[nombre] = filas;
    this.columnas_width[nombre] = width; 
  }
  setData(valor){
    this.data = valor;
  }
  setForm(valor){
    this.form = valor;
  }
  getColumna(nombre){//id = idform_Col_nombre
    var select = `${this.id}_Col_${nombre}`;
    const objt = document.getElementById(select);
    return objt;
  }
  getFila(nombre_fila){
    var select = `${this.id}_F_${nombre_fila}`;
    const objt = document.getElementById(select);
    return objt;
  }
  getLabel(nombre_fila){
    var select = `#${this.id}_F_${nombre_fila} label`;
    const objt = document.querySelector(select);
    return objt;
  }
  getInput(nombre_fila){
    var select = `#${this.id}_${nombre_fila}`;
    const objt = document.querySelector(select);
    return objt;
  }
  getMSJ(){
    return document.getElementById(`${this.id}_msj`);
  }
  //=========================
  //=========Funciones=======
  //=========================
  
  pintarForm(contenedor){
    
    this.contenedor=contenedor;
    var cadena =`<form id="${this.id}" onsubmit='GuardarDatos(event)'>`;
    var respuesta= this.pintarForm_Columnas(this.columnas);
    cadena+= respuesta.cadena;
    cadena +=  `
      <div id="${this.id}_msj" class='OFF'><spam>MENSAJE</spam></div>
    </form>
    `;
    contenedor.innerHTML = this.estylos(respuesta.estilos)+cadena;
    
    //Agregar listener para evento submit
    const formulario = document.getElementById(this.id);
    //formulario.addEventListener('submit',GuardarDatos)
    this.setForm(formulario);
  }

  pintarForm_Columnas(columnas){
   // console.log(columnas[0]);
    var cadena =``;
    var estilos='';
    //Pintar columnas
    for(var col in columnas ){
      
      var id = `${this.id}_Col_${col}`;
      cadena +=`
      <div class="form_columna" id="${id}">    
      `; 
  
      //se le agrega el esilo de la columna
      estilos +=`
        #${id}{
          width:${this.columnas_width[col]}
        }
        `;
  
      cadena += this.pintarForm_Filas(col);
      
      cadena +=`</div>`; 
    } 
  
    var respuesta = {
      cadena:cadena,
      estilos:estilos
    };
    return respuesta;
  }
  
  pintarForm_Filas(col){
    var cadena = '';
    for(var fil in this.columnas[col]){
      
        
      var fila = this.columnas[col][fil];
      var valor = fila.valor!='' || fila.valor!=null?fila.valor:'';
      var placeholder = fila.placeholder!=null? fila.placeholder:'';
      var titulo = fila.titulo!=null? fila.titulo:'';
      var requerido = fila.required? 'required':'';
      fil = fil.toLowerCase();
      
  
     switch (fila.input) {
       
       case 'text':
            cadena +=`
              <div class="form_columna_fila">
                <label  class="form_columna_fila_label">${titulo}</label>
                <input type="${fila.input}" 
                  class="form_columna_fila_input" 
                  name="${fil}"
                  id="${this.id}_${fil}"
                  placeholder="${placeholder}"
                  ${requerido}
                  value = ${valor}>
              </div>
            `; 
        break;
     
        case 'submit':
          cadena +=`
            <div class="form_columna_submit">
              <label  class="form_columna_fila_mensaje">${titulo}</label>
              <input type="${fila.input}" 
                class="form_columna_fila_input" 
                name="${fil}"
                id="${this.id}_${fil}"
                value = ${valor}>
            </div>
          `; 
        break;
  
        case 'select':
          cadena +=`
            <div class="form_columna_fila">
              <label  class="form_columna_fila_label">${titulo}</label>
              <select class="form_columna_fila_input"
               name="${fil}"
               ${requerido}
               id="${this.id}_${fil}">              
          `; 
          if(fila.options != null){
            for(var option of fila.options){
              cadena+=`
                <option value="${option.valor}">${option.innerHT}</option>
              `;
            }
          }
          
            cadena+= `</select></div>`;
        break;
  
        case 'label':
          cadena +=`
            <div class="form_columna_fila">
              <label  class="form_columna_fila_label">${titulo}</label>
              <label class="form_columna_fila_input" 
              name="${fil}"
              id="${this.id}_${fil}">
                ${valor}
              </label>
            </div>
          `; 
        break;
  
        case 'textarea':
          cadena +=`
            <div class="form_columna_fila">
              <label  class="form_columna_fila_label">${titulo}</label>
                <textarea  
                  class="form_columna_fila_textarea" 
                  rows="5" 
                  cols="50"                  
                  placeholder="${placeholder}"
                  id="${this.id}_${fil}"
                  name="${fil}"
                  required>${valor}</textarea>
            </div>
          `; 
        break;
      
        case 'button':
          cadena +=`
            <div class="form_columna_submit">
              <label  class="form_columna_fila_mensaje">${titulo}</label>
              <input type="${fila.input}" 
                class="form_columna_fila_input" 
                name="${fil}"
                id="${this.id}_${fil}"
                value = ${valor}>
            </div>
          `; 
        break;
  
     }   
    }
    return cadena;
  }
  
  estylos(estilos_colum){
    var cadena =`
    <head>
    
      <style>
       .${this.id+'contenedor'}{
        display: block;
        margin: auto;
         
       }
  
       ${estilos_colum}
  
        #${this.id}{
          width:100%;        
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
        }
        #${this.id} .form_columna{
          display:flex;
          flex-direction:column;
          flex-wrap: wrap;
          min-width: 155px;
        }
        #${this.id} .form_columna_fila{
          margin:10px 0px;
          display: flex;
          justify-content: space-between;
          align-items: center; 
          flex-wrap: wrap;       
        }
        #${this.id} .form_columna_fila_label{
          font-weight: bold;
          color: #7baec2;
          width:30%;
          max-wid
          text-align: end;
          min-width: 100px
          height: 26px;
          display: flex;
          align-items: center;
          padding-left:5px;
          
        }
        #${this.id} .form_columna_fila_input{
          height:  36px;
          padding: 4px;
          width:65%;
          box-sizing: border-box;
          min-width: 150px;
          color: #555;
          border: solid #ccc 1px;
          border-radius: 5px
        }
        #${this.id} .form_columna_submit{
          height: 26px;
          padding: 4px;        
          box-sizing: border-box;
          width: 200px;
          color: #555;        
          border-radius: 5px
          max-width: 100px;
          margin: 15px 0px;
      
        }
        #${this.id} .form_columna_fila select{
          height: 26px;
          padding: 4px;
          width:65%;
          box-sizing: border-box;
          min-width: 150px
          color: #555;
          border: solid #ccc 1px;
          border-radius: 5px
        }
        #${this.id} .form_columna_fila_textarea{
          min-width: 150px;
          color: #555;
          border: solid #ccc 1px;
          border-radius: 5px;
          width:65%;
        }

        #${this.id}_msj {
          position: fixed;
          width: 100vw;
          height: 100vh;
          background-color: rgba(42,42,42,.5);          
          top: 0;
          left: 0;        
          
        }
        #${this.id}_msj spam{
          position: absolute;
          width: 150px;
          height: 70px;
          background-color: white;
          border: solid #424242 2px;
          left: calc(50% - 75px);
          top: calc(50% - 35px);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .OFF{
          display:none;
        }

        
  
        @media (max-width: 387px) {
          #${this.id} .form_columna{
            width:90%;
            align-items: center;
          }
          #${this.id} .form_columna_fila{
            width:90%;
          }
          #${this.id} .form_columna_fila_label{
            width:90%;
          }
          #${this.id} .form_columna_fila_input{
            width:90%;
          }
          #${this.id} .form_columna_fila select{
            width:90%;
          }
          #${this.id} .form_columna_submit{
            width:90%;
          }
          #${this.id} .form_columna_fila_textarea{
            width:90%;
          }
        }
      
      </style>
    </head>
    `;
    return cadena;
  } 
 
  limpiarForm(){
    var inputs = '#'+this.id + ' input';
    var textareas = '#'+this.id + ' textarea';
    var select= '#'+this.id + ' select';
    var listaInputs = document.querySelectorAll(inputs);
    var listaText = document.querySelectorAll(textareas);
    var listSelect = document.querySelectorAll(select);
    for(var input of listaInputs){
      if(input.type == 'text'){
        input.value = '';
      }    
    }
    for(var text of listaText){
        text.value='';    
      }
    for(var select of listSelect){
      select.selectedOptions = select[0];  
    } 
  }
  
  AgregarDatos(datos){
    var objt=null;

    for(var dato in datos){
      
      try {
        var id = `${this.id}_${dato.toLowerCase()}`;
        objt = document.getElementById(id);
      } catch (error) {
        objt = null;
      }
      
      if(objt != null){
       // console.log('agrega');
        objt.value = datos[dato];
      }
    }
    
  }

  MostrarMSJ(show,texto){
    var msj = this.getMSJ();
    if(show){
      msj.classList.remove('OFF');
      msj.children[0].innerHTML=texto;

    }else{
      msj.classList.add('OFF');
      msj.children[0].innerHTML=texto;
    }
  }
  
  
  }
  
  
  
  /*-----------------------------------------------*/
  /*-----------------------------------------------*/
  //      EJEMPLO DE OBJETO JAVASCRIPT
  /*-----------------------------------------------*/
  /*-----------------------------------------------*/
  
  var ejemplo2 ={
    id:'pruebaB'
  }
  var prueba = new FORM(ejemplo2);
  
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
  
  prueba.setColumna('columnaA','50%',filasA);
  prueba.setColumna('columnaB','50%',filasB);
  prueba.setColumna('columnaC','100%',filasC);
  prueba.setColumna('columnaD','100%',filasD);