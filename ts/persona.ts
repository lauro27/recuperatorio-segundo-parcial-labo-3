namespace personas{
    export enum Sexo{
        masculino,
        femenino,
        otros
    }

    export class Persona{
        id: number = 0;
        nombre: string = "";
        apellido: string ="";
        constructor(i: number, nom: string, ape: string){
            this.id = i;
            this.nombre = nom;
            this.apellido = ape;
        }

    }
    export class Cliente extends Persona{
        edad: number = 0;
        sexo: Sexo= Sexo.otros;
        constructor(i: number, nom: string, ape: string, edad: number, se: Sexo){
            super(i, nom, ape);
            this.edad = edad;
            this.sexo = se;
        }
    }
}