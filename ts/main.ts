namespace personas{
    function $(id: string){return document.getElementById(id);}
    
    window.addEventListener("load", function(){
        $("filtroSexo")?.addEventListener("change", filtrarPersonas);
        
        $("idCheck")?.addEventListener("change", function(){mostrarOcultarColumna(0, (<HTMLInputElement>$("idCheck")).checked);})
        $("NombreCheck")?.addEventListener("change", function(){mostrarOcultarColumna(1, (<HTMLInputElement>$("NombreCheck")).checked);})
        $("ApellidoCheck")?.addEventListener("change", function(){mostrarOcultarColumna(2, (<HTMLInputElement>$("ApellidoCheck")).checked);})
        $("EdadCheck")?.addEventListener("change", function(){mostrarOcultarColumna(3, (<HTMLInputElement>$("EdadCheck")).checked);})
        $("SexoCheck")?.addEventListener("change", function(){mostrarOcultarColumna(4, (<HTMLInputElement>$("SexoCheck")).checked);})
        
        if(localStorage.getItem("array") == null)
        {
            this.localStorage.setItem("array", JSON.stringify([]));
        }
        
        rehacerTabla(JSON.parse(this.localStorage.getItem("array")!));
    })
    
    //DONE
    function mostrarOcultarColumna(col_num :number, do_show: boolean) {
        let tabla= <HTMLInputElement>$("tabla");
        var col = tabla.getElementsByTagName('col')[col_num];
        if (col) {
            
            col.style.visibility=do_show?"":"collapse";
        }
    }
    
    //DONE
    function filtrarPersonas(){
        var filtrados;
        let promesa = new Promise(function(resuelto, fallido){
            var tipo = (<HTMLInputElement>$("filtroSexo")).value;
            
            if(tipo=="masculino"){
                filtrados = JSON.parse(localStorage.getItem("array")!).filter(item=> item.sexo == Sexo.masculino);
            }else if(tipo=="femenino"){
                filtrados = JSON.parse(localStorage.getItem("array")!).filter(item=> item.sexo == Sexo.femenino);
            }else if(tipo=="otros"){
                filtrados = JSON.parse(localStorage.getItem("array")!).filter(item=> item.sexo == Sexo.otros);
            }else if(tipo=="todos"){
                filtrados = JSON.parse(localStorage.getItem("array")!);
            }else{
                fallido();
            }
            resuelto("ok");
        });
        promesa.then(
            function(){rehacerTabla(filtrados);},
            function(){alert("Error en filtrado");}
            );
        }
        
        //DONE
        export function agregar(){
            var id;
            let data = JSON.parse(localStorage.getItem("array")!);
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
            
            data.push(cliente);
            localStorage.setItem("array", JSON.stringify(data)!);
            
            rehacerTabla(data);
        }
        
        //DONE
        export function calcularPromedio(){
            var tabla: HTMLTableElement = <HTMLTableElement>$("tCuerpo");
            var total: number = 0;
            let promesaPromedio = new Promise(function (exito, fracaso){
                var rows = tabla.getElementsByTagName("tr");
                for (let i = 0; i < rows.length; i++) {
                    const element = rows[i].cells[rows[i].cells.length-2].innerText;
                    total += parseInt(element);
                }
                if(rows.length == 0){
                    fracaso();
                }
                else{
                    exito(rows.length);
                }
            });
            promesaPromedio.then(
                function(value){
                    total /= <number>value;
                    (<HTMLInputElement>$("txtPromedio")).value = total.toString();
                },
                function(){
                    alert("Error: No hay datos");
                }
                )
                
            }
            
            //DONE
            function rehacerTabla(lista: Array<Cliente>){
                var tabla: HTMLTableElement = <HTMLTableElement>$("tCuerpo");
                
                while(tabla.rows.length>0){
                    tabla.removeChild(tabla.childNodes[0]);
                }
                console.log(lista);
                for(const item of lista){
                    let row: HTMLTableRowElement = document.createElement("tr");
                    for(const param in item){
                        if(param.toString() != "constructor"){
                            let td: HTMLTableDataCellElement = document.createElement("td");
                            if(param == "sexo"){
                                td.appendChild(document.createTextNode(Sexo[item[param]]));
                            }else{
                                td.appendChild(document.createTextNode(item[param]));
                            }
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
                    tabla.appendChild(row); 
                }
            }
            
            //DONE
            export function eliminarDeTabla(){
                var data :Array<Cliente>= JSON.parse(localStorage.getItem("array")!)
                var id = parseInt((<HTMLInputElement>$("txtId")).value);
                for (const item of data) {
                    if(item.id == id){
                        data.splice(data.indexOf(item), 1);
                        break;
                    }
                }
                localStorage.setItem("array", JSON.stringify(data));
                rehacerTabla(data);
            }
            
            //DONE
            export function haltAndCatchFire(){
                localStorage.setItem("array", JSON.stringify([]));
                rehacerTabla(JSON.parse(localStorage.getItem("array")!))
            }
        }