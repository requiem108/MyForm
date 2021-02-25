<?php
/*------------------------------------------------------------------------------
* Archivo             : wbpa17_Rest.php
* Sistema             : WB - SISTEMAS DE INVENTARIOS
* Titulo              : Entrega de Uniformes Operativo solo para observaciones
* Tipo                : php
* Fecha Creacion      : 06/12/2019
* Version             : 1.0
* Fecha Actualizacion : --/--/----
* Realizado por       : Miguel Angel Leon Martinez.
*Actualizado por      : ------------------------.
*-------------------------------------------------------------------------------*/



#-------------------------------------------------
#    INDICE DE FUNCIONES
#-------------------------------------------------

$json = json_decode(file_get_contents('php://input'), true);

//print_r($json);
switch ($json[0]['origen']) {
  case 'NewOpcionMultiple':
    echo NewOpcionMultiple($json);
  break;
 default:
  echo 'No ingreso a ninguno';
};  

#-------------------------------------------------
#    FUNCIONES
#-------------------------------------------------

function NewOpcionMultiple($json){
    $cadena='';
    $contador=0;
    $estados =  array();
    $opciones = array();
    

   foreach($json as $arreglos){
    foreach($arreglos as $clave =>$valor ){
      $te .= "{$clave} es {$valor} ///";

      //Guardar opciones
      if($clave !='origen'){
        if($clave=='estado'){
          $estados[] = $valor;
        }else if($clave == 'opcion'){
          $opciones[] = $valor;
        }
      }


    }
    
   }
   NewOpcionMultiple_Opciones($estados,$opciones);

   return $te;

}
function NewOpcionMultiple_Opciones($estados,$opciones){
  $cont = 0;
  foreach($estados as $estado =>$valor){
    $Sql .= "estado".$valor."opcion".$opciones[$cont];
    $cont++;
  }

  
}