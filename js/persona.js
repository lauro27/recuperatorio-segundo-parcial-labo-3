"use strict";
var personas;
(function (personas) {
    let Sexo;
    (function (Sexo) {
        Sexo[Sexo["masculino"] = 0] = "masculino";
        Sexo[Sexo["femenino"] = 1] = "femenino";
        Sexo[Sexo["otros"] = 2] = "otros";
    })(Sexo = personas.Sexo || (personas.Sexo = {}));
    class Persona {
        constructor(i, nom, ape) {
            this.id = 0;
            this.nombre = "";
            this.apellido = "";
            this.id = i;
            this.nombre = nom;
            this.apellido = ape;
        }
    }
    personas.Persona = Persona;
    class Cliente extends Persona {
        constructor(i, nom, ape, edad, se) {
            super(i, nom, ape);
            this.edad = 0;
            this.sexo = Sexo.otros;
            this.edad = edad;
            this.sexo = se;
        }
    }
    personas.Cliente = Cliente;
})(personas || (personas = {}));
