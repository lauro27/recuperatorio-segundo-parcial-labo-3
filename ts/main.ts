namespace personas{
    function $(id: string){return document.getElementById(id);}
    
    window.addEventListener("load", function(){
        $("filtroSexo")?.addEventListener("change", filtrarPersonas);
        
        $("idCheck")?.addEventListener("change", function(){mostrarOcultarColumna(0, (<HTMLInputElement>$("idCheck")).checked);})
        $("NombreCheck")?.addEventListener("change", function(){mostrarOcultarColumna(1, (<HTMLInputElement>$("NombreCheck")).checked);})
        $("ApellidoCheck")?.addEventListener("change", function(){mostrarOcultarColumna(2, (<HTMLInputElement>$("ApellidoCheck")).checked);})
        $("EdadCheck")?.addEventListener("change", function(){mostrarOcultarColumna(3, (<HTMLInputElement>$("EdadCheck")).checked);})
        $("SexoCheck")?.addEventListener("change", function(){mostrarOcultarColumna(4, (<HTMLInputElement>$("SexoCheck")).checked);})
    })
    
    //DONE
    function mostrarOcultarColumna(col_num :number, do_show: boolean) {
        let tabla= <HTMLInputElement>$("tabla");
        var col = tabla.getElementsByTagName('col')[col_num];
        if (col) {
            
            col.style.visibility=do_show?"":"collapse";
        }
    }
    //FALTA ARRAY
    function filtrarPersonas(){
        var tipo = (<HTMLInputElement>$("filtroSexo")).value;
        
        if(tipo=="masculino"){
            var filtrados = INSERTARRAYHERE.filter(item=> item.hasOwnProperty("cantidadPuertas"));
        }else if(tipo=="femenino"){
            var filtrados = INSERTARRAYHERE.filter(item=> item.hasOwnProperty("cuatroXcuatro"));
        }else{
            var filtrados = INSERTARRAYHERE;
        }
        rehacerTabla(filtrados);
    }
    
    //FALTA ARRAY
    export function agregar(){
        var id;
        let data = INSERTARRAYHERE;
        if(data.length == 0){
            id = 1;
        }
        else{
            var auxData = data;
            id = auxData.reduce(function(max, item){
                if(item.id >= max){
                    return item.id +1;
                }
                return max;
            }, 0);
            if (id== 0){
                id + 1;
            }
        }
        
        var nombre = (<HTMLInputElement>$("txtNombre")).value;
        var apellido = (<HTMLInputElement>$("txtApellido")).value;
        var edad = parseInt((<HTMLInputElement>$("numEdad")).value);
        var sexo = (<HTMLInputElement>$("sexoSelect")).value;
        var cSexo : Sexo;
        switch (sexo) {
            case "masculino":
            cSexo = Sexo.masculino;
            break;
            case "femenino":
            cSexo = Sexo.femenino;
            break;
            default:
            cSexo = Sexo.otros;
            break;
        }
        
        var cliente: Cliente = new Cliente(id, nombre, apellido, edad, cSexo)
        
        UPDATEARRAYHERE
        
        rehacerTabla(data);
    }
    
    //DOME
    export function calcularPromedio(){
        var tabla: HTMLTableElement = <HTMLTableElement>$("tCuerpo");
        var total: number = 0;
        var rows = tabla.getElementsByTagName("tr");
        for (let i = 0; i < rows.length; i++) {
            const element = rows[i].cells[rows[i].cells.length-2].innerText;
            total += parseInt(element);
        }
        total /= rows.length;
        (<HTMLInputElement>$("txtPromedio")).value = total.toString();
    }
    
    function rehacerTabla(lista: Array<Cliente>){
        var tabla: HTMLTableElement = <HTMLTableElement>$("tCuerpo");
        
        while(tabla.rows.length>0){
            tabla.removeChild(tabla.childNodes[0]);
        }

        for(const item of lista){
            var row: HTMLTableRowElement = document.createElement("tr");
            for(const param in item){
                if(param.toString() != "constructor"){
                  let td: HTMLTableDataCellElement = document.createElement("td");
                  td.appendChild(document.createTextNode(item[param]));
                  row.appendChild(td);
                }
              }
              row.addEventListener("click", function(){
                (<HTMLInputElement>$("txtId")).value =  row.cells[0].innerText;
                (<HTMLInputElement>$("txtNombre")).value =  row.cells[1].innerText;
                (<HTMLInputElement>$("txtApellido")).value =  row.cells[2].innerText;
                (<HTMLInputElement>$("numEdad")).value =  row.cells[3].innerText;
                (<HTMLInputElement>$("sexoSelect")).value =  row.cells[4].innerText;
              });
              

    }
}
}