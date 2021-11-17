class Persona {
    constructor(cedula, nombre, apellido, nombreUsuario, contraseña) {
        this.cedula = cedula;
        this.nombre = nombre;
        this.apellido = apellido;
        this.nombreUsuario = nombreUsuario;
        this.contraseña = contraseña;
    }
}

class Empresa {
    constructor(rut, razonSocial, nombreFantasia, nombreUsuario, contraseña, vehiculo) {
        this.rut = rut;
        this.razonSocial = razonSocial;
        this.nombreFantasia = nombreFantasia;
        this.nombreUsuario = nombreUsuario;
        this.contraseña = contraseña;
        this.vehiculo = vehiculo;
        this.estado = 'DESHABILITADA';
    }
}

let id = 1;
class Vehiculo {
    constructor(nombre) {
        this.id = id;
        this.nombre = nombre;
        id++;
    }
}

class Solicitudes {
    constructor(distancia, vehiculo, descripcion, foto, usuario) {
        this.distancia = distancia;
        this.vehiculo = vehiculo;
        this.descripcion = descripcion;
        this.foto = foto;
        this.usuario = usuario;
        this.estado = "PENDIENTE";
        this.empresaEncargada = "NINGUNA";
    }
}

class Cliente {
    constructor(nombre, cantidad) {
        this.nombre = nombre;
        this.cantidad = cantidad;
    }
}
