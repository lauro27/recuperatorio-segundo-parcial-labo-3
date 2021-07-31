"use strict";
var personas;
(function (personas) {
    function $(id) { return document.getElementById(id); }
    window.addEventListener("load", function () {
        var _a, _b, _c, _d, _e, _f;
        (_a = $("filtroSexo")) === null || _a === void 0 ? void 0 : _a.addEventListener("change", filtrarPersonas);
        (_b = $("idCheck")) === null || _b === void 0 ? void 0 : _b.addEventListener("change", function () { mostrarOcultarColumna(0, $("idCheck").checked); });
        (_c = $("NombreCheck")) === null || _c === void 0 ? void 0 : _c.addEventListener("change", function () { mostrarOcultarColumna(1, $("NombreCheck").checked); });
        (_d = $("ApellidoCheck")) === null || _d === void 0 ? void 0 : _d.addEventListener("change", function () { mostrarOcultarColumna(2, $("ApellidoCheck").checked); });
        (_e = $("EdadCheck")) === null || _e === void 0 ? void 0 : _e.addEventListener("change", function () { mostrarOcultarColumna(3, $("EdadCheck").checked); });
        (_f = $("SexoCheck")) === null || _f === void 0 ? void 0 : _f.addEventListener("change", function () { mostrarOcultarColumna(4, $("SexoCheck").checked); });
        if (localStorage.getItem("array") == null) {
            this.localStorage.setItem("array", JSON.stringify([]));
        }
        rehacerTabla(JSON.parse(this.localStorage.getItem("array")));
    });
    //DONE
    function mostrarOcultarColumna(col_num, do_show) {
        let tabla = $("tabla");
        var col = tabla.getElementsByTagName('col')[col_num];
        if (col) {
            col.style.visibility = do_show ? "" : "collapse";
        }
    }
    //DONE
    function filtrarPersonas() {
        var filtrados;
        let promesa = new Promise(function (resuelto, fallido) {
            var tipo = $("filtroSexo").value;
            if (tipo == "masculino") {
                filtrados = JSON.parse(localStorage.getItem("array")).filter(item => item.sexo == personas.Sexo.masculino);
            }
            else if (tipo == "femenino") {
                filtrados = JSON.parse(localStorage.getItem("array")).filter(item => item.sexo == personas.Sexo.femenino);
            }
            else if (tipo == "otros") {
                filtrados = JSON.parse(localStorage.getItem("array")).filter(item => item.sexo == personas.Sexo.otros);
            }
            else if (tipo == "todos") {
                filtrados = JSON.parse(localStorage.getItem("array"));
            }
            else {
                fallido();
            }
            resuelto("ok");
        });
        promesa.then(function () { rehacerTabla(filtrados); }, function () { alert("Error en filtrado"); });
    }
    //DONE
    function agregar() {
        var id;
        let data = JSON.parse(localStorage.getItem("array"));
        if (data.length == 0) {
            id = 1;
        }
        else {
            var auxData = data;
            id = auxData.reduce(function (max, item) {
                if (item.id >= max) {
                    return item.id + 1;
                }
                return max;
            }, 0);
            if (id == 0) {
                id + 1;
            }
        }
        var nombre = $("txtNombre").value;
        var apellido = $("txtApellido").value;
        var edad = parseInt($("numEdad").value);
        var sexo = $("sexoSelect").value;
        var cSexo;
        switch (sexo) {
            case "masculino":
                cSexo = personas.Sexo.masculino;
                break;
            case "femenino":
                cSexo = personas.Sexo.femenino;
                break;
            default:
                cSexo = personas.Sexo.otros;
                break;
        }
        var cliente = new personas.Cliente(id, nombre, apellido, edad, cSexo);
        data.push(cliente);
        localStorage.setItem("array", JSON.stringify(data));
        rehacerTabla(data);
    }
    personas.agregar = agregar;
    //DONE
    function calcularPromedio() {
        var tabla = $("tCuerpo");
        var total = 0;
        let promesaPromedio = new Promise(function (exito, fracaso) {
            var rows = tabla.getElementsByTagName("tr");
            for (let i = 0; i < rows.length; i++) {
                const element = rows[i].cells[rows[i].cells.length - 2].innerText;
                total += parseInt(element);
            }
            if (rows.length == 0) {
                fracaso();
            }
            else {
                exito(rows.length);
            }
        });
        promesaPromedio.then(function (value) {
            total /= value;
            $("txtPromedio").value = total.toString();
        }, function () {
            alert("Error: No hay datos");
        });
    }
    personas.calcularPromedio = calcularPromedio;
    //DONE
    function rehacerTabla(lista) {
        var tabla = $("tCuerpo");
        while (tabla.rows.length > 0) {
            tabla.removeChild(tabla.childNodes[0]);
        }
        console.log(lista);
        for (const item of lista) {
            let row = document.createElement("tr");
            for (const param in item) {
                if (param.toString() != "constructor") {
                    let td = document.createElement("td");
                    if (param == "sexo") {
                        td.appendChild(document.createTextNode(personas.Sexo[item[param]]));
                    }
                    else {
                        td.appendChild(document.createTextNode(item[param]));
                    }
                    row.appendChild(td);
                }
            }
            row.addEventListener("click", function () {
                $("txtId").value = row.cells[0].innerText;
                $("txtNombre").value = row.cells[1].innerText;
                $("txtApellido").value = row.cells[2].innerText;
                $("numEdad").value = row.cells[3].innerText;
                $("sexoSelect").value = row.cells[4].innerText;
            });
            tabla.appendChild(row);
        }
    }
    //DONE
    function eliminarDeTabla() {
        var data = JSON.parse(localStorage.getItem("array"));
        var id = parseInt($("txtId").value);
        for (const item of data) {
            if (item.id == id) {
                data.splice(data.indexOf(item), 1);
                break;
            }
        }
        localStorage.setItem("array", JSON.stringify(data));
        rehacerTabla(data);
    }
    personas.eliminarDeTabla = eliminarDeTabla;
    //DONE
    function haltAndCatchFire() {
        localStorage.setItem("array", JSON.stringify([]));
        rehacerTabla(JSON.parse(localStorage.getItem("array")));
    }
    personas.haltAndCatchFire = haltAndCatchFire;
})(personas || (personas = {}));
