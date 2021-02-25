
/*------------------------------------------/
/   COMPONENTE FORMULARIO
/------------------------------------------*/
//Vercion 1.1
class FORM {

  constructor(form_base){
    this.id = form_base.id,
    this.columnas = [],
    this.columnas_width = [],
    this.contenedor;       
    this.data ='';
    this.form;
    this.submitFunction;
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
  setSubmmit(funcion){
    this.submitFunction = funcion;
  }
  getColumna(nombre){//id = idform_Col_nombre
    var select = `${this.id}_Col_${nombre}`;
    const objt = document.getElementById(select);
    return objt;
  }
  getFila(nombre_fila){
      var select = `#${this.id}_${nombre_fila}`;
      const objt = document.querySelector(select);
      return objt.parentNode;
    }
  getLabel(nombre_fila){
    var select = `.${nombre_fila}_L`;
    const objt = document.querySelector(select);
    return objt;
  }
  getInput(nombre_fila){
    var select = `${this.id}_${nombre_fila}`;
    const objt = document.getElementById(select);
    return objt;
  }
  getMSJ(){
    return document.getElementById(`${this.id}_msj`);
  }  
  getFormulario(){
    return document.getElementById(this.id);
  }
  //=========================
  //=========Funciones=======
  //=========================
  
  pintarForm(contenedor){
    
    this.contenedor=contenedor;
    var cadena =`<form id="${this.id}" onsubmit='${this.submitFunction}'>`;
    var respuesta= this.pintarForm_Columnas(this.columnas);
    cadena+= respuesta.cadena;
    cadena +=  `
      
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
      var evento = fila.evento!= ''? fila.evento:'';
      var clase = fila.clase!=''?fila.clase:'';
      var maxlength = fila.maxlength!= ''? fila.maxlength:'';
      var max = fila.max!= ''? fila.max:'';
      var min = fila.max!= ''? fila.min:'';
      var multiple = fila.multiple? 'multiple':'';
      fil = fil.toLowerCase();
      
      
  
    switch (fila.input) {
      
      case 'text':
            cadena +=`
              <div class="form_columna_fila ${clase}">
                <label  class="form_columna_fila_label ${fil}_L">${titulo}</label>
                <input type="${fila.input}" 
                  class="form_columna_fila_input" 
                  name="${fil}"
                  id="${this.id}_${fil}"
                  placeholder="${placeholder}"
                  ${evento}
                  ${requerido}
                  maxlength ="${maxlength}"
                  value = "${valor}">
              </div>
            `; 
        break;

        case 'email':
            cadena +=`
              <div class="form_columna_fila ${clase}">
                <label  class="form_columna_fila_label ${fil}_L">${titulo}</label>
                <input type="${fila.input}" 
                  class="form_columna_fila_input" 
                  name="${fil}"
                  id="${this.id}_${fil}"
                  placeholder="${placeholder}"
                  ${evento}
                  ${requerido}
                  maxlength ="${maxlength}"
                  value = "${valor}">
              </div>
            `; 
        break;

        case 'number':
            cadena +=`
              <div class="form_columna_fila ${clase}">
                <label  class="form_columna_fila_label ${fil}_L">${titulo}</label>
                <input type="${fila.input}" 
                  class="form_columna_fila_input" 
                  name="${fil}"
                  id="${this.id}_${fil}"
                  placeholder="${placeholder}"
                  ${requerido}
                  max = "${max}"
                  min = "${min}"
                  ${evento}
                  value = "${valor}">
              </div>
            `; 
        break;
    
        case 'submit':
          cadena +=`
            <div class="form_columna_submit ${clase}">
              <label  class="form_columna_fila_mensaje ${fil}_L">${titulo}</label>
              <input type="${fila.input}" 
                class="form_columna_fila_input" 
                name="${fil}"
                id="${this.id}_${fil}"
                value = "${valor}">
            </div>
          `; 
        break;
  
        case 'select':
          cadena +=`
            <div class="form_columna_fila ${clase}">
              <label  class="form_columna_fila_label ${fil}_L">${titulo}</label>
              <select class="form_columna_fila_input"
              name="${fil}"
              ${requerido}
              ${evento}
              ${multiple}
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
            <div class="form_columna_fila ${clase}">
              <label  class="form_columna_fila_label ${fil}_L">${titulo}</label>
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
            <div class="form_columna_fila ${clase}">
              <label  class="form_columna_fila_label ${fil}_L">${titulo}</label>
                <textarea  
                  class="form_columna_fila_textarea" 
                  rows="5" 
                  cols="50"                  
                  placeholder="${placeholder}"
                  id="${this.id}_${fil}"
                  name="${fil}"
                  maxlength = "${maxlength}"
                  required>${valor}</textarea>
            </div>
          `; 
        break;
      
        case 'button':
          cadena +=`
            <div class="form_columna_submit ${clase}">
              <label  class="form_columna_fila_mensaje ${fil}_L">${titulo}</label>
              <input type="${fila.input}" 
                class="form_columna_fila_input" 
                name="${fil}"
                ${evento}
                id="${this.id}_${fil}"
                value = ${valor}>
               
            </div>
          `; 
        break;

        case 'checkbox':
          cadena +=`
            <div class="form_columna_fila ${clase}">
              <label  class="form_columna_fila_label ${fil}_L">${titulo}</label>
              <input type="${fila.input}" 
                class="form_columna_fila_input c_box" 
                name="${fil}"
                id="${this.id}_${fil}"
                placeholder="${placeholder}"
                ${requerido}
                value = ${valor}>
            </div>
          `; 
        break;      
        
        case 'radio':
          cadena +=`
            <div class="form_columna_fila ${clase}">                           
          `; 
          if(fila.options != null){
            for(var option of fila.options){
              cadena+=`
                <div class="div_radio">
                  <label  class="form_columna_fila_label radio_l ${fil}_L">${option.titulo}</label>
                  <input  type="radio" 
                  class="${this.id}_inp_radio"
                  name = "${fil}"
                  value="${option.valor}">
                </div>
              `;
            }
          }
          
            cadena+= `</div>`;
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
          justify-content: center;
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
          height:  26px;
          padding: 4px;
          width:65%;
          box-sizing: border-box;
          min-width: 150px;
          color: #555;
          border: solid #ccc 1px;
          border-radius: 5px;
          margin:0px;
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
        /*
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
        }*/
        #${this.id} .form_columna_fila .c_box{
          height: 16px;
        }

        #${this.id} .form_columna_fila .div_radio{
          display: flex;
          width: 100%;
          margin: 2px;
        }

        #${this.id} .radio_l{
          width: 80%;
        }
        .${this.id}_inp_radio{
          width: 10%;
        }

        .OFF_form{
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
      if(input.type == 'checkbox'){
        input.checked=false;
      }    
    }
    for(var text of listaText){
      if(text != null)text.value='';    
      }
    for(var select of listSelect){
      if(select != null)select.selectedIndex = 0;  
    } 
  }
  
  AgregarDatos(datos){
    //carga dato al formulario, el nombre del campo deve ser 
    //igual al nombre ingresado en el input
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
      switch (objt.type) {
        case 'text':
          objt.value = datos[dato];
        break;

        case 'number':
          objt.value = datos[dato];
        break;

        case 'checkbox':           
          objt.checked = datos[dato]=='1'?true:false;
        break;
      
        default:
          break;
      }
        
      }
    }
    
  } 

  visible(estado){
    const formulario = document.getElementById(this.id);
    if(!estado){
      formulario.style.display='none';
    }else{
      formulario.style.display='flex';
    }
  } 

  disabledAll(estado){
    for(var col in this.columnas ){
      for(var fil in this.columnas[col]){
        document.getElementById(`${this.id}_${fil}`).disabled=estado;
      }
    }
  }
  
}

//Vercion 1.0
class FORM {

  constructor(form_base){
    this.id = form_base.id,
    this.columnas = [],
    this.columnas_width = [],
    this.contenedor;       
    this.data ='';
    this.form;
    this.submitFunction;
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
  setSubmmit(funcion){
    this.submitFunction = funcion;
  }
  getColumna(nombre){//id = idform_Col_nombre
    var select = `${this.id}_Col_${nombre}`;
    const objt = document.getElementById(select);
    return objt;
  }
  getFila(nombre_fila){
    var select = `#${this.id}_${nombre_fila}`;
    const objt = document.querySelector(select);
    return objt.parentNode;
  }
  getLabel(nombre_fila){
    var select = `.${nombre_fila}_L`;
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
    var cadena =`<form id="${this.id}" onsubmit='${this.submitFunction}'>`;
    var respuesta= this.pintarForm_Columnas(this.columnas);
    cadena+= respuesta.cadena;
    cadena +=  `
      
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
      var evento = fila.evento!= ''? fila.evento:'';
      var clase = fila.clase!=''?fila.clase:'';
      var maxlength = fila.maxlength!= ''? fila.maxlength:'';
      var max = fila.max!= ''? fila.max:'';
      var min = fila.max!= ''? fila.min:'';
      var multiple = fila.multiple? 'multiple':'';
      fil = fil.toLowerCase();
      
      
  
     switch (fila.input) {
       
       case 'text':
            cadena +=`
              <div class="form_columna_fila ${clase}">
                <label  class="form_columna_fila_label ${fil}_L">${titulo}</label>
                <input type="${fila.input}" 
                  class="form_columna_fila_input" 
                  name="${fil}"
                  id="${this.id}_${fil}"
                  placeholder="${placeholder}"
                  ${evento}
                  ${requerido}
                  maxlength ="${maxlength}"
                  value = "${valor}">
              </div>
            `; 
        break;

        case 'email':
            cadena +=`
              <div class="form_columna_fila ${clase}">
                <label  class="form_columna_fila_label ${fil}_L">${titulo}</label>
                <input type="${fila.input}" 
                  class="form_columna_fila_input" 
                  name="${fil}"
                  id="${this.id}_${fil}"
                  placeholder="${placeholder}"
                  ${evento}
                  ${requerido}
                  maxlength ="${maxlength}"
                  value = "${valor}">
              </div>
            `; 
        break;

        case 'number':
            cadena +=`
              <div class="form_columna_fila ${clase}">
                <label  class="form_columna_fila_label ${fil}_L">${titulo}</label>
                <input type="${fila.input}" 
                  class="form_columna_fila_input" 
                  name="${fil}"
                  id="${this.id}_${fil}"
                  placeholder="${placeholder}"
                  ${requerido}
                  max = "${max}"
                  min = "${min}"
                  value = "${valor}">
              </div>
            `; 
        break;
     
        case 'submit':
          cadena +=`
            <div class="form_columna_submit ${clase}">
              <label  class="form_columna_fila_mensaje ${fil}_L">${titulo}</label>
              <input type="${fila.input}" 
                class="form_columna_fila_input" 
                name="${fil}"
                id="${this.id}_${fil}"
                value = "${valor}">
            </div>
          `; 
        break;
  
        case 'select':
          cadena +=`
            <div class="form_columna_fila ${clase}">
              <label  class="form_columna_fila_label ${fil}_L">${titulo}</label>
              <select class="form_columna_fila_input"
               name="${fil}"
               ${requerido}
               ${evento}
               ${multiple}
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
            <div class="form_columna_fila ${clase}">
              <label  class="form_columna_fila_label ${fil}_L">${titulo}</label>
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
            <div class="form_columna_fila ${clase}">
              <label  class="form_columna_fila_label ${fil}_L">${titulo}</label>
                <textarea  
                  class="form_columna_fila_textarea" 
                  rows="5" 
                  cols="50"                  
                  placeholder="${placeholder}"
                  id="${this.id}_${fil}"
                  name="${fil}"
                  maxlength = "${maxlength}"
                  required>${valor}</textarea>
            </div>
          `; 
        break;
      
        case 'button':
          cadena +=`
            <div class="form_columna_submit ${clase}">
              <label  class="form_columna_fila_mensaje ${fil}_L">${titulo}</label>
              <input type="${fila.input}" 
                class="form_columna_fila_input" 
                name="${fil}"
                id="${this.id}_${fil}"
                value = ${valor}>
            </div>
          `; 
        break;

        case 'checkbox':
          cadena +=`
            <div class="form_columna_fila ${clase}">
              <label  class="form_columna_fila_label ${fil}_L">${titulo}</label>
              <input type="${fila.input}" 
                class="form_columna_fila_input c_box" 
                name="${fil}"
                id="${this.id}_${fil}"
                placeholder="${placeholder}"
                ${requerido}
                value = ${valor}>
            </div>
          `; 
        break;      
        
        case 'radio':
          cadena +=`
            <div class="form_columna_fila ${clase}">                           
          `; 
          if(fila.options != null){
            for(var option of fila.options){
              cadena+=`
                <div class="div_radio">
                  <label  class="form_columna_fila_label radio_l ${fil}_L">${option.titulo}</label>
                  <input  type="radio" 
                  class="${this.id}_inp_radio"
                  name = "${fil}"
                  value="${option.valor}">
                </div>
              `;
            }
          }
          
            cadena+= `</div>`;
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
          justify-content: center;
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
          height:  26px;
          padding: 4px;
          width:65%;
          box-sizing: border-box;
          min-width: 150px;
          color: #555;
          border: solid #ccc 1px;
          border-radius: 5px;
          margin:0px;
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
        /*
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
        }*/
        #${this.id} .form_columna_fila .c_box{
          height: 16px;
        }

        #${this.id} .form_columna_fila .div_radio{
          display: flex;
          width: 100%;
          margin: 2px;
        }

        #${this.id} .radio_l{
          width: 80%;
        }
        .${this.id}_inp_radio{
          width: 10%;
        }

        .OFF_form{
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
      if(input.type == 'checkbox'){
        input.checked=false;
      }    
    }
    for(var text of listaText){
      if(text != null)text.value='';    
      }
    for(var select of listSelect){
      if(select != null)select.selectedIndex = 0;  
    } 
  }
  
  AgregarDatos(datos){
    //carga dato al formulario, el nombre del campo deve ser 
    //igual al nombre ingresado en el input
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
       switch (objt.type) {
         case 'text':
          objt.value = datos[dato];
         break;

         case 'number':
          objt.value = datos[dato];
         break;

         case 'checkbox':           
          objt.checked = datos[dato]=='1'?true:false;
         break;
       
         default:
           break;
       }
        
      }
    }
    
  } 

  visible(estado){
    const formulario = document.getElementById(this.id);
    if(!estado){
      formulario.style.display='none';
    }else{
      formulario.style.display='flex';
    }
  } 

  disabledAll(estado){
    for(var col in this.columnas ){
      for(var fil in this.columnas[col]){
        document.getElementById(`${this.id}_${fil}`).disabled=estado;
      }
    }
  }
  
}
  
  
  
  /*-----------------------------------------------*/
  /*-----------------------------------------------*/
  //      EJEMPLO DE OBJETO JAVASCRIPT
  /*-----------------------------------------------*/
  /*-----------------------------------------------*/
  var form_config =new FORM({id:'form_config'});
  
  //Ejemplo 1
  function Loadform_config(){
    const contenedor = document.querySelector('#contenedor_Form_Configuracion');
    //Campos del formulario
      var datosLeft = [];
      var datosRight = [];
      var Boton = [];
      datosLeft['nombre']={
        titulo:'Nombre:',
        input:'text',
        valor:''  ,
        required:true,
        evento:'onkeyup="Mayusculas(event)"',
        maxlength:"39"
      };    
      datosLeft['descripcion']={
        titulo:'Descripcion',
        input:'text',
        valor:''  ,
        required:true,
        evento:'onkeyup="Mayusculas(event)"',
        maxlength:"149"
      };
      datosLeft['delega']={
        titulo:'Permitir que alguien mas conteste:',
        input:'checkbox',
        valor:''  
      };
      datosRight['confirmar']={
        titulo:'Usar limite de tiempo:',
        input:'checkbox',
        valor:''  
      };
      datosRight['tiempo']={
          titulo:'Tempo limite en segundos',
          input:'number',
          valor:'',
          max:'99999'  
      };
      Boton['guardar']={
        titulo:'',
        input:'submit',
        valor:'Guardar'  
      }; 
      form_config.setColumna('columnaLeft','48%',datosLeft);
      form_config.setColumna('columnaRight','48%',datosRight);
      form_config.setColumna('columnaBoton','100%',Boton);
      form_config.pintarForm(contenedor);
  
      const tiempoL = form_config.getInput('tiempo');
      tiempoL.disabled = true;
      tiempoL.value =0;
  
      //agregar evento al check box de tiempo
      form_config.getInput('confirmar').addEventListener('click',ActivarTiempo);
  }

  //Ejemplo 2
  function load_Form_CargarLista(){
    const contenedor = document.querySelector('#cont_CargarListas');
    //Campos del formulario
    var inputs = [];
    inputs['no_lista'] = {
      titulo: 'Por favor ingresa el codigo:',
      input: 'text',
      valor: '',
      required: true,
      evento: 'onkeyup="Mayusculas(event)"',
      maxlength: "11"
    };
    
    form_CargarLista.setSubmmit('AgregarExpositorInterno(event)');
    form_CargarLista.setColumna('columnaUnica','90%',inputs);
    form_CargarLista.pintarForm(contenedor);
    form_CargarLista.getLabel('no_lista').style.width='40%';
    form_CargarLista.getInput('no_lista').style.width='55%';
  }

  //Ejemplo 3
  function load_Form_Audiencia(){
    const contenedor = document.querySelector('#cont_Audiencia');
    //Campos del formulario
    var inputs = [];
    inputs['audiancia_tipo']={		
      input:'radio',		
      options: [
        {
          valor:'interno',
          titulo:'Colaborador activo Tresguerras'				
        },
        {
          valor:'candidato',
          titulo:'Aspirante a entrar a Tresguerras'				
        },
        {
          valor:'externo',
          titulo:'Externo a Tresguerras'				
        },
    
      ] 
    };
   
    form_Audiencia.setColumna('columnaUnica','90%',inputs);
    form_Audiencia.pintarForm(contenedor);  
  
  }