window.addEventListener('load', inicio);

function inicio() {
    //Ocultar/mostrar formularios de ingreso y registro.
    document.querySelector("#btnIngreso").addEventListener("click", ingreso);
    document.querySelector("#btnHaciaRegistroEmpresa").addEventListener("click", mostrarRegistroEmpresa);
    document.querySelector("#btnHaciaRegistroPersona").addEventListener("click", mostrarRegistroPersona);
    document.querySelector("#btnHaciaIngresoDesdeEmpresa").addEventListener("click", mostrarLogin);
    document.querySelector("#btnHaciaIngresoDesdePersona").addEventListener("click", mostrarLogin);
    //Administrador
    document.querySelector("#btnEmpresasAdministrador").addEventListener("click", mostrarEmpresasAdministrador);
    document.querySelector("#btnVehiculosAdministrador").addEventListener("click", vehiculosAdministrador);
    document.querySelector("#ingresarVehiculo").addEventListener("click", ingresarVehiculo);
    document.querySelector("#btnSalirDeAdministrador").addEventListener("click", cerrarSesion);
    document.querySelector("#buscarEmpresa").addEventListener("keyup", buscarEmpresa);
    document.querySelector("#btnEstadisticasAdministrador").addEventListener("click", mostrarEstadisticasAdministrador);
    //PERSONA
    document.querySelector("#btnRegistroPersona").addEventListener("click", registroPersona);
    document.querySelector("#btnFormularioEnvio").addEventListener("click", mostrarPersona);
    document.querySelector("#btnSolicitarEnvio").addEventListener("click", solicitarEnvio);
    document.querySelector("#btnMisSolicitudes").addEventListener("click", misSolicitudes);
    document.querySelector("#btnSalirDePersona").addEventListener("click", cerrarSesion);
    document.querySelector("#btnEstadisticasPersona").addEventListener("click", estadisticasPersona);
    //EMPRESA
    document.querySelector("#btnRegistroEmpresa").addEventListener("click", registroEmpresa);
    document.querySelector("#btnSolicitudesDisponibles").addEventListener("click", mostrarEmpresa);
    document.querySelector("#btnSolicitudesDisponibles").addEventListener("click", solicitudesDisponibles);
    document.querySelector("#btnSolicitudesTomadas").addEventListener("click", solicitudesTomadas);
    document.querySelector("#btnEstadisticasEmpresa").addEventListener("click", mostrarEstadisticasEmpresa);
    document.querySelector("#btnSalirDeEmpresa").addEventListener("click", cerrarSesion);
    document.querySelector("#cantidadEnvios").addEventListener("change", mostrarCantidad);

    preCargaDatos();
    ocultarTodo();
    mostrarLogin();
}

//Ocultar y mostrar secciones
function ocultarTodo() {
    document.querySelector("#ingreso").style.display = "none";
    document.querySelector("#registroPersona").style.display = "none";
    document.querySelector("#registroEmpresa").style.display = "none";
    document.querySelector("#administrador").style.display = "none";
    document.querySelector("#ingresoVehiculos").style.display = "none";
    document.querySelector("#persona").style.display = "none";
    document.querySelector("#formularioEnvios").style.display = "none";
    document.querySelector("#tablaPersona").style.display = "none";
    document.querySelector("#empresa").style.display = "none";
    document.querySelector("#tablaEmpresa").style.display = 'none';
    document.querySelector("#estadisticasEmpresa").style.display = 'none';
    document.querySelector("#empresa").style.display = "none";
}

function mostrarLogin() {
    document.querySelector("#formularioIngreso").reset();
    ocultarTodo();
    document.querySelector("#ingreso").style.display = "block";
}

function cerrarSesion() {
    usuarioActivo = null;
    ocultarTodo();
    mostrarLogin();
}

function mostrarRegistroEmpresa() {
    ocultarTodo();
    document.querySelector("#registroEmpresa").style.display = "block";
    cargarSelectVehiculos('vehiculos');
}

function mostrarRegistroPersona() {
    ocultarTodo();
    document.querySelector("#registroPersona").style.display = "block";
}

function mostrarEmpresasAdministrador() {
    ocultarTodo();
    document.querySelector("#administrador").style.display = "block";
    document.querySelector("#ingresoVehiculos").style.display = 'none';
    document.querySelector("#buscarEmpresa").value = "";
    buscarEmpresa(" ");
}

function mostrarEstadisticasAdministrador() {
    ocultarTodo();
    estadisticasAdministrador();
    document.querySelector("#administrador").style.display = "block";
}

function mostrarPersona() {
    ocultarTodo();
    document.querySelector("#persona").style.display = "block";
    document.querySelector("#formularioEnvios").style.display = "block";
    cargarSelectVehiculos('vehiculoEnvio');
}

function mostrarMisSolicitudes() {
    ocultarTodo();
    document.querySelector("#persona").style.display = "block";
    document.querySelector("#tablaPersona").style.display = "block";
}

function mostrarEstadisticasPersona() {
    ocultarTodo();
    document.querySelector("#persona").style.display = "block";
    document.querySelector("#tablaPersona").style.display = "block";
}

function mostrarEmpresa() {
    ocultarTodo();
    document.querySelector("#empresa").style.display = "block";
    document.querySelector("#tablaEmpresa").style.display = "block";
    solicitudesDisponibles();
}

function mostrarSolicitudesTomadasEmpresa() {
    ocultarTodo();
    document.querySelector("#empresa").style.display = "block";
    document.querySelector("#tablaEmpresa").style.display = "block";
}

function mostrarEstadisticasEmpresa() {
    ocultarTodo();
    document.querySelector("#empresa").style.display = "block";
    document.querySelector("#estadisticasEmpresa").style.display = "block";
    estadisticasEmpresa();
}

//Toma los datos que ingresa el usuario en la pantalla de ingreso y verifica
// que el nombre y la contrasena sean correctos.
function ingreso() {
    let perfil = document.querySelector("#perfil").value;
    let nombreUsuario = document.querySelector("#nombreUsuario").value;
    let contraseñaUsuario = document.querySelector("#contraseñaUsuario").value;

    let arregloIngreso = [nombreUsuario, contraseñaUsuario];

    if (!verificarCamposObligatorios(arregloIngreso)) {
        alert("TODOS LOS CAMPOS SON OBLIGATORIOS");
    } else {
        switch (perfil) {
            case "persona":
                if (verificacionIngreso(nombreUsuario, contraseñaUsuario, "persona")) {
                    mostrarPersona();
                    document.querySelector("#nombrePersonaActual").innerHTML = `${usuarioActivo.nombreUsuario}`;
                } else {
                    alert("DATOS INCORRECTOS");
                };
                break;
            case "empresa":
                if (verificacionIngreso(nombreUsuario, contraseñaUsuario, "empresa")) {
                    mostrarEmpresa();
                    document.querySelector("#nombreEmpresaActual").innerHTML = `${usuarioActivo.nombreUsuario}`;
                } else {
                    alert("INCORRECTO Y/O AUN NO ESTAS HABILITADO");
                };
                break;
            default:
                if (nombreUsuario == "Admin" && contraseñaUsuario == "Admin01") {
                    mostrarEmpresasAdministrador();
                } else {
                    alert("DATOS INCORRECTOS");
                }
        }
    }
}

//Toma los datos del usuario persona del DOM, evalua que ningun campo haya quedado sin completar.
// verificando paso a paso que cumpla todas las validaciones.
// Si todo es correcto, invoca a la funcion guardarDatosPersona, y crea un perfil de tipo persona.
// guardandolo en el arreglo datosPersonas.
function registroPersona() {
    let cedula = document.querySelector("#cedula").value;
    let nombre = document.querySelector("#nombre").value;
    let apellido = document.querySelector("#apellido").value;
    let nombreUsuario = document.querySelector("#nombreUsuarioPersona").value;
    let contraseña = document.querySelector("#contraseñaPersona").value;

    let arregloPersona = [cedula, nombre, apellido, nombreUsuario, contraseña];

    if (verificarCamposObligatorios(arregloPersona)) {
        if (verificarDatos(nombreUsuario, "nombreUsuario", datosEmpresas) && verificarDatos(nombreUsuario, "nombreUsuario", datosPersonas)) {
            if (verificarPassword(contraseña)) {
                guardarDatosPersona(cedula, nombre, apellido, nombreUsuario, contraseña);
                document.querySelector("#formularioPersona").reset();
                alert("REGISTRO EXITOSO");
            } else {
                alert("LA CONTRASEÑA DEBE TENER UN MINIMO DE 6 CARACTERES, AL MENOS 1 MINUSCULA, 1 MAYUSCULA Y 1 NUMERO.");
            }
        } else {
            alert("ELIGE OTRO NOMBRE DE USUARIO");
        }
    } else {
        alert("TODOS LOS CAMPOS SON OBLIGATORIOS");
    }
}

//Toma los datos del usuario empresa del DOM y evalua que ningun campo haya quedado sin completar.
// verificando paso a paso que cumpla todas las validaciones.
// Si todo es correcto, invoca a la funcion guardarDatosEmpresa, y crea un perfil de tipo empresa.
// guardandolo en el arreglo datosEmpresas.
function registroEmpresa() {
    let rut = (document.querySelector("#rut").value).toString();
    let razonSocial = document.querySelector("#razonSocial").value;
    let nombre = document.querySelector("#nombreEmpresa").value;
    let nombreUsuario = document.querySelector("#nombreUsuarioEmpresa").value;
    let contraseña = document.querySelector("#contraseñaEmpresa").value;
    let vehiculo = document.querySelector("#vehiculos").value;

    let arregloEmpresa = [rut, razonSocial, nombre, nombreUsuario, contraseña, vehiculo];

    if (verificarCamposObligatorios(arregloEmpresa)) {
        if (verificarDatos(rut, "rut", datosEmpresas)) {
            if (verificarDatos(razonSocial, "razonSocial", datosEmpresas)) {
                if (verificarDatos(nombreUsuario, "nombreUsuario", datosEmpresas) && verificarDatos(nombreUsuario, "nombreUsuario", datosPersonas)) {
                    if (verificarPassword(contraseña)) {
                        guardarDatosEmpresa(rut, razonSocial, nombre, nombreUsuario, contraseña, vehiculo);
                        document.querySelector("#formularioEmpresa").reset();
                        alert("REGISTRO EXITOSO");
                    } else {
                        alert("LA CONTRASEÑA DEBE TENER UN MINIMO DE 6 CARACTERES, AL MENOS 1 MINUSCULA, 1 MAYUSCULA Y 1 NUMERO.");
                    }
                } else {
                    alert("NOMBRE DE USUARIO YA EXISTENTE");
                }
            } else {
                alert("RAZON SOCIAL YA EXISTENTE");
            }
        } else {
            alert("NUMERO DE RUT YA EXISTENTE");
        }
    } else {
        alert("TODOS LOS CAMPOS SON OBLIGATORIOS");
    }
}

//-------------------------------------------------------------ADMINISTRADOR------------------------------------------------------------//

//Cuando queremos armar una tabla con botones (administrador y empresa son lo que tendran tablas con botones ), al armarla guardamos el indice de cada elemento que se va a mostrar en la tabla aqui,
//para que cuando se apriete el boton correspondiente al elmento, concuerde con la posicion original del elemento en el arreglo en el que esta guardado.
let posicion = [];

//Muestra en pantalla las empresas registradas al administrador.
//Tambien cuando el administrador hace una busqueda, actualiza la tabla mostrando
//las empresas que cumplen el criterio de busqueda.
function buscarEmpresa() {
    document.querySelector("#ingresoVehiculos").style.display = 'none';
    let empresaABuscar = document.querySelector("#buscarEmpresa").value;
    let tabla = crearTablaYBuscador(empresaABuscar);
    document.querySelector("#tablaAdministrador").innerHTML = `${tabla}`;
    //Se toma la longitud de botones en el dom y al presionar uno de ellos se podra cambiar el estado de la empresa.
    let botonesLongitud = document.querySelectorAll(".btnHabilitacion").length;
    for (let i = 0; i < botonesLongitud; i++) {
        document.querySelectorAll(".btnHabilitacion")[i].addEventListener("click", function () {
            let index = posicion[i];
            if (datosEmpresas[index].estado == "DESHABILITADA") {
                datosEmpresas[index].estado = "HABILITADA";
            } else {
                datosEmpresas[index].estado = "DESHABILITADA";
            }
            buscarEmpresa();
        })
    }
}

//Arma las filas para la tabla de las empresas que se le muestran al Administrador
function armarFila(empresa) {
    let fila = `<tr>
                <td>${empresa.rut}</td>
                <td>${empresa.razonSocial}</td>
                <td>${empresa.nombreFantasia}</td>`;
    //Si la empresa esta habilitada el boton en el cual se le podra cambiar el estado
    // sera de color azul, si aun esta DESHABILITADA  sera de color rojo.
    if (empresa.estado == "HABILITADA") {
        fila += `<td><input type="button" class="btnHabilitacion btn btn-primary" value="${empresa.estado}"></td></tr>`;
    } else {
        fila += `<td><input type="button" class="btnHabilitacion btn btn-danger" value="${empresa.estado}"></td></tr>`;
    };
    return fila;
}

//Arma el cabezal para la tabla que muestra todas las empresas al administrador
function armarCabezal() {
    let tabla = `<h1>EMPRESAS REGISTRADAS</h1>
    <table class="table table-primary table-hover" id="tablaAfministrador">
        <thead>
            <tr>
                <th>RUT</th>
                <th>RAZON SOCIAL</th>
                <th>EMPRESA</th>
                <th>ESTADO</th>
            </tr>
        </thead>`;
    return tabla;
}

//Muestra  los vehiculos registrados y un formulario para ingresar nuevos
function vehiculosAdministrador() {
    let tabla = crearTablaVehiculos();
    document.querySelector("#tablaAdministrador").innerHTML = `${tabla}`;
    document.querySelector("#ingresoVehiculos").style.display = 'block';
}

//Arma la tabla con los vehiculos que estan registrados.
function crearTablaVehiculos() {
    let tabla = `<h1>VEHICULOS REGISTRADOS</h1>
    <table class="table table-primary table-hover" id="tablaAfministrador">
        <thead>
            <tr>
                <th>VEHICULO</th>
                <th>ID</th>
            </tr>
        </thead>`;
    for (let vehiculo of vehiculos) {
        let fila = `<tr>
            <td>${vehiculo.nombre}</td>
            <td>${vehiculo.id}</td>
            </tr>`;
        tabla += fila;
    }
    tabla += `</table>`;
    return tabla;
}

//***F03 – Crear tipos de vehículos – Usuario: Administrador.***
//Permite el ingreso de nuevos vehiculos. A su vez invoca las funciones que verifican que 
//no se halla introducido una cadena vacia y que el vehiculo no este ya ingresado.
function ingresarVehiculo() {
    let vehiculo = document.querySelector("#ingresarNuevoVehiculo").value;

    let arregloVehiculo = [vehiculo];

    if (verificarCamposObligatorios(arregloVehiculo)) {
        if (verificarDatos(vehiculo, "nombre", vehiculos)) {
            guardarVehiculos(vehiculo.toUpperCase());
            document.querySelector("#ingresarNuevoVehiculo").value = "";
            vehiculosAdministrador();
        } else {
            alert("VEHICULO YA INGRESADO");
        }
    } else {
        alert("DEBE RELLENAR LOS CAMPOS");
    }
}

//Carga los select con los vehiculos disponibles a elegir hasta ese momento.
//Esta funcion sirve para el registro empresa y para cuando la persona quiere hacer un envio,
//por eso al llamarla se le pasa como parametro el id del dom en donde se va a mostrar el select 
function cargarSelectVehiculos(_id) {
    let combo = document.querySelector(`#${_id}`);
    combo.innerHTML = "";
    for (let vehiculo of vehiculos) {
        let opcion = `<option value="${vehiculo.id}">${vehiculo.nombre}</option>`;
        combo.innerHTML += opcion;
    }
}

//***F04 – Visualización estadística para administrador - Usuario: Administrador.***
//Visualiza las estadisticas para el administrador.
function estadisticasAdministrador() {
    let tabla = kilometros();
    document.querySelector("#tablaAdministrador").innerHTML = `${tabla}`;
}

//Calcula el total de kilometros recorridos por cada empresa y los 
//muestra en una tabla.
function kilometros() {
    let fila = "";
    //Arma el cabezal
    let tabla = `<h2>KILOMETROS RECORRIDOS POR EMPRESA</h2>
    <table class="table table-primary table-hover"  id="tablaEmpresa">
                    <thead>
                    <tr>
                        <th>EMPRESA</th>
                        <th>DISTANCIA RECORRIDA</th>
                    </tr>
    </thead >`;
    for (let empresa of datosEmpresas) {
        let kilometros = 0;
        //Guarda la razon social de la empresa
        let nombre = empresa.razonSocial;
        for (let solicitud of datosSolicitudes) {
            //Si la razon social coincide y el estado de la solicitud es 'Finalizada', se agregan los kilometros
            //de la solicitud realizada a la variable kilometros.
            if (nombre == solicitud.empresaEncargada.razonSocial && solicitud.estado == "FINALIZADA") {
                kilometros += solicitud.distancia;
            }
        }
        //Muestra la razon social y los kilometros recorridos
        fila = `<tr>
            <td>${nombre}</td>
            <td>${kilometros} Km.</td>
        </tr>`;
        tabla += fila;
    }
    tabla += `</table>`;
    return tabla;
}

//-------------------------------------------------------------PERSONA------------------------------------------------------------//

//Obtiene los datos que la persona introduce y efectua el pedido de envio.
function solicitarEnvio() {
    let distancia = Number(document.querySelector("#distancia").value);
    let vehiculo = Number(document.querySelector("#vehiculoEnvio").value);
    let descripcion = document.querySelector("#descripcion").value;
    let foto = document.querySelector("#foto").value;

    let arregloSolicitud = [distancia, vehiculo, descripcion, foto];

    if (verificarCamposObligatorios(arregloSolicitud)) {
        guardarDatosSolicitud(distancia, vehiculo, descripcion, obtenerNombreArchivo(foto), usuarioActivo);
        document.querySelector("#formularioEnvios").reset();
        alert("SOLICITUD ENVIADA CON EXITO");
    } else {
        alert("TODOS LOS CAMPOS SON OBLIGATORIOS");
    }
}

//Muestra en pantalla las solicitudes enviadas por el perfil persona.
function misSolicitudes() {
    let tabla = crearTablaMisSolicitudes();
    document.querySelector("#tablaPersona").innerHTML = `${tabla}`;
    mostrarMisSolicitudes();
}

//Crea la tabla con las solicitudes enviadas por el perfil persona
function crearTablaMisSolicitudes() {
    let fila = "";
    let tabla = `<h2>MIS SOLICITUDES</h2>
        <table class="table table-primary table-hover" id="tablaPersona">
        <thead>
        <tr>
            <th>FOTO</th>
            <th>ESTADO</th>
            <th>EMPRESA ENCARGADA DEL ENVIO</th>
            </tr>
        </thead>`;
    for (let solicitud of datosSolicitudes) {
        //Si el nombre del usuario logeado es igual al nombre del usuario asociado a la solicitud realizada
        //se agregan los datos a la tabla.
        if (usuarioActivo.nombreUsuario == solicitud.usuario.nombreUsuario) {
            fila = `<tr>
            <td><img src="productos/${solicitud.foto}"  width="100" height="90" alt="${solicitud.descripcion}"></td>
            <td >${solicitud.estado}</td>`;
            if (solicitud.empresaEncargada == "NINGUNA") {
                fila += `<td>${solicitud.empresaEncargada}</td></tr >`;
            } else {
                fila += `<td>${solicitud.empresaEncargada.nombreFantasia}</td></tr >`;
            }
            tabla += fila;
        }
    }
    tabla += `</table > `;
    return tabla;
}

//Muestra las estadisticas del perfil persona
function estadisticasPersona() {
    let datos = extraerDatos(usuarioActivo.nombreUsuario);
    let tabla = crearTablaPorcentajesPersona(datos);
    tabla += crearTablaCantidadesPersona(datos);
    document.querySelector("#tablaPersona").innerHTML = `${tabla} `;
    mostrarEstadisticasPersona();
}

//Arma la tabla en donde se mostraran al perfil persona el porcentaje de solicitudes de envios 
//que han sido tomados por alguna empresa.
function crearTablaPorcentajesPersona(_datos) {
    let tabla = `<h2> ENVIOS TOMADOS POR EMPRESAS</h2>
    <table class="table table-primary table-hover " id="estadisticasPersona">
        <thead>
            <tr>
                <th>PORCENTAJE</th>
            </tr>
        </thead>`;
    let porcentaje = calculoPorcentaje(_datos);
    let fila = `<td>${porcentaje}%</td>`;
    tabla += fila;
    tabla += `</table>`;
    return tabla;
}

//Arma la tabla en donde se mostraran al perfil persona cuantos envios de los solicitados por si mismo
//se encuentran en cada uno de esos estados.
function crearTablaCantidadesPersona(_datos) {
    let i = 0;
    let estados = ["EN TRANSITO", "FINALIZADA", "PENDIENTE"];
    let tabla = `<h2>ESTADOS EXISTENTES</h2>
            <table class="table table-primary table-hover id="estadisticasPersona">
            <thead>
                <tr>
                    <th>ESTADO</th>
                    <th>CANTIDAD</th>
                </tr>
            </thead>`;
    for (let cantidades of _datos) {
        let fila = `<tr>
                        <td>${estados[i]}</td>
                        <td>${cantidades}</td>
                    </tr>`;
        tabla += fila;
        i++;
    }
    tabla += `</table>`;
    return tabla;
}

//-------------------------------------------------------------EMPRESA------------------------------------------------------------//

//Muestra al perfil empresa las solicitudes de envio que se encuentran en estado pendiente y que se
//requiera un vehiculo del tipo que posee la empresa.
//Cada solicitud dispone de un boton para asignarse el envio.
function solicitudesDisponibles() {
    let tabla = crearTablaDeSolicitudesDisponibles(usuarioActivo);
    document.querySelector("#tablaEmpresa").innerHTML = `${tabla} `;

    let botonesLongitud = document.querySelectorAll(".btnEstado").length;
    for (let i = 0; i < botonesLongitud; i++) {
        document.querySelectorAll(".btnEstado")[i].addEventListener("click", function () {
            let index = posicion[i];
            //Al asignarse el envio a si mismo, se cambia el estado y se asocia la empresa a la solicitud.
            if (datosSolicitudes[index].estado == "PENDIENTE") {
                datosSolicitudes[index].estado = "EN TRANSITO";
                datosSolicitudes[index].empresaEncargada = usuarioActivo;
            }
            //La funcion al llamarse a si misma, produce que se muestre la tabla con los datos actualizados.
            solicitudesDisponibles();
        })
    }
}

//Arma la tabla con las solicitudes que se encuentran en estado pendiente y que se
//requiera un vehiculo del tipo que posee la empresa.
//Si no hay coincidencias, se le informa al respecto.
function crearTablaDeSolicitudesDisponibles(_usuario) {
    let mensaje = `POR EL MOMENTO NO HAY SOLICITUDES DISPONIBLES`;
    posicion.length = 0;
    let fila = "";
    let tabla = `<h1>SOLICITUDES DISPONIBLES</h1>
                <table class="table table-primary table-hover"  id="tablaEmpresa">
                    <thead>
                    <tr>
                        <th>FOTO</th>
                        <th>DISTANCIA</th>
                        <th>NOMBRE</th>
                        <th>APELLIDO</th>
                        <th>DESCRIPCION</th>
                        <th>ESTADO DEL ENVIO</th>
                    </tr>
            </thead > `;
    for (let solicitud of datosSolicitudes) {
        if (_usuario.vehiculo == solicitud.vehiculo && solicitud.estado == "PENDIENTE") {
            fila = `<tr>
            <td><img src="productos/${solicitud.foto}"  width="100" height="90""></td>
            <td>${solicitud.distancia}</td>
            <td>${solicitud.usuario.nombre}</td>
            <td>${solicitud.usuario.apellido}</td>
            <td>${solicitud.descripcion}</td>
            <td><input type="button" class="btnEstado btn btn-warning" value="TOMAR ENVIO"></td>
            </tr>`;//Boton de tomar envio en color amarillo
            tabla += fila;
            //Guarda el indice de la solicitud en el arreglo.
            posicion.push(datosSolicitudes.indexOf(solicitud));
        }
    }
    //Si 'fila' esta vacia, significa que no hay solicitudes con el mismo tipo de vehiculo que la empresa posee y se le informa.
    if (fila == "") {
        tabla += `<tr><td colspan="6">${mensaje}</td></tr>`;
    }
    tabla += `</table > `;
    return tabla;
}

//Muestra al perfil empresa las solicitudes tomadas por si misma.
//Cada solicitud dispone de un boton para poder marcar como "Finalizadas" las que se encuentran 'En transito'.
function solicitudesTomadas() {
    let tabla = crearTablaDeSolicitudesTomadas(usuarioActivo); //
    document.querySelector("#tablaEmpresa").innerHTML = `${tabla}`;
    mostrarSolicitudesTomadasEmpresa();

    let botonesLongitud = document.querySelectorAll(".btnTomadas").length;
    for (let i = 0; i < botonesLongitud; i++) {
        document.querySelectorAll(".btnTomadas")[i].addEventListener("click", function () {
            let index = posicion[i];
            //Las solicitudes que se encuentren en estado 'En transito', al apretar el boton pasan 
            //a "Finalizada"
            if (datosSolicitudes[index].estado == "EN TRANSITO") {
                datosSolicitudes[index].estado = "FINALIZADA";
            }
            solicitudesTomadas();
        })
    }
}

//Arma la tabla con las solicitudes que la empresa tomo
//para si misma.
function crearTablaDeSolicitudesTomadas(_usuario) {
    let mensaje = `AUN NO TOMASTES NINGUNA SOLICITUD`;
    posicion.length = 0;
    let fila = "";
    let tabla = `<h2> SOLICITUDES TOMADAS</h2>
                <table class="table table-primary table-hover"  id="tablaEmpresa">
                    <thead>
                    <tr>
                        <th>FOTO</th>
                        <th>DISTANCIA</th>
                        <th>NOMBRE</th>
                        <th>APELLIDO</th>
                        <th>DESCRIPCION</th>
                        <th>ESTADO DEL ENVIO</th>
                    </tr>
            </thead > `;
    for (let solicitud of datosSolicitudes) {
        if (_usuario.nombreUsuario == solicitud.empresaEncargada.nombreUsuario) {
            fila = `<tr>
            <td><img src="productos/${solicitud.foto}"  width="100" height="90""></td>
            <td>${solicitud.distancia}</td>
            <td>${solicitud.usuario.nombre}</td>
            <td>${solicitud.usuario.apellido}</td>
            <td>${solicitud.descripcion}</td>`;
            if (solicitud.estado == "EN TRANSITO") {
                //Si el estado de la solicitud es en transito, el boton sera de color celeste.
                fila += `<td> <input type="button" class="btnTomadas btn btn-info" value="${solicitud.estado}"></td></tr> `;
            } else {
                //Si el estado de la solicitud es 'Finalizada'', el boton sera de color verde.
                fila += `<td > <input type="button" class="btnTomadas btn btn-success" value="${solicitud.estado}" disabled></td></tr> `;
            }
            tabla += fila;
            //Se guarda el indice en posicion[] para luego usarlo en la funcion solicitudesTomadas
            posicion.push(datosSolicitudes.indexOf(solicitud));
        }

    }
    //Si no se asigno ningun envio a si misma, se le informa.
    if (fila == "") {
        tabla += `<tr><td colspan="6">${mensaje}</td></tr>`;
    }
    tabla += `</table> `;
    return tabla;
}

//Visualiza la informacion estadistica.
function estadisticasEmpresa() {
    let tabla = maxTraslados();
    document.querySelector("#clienteConmaxTraslados").innerHTML = `${tabla}`;
}

//Dependiendo de lo que halla elegido el perfil empresa en el select con el id "CantidadEnvios',
//muestra la cantidad de envios que tiene en estado "En tranito" o "Finalizada".
function mostrarCantidad() {
    let cantidad = 0;
    let estado = document.querySelector("#cantidadEnvios").value;
    if (estado == "NADA") {
        document.querySelector("#resultadoEstados").innerHTML = "";
    } else {
        for (let solicitud of datosSolicitudes) {
            if (estado == solicitud.estado && usuarioActivo.nombreUsuario == solicitud.empresaEncargada.nombreUsuario) {
                cantidad++;
            }
        }
        document.querySelector("#resultadoEstados").innerHTML = `${cantidad}`;
    }
}

/*
    LOGICA DE NEGOCIO
*/

//Arreglos que alojan los objetos con todos los datos 
let datosEmpresas = new Array();
let datosPersonas = new Array();
let vehiculos = new Array();
let datosSolicitudes = new Array();
let usuarioActivo = null;

//Guarda los datos de la persona
function guardarDatosPersona(_cedula, _nombre, _apellido, _nombreUsuario, _contraseña) {
    let persona = new Persona(_cedula, _nombre, _apellido, _nombreUsuario, _contraseña);
    datosPersonas.push(persona);
}

//Guarda los datos de la empresa
function guardarDatosEmpresa(_rut, _razonSocial, _nombre, _nombreUsuario, _contraseña, _vehiculo) {
    let empresa = new Empresa(_rut, _razonSocial, _nombre, _nombreUsuario, _contraseña, _vehiculo);
    datosEmpresas.push(empresa);
}

//Guarda los datos de los vehiculos
function guardarVehiculos(nombre) {
    let vehiculo = new Vehiculo(nombre);
    vehiculos.push(vehiculo);
}

//Guarda las solicitudes
function guardarDatosSolicitud(_distancia, _vehiculo, _descripcion, _foto, _usuario) {
    let solicitud = new Solicitudes(_distancia, _vehiculo, _descripcion, _foto, _usuario);
    datosSolicitudes.push(solicitud);
}

//Verifica que todos los campos se rellenaron
function verificarCamposObligatorios(_arreglo) {
    let verificacion = true;
    for (let elemento of _arreglo) {
        if (elemento == "") {
            verificacion = false;
        }
    }
    return verificacion;
}

//Verifica que elementos como nombreUsuario, rut, razonSocial...etc, no se repitan.
function verificarDatos(_datoIngresado, _clave, _arreglo) {
    let verificacion = true;
    for (let elemento of _arreglo) {
        if (elemento[_clave].toLowerCase() == _datoIngresado.toLowerCase()) {
            verificacion = false;
        }
    }
    return verificacion;
}

//Valida las contrasenas
function verificarPassword(_contraseña) {
    let verificacion = false;
    let mayusculas = false;
    let minusculas = false;
    let numeros = false;

    for (let letra of _contraseña) {
        if (letra >= "A" && letra <= "Z" || letra == "Ñ") {
            mayusculas = true;
        }
        if (letra >= "a" && letra <= "z" || letra == "ñ") {
            minusculas = true;
        }
        if (letra >= "0" && letra <= "9") {
            numeros = true;
        }
    }

    if (_contraseña.length >= 6 && mayusculas && minusculas && numeros) {
        verificacion = true;
    }
    return verificacion;
}

//Verifica que la persona y/o la empresa que ingresa exista en el sistema.
function verificacionIngreso(nombre, contraseña, perfil) {
    let verificacion = false;

    if (perfil == "persona") {
        for (let persona of datosPersonas) {
            if (persona.nombreUsuario == nombre && persona.contraseña == contraseña) {
                verificacion = true;
                usuarioActivo = persona;
            }
        }
    } else {
        for (let empresa of datosEmpresas) {
            if (empresa.nombreUsuario == nombre && empresa.contraseña == contraseña && empresa.estado == "HABILITADA") {
                verificacion = true;
                usuarioActivo = empresa;
            }
        }
    }
    return verificacion;
}

//ESTA FUNCION SE INVOCA DESDE empresasAdmin() y buscarEmpresa()
//CUANDO SE INVOCA DESDE empresasAdmin() ARMA LA TABLA CON TODAS LAS EMPRESAS
//CUANDO SE INVOCA DESDE buscarEmpresa(),CON EL PARAMETRO QUE SE LE PASA A LA FUNCION
//SE FILTRAN LOS RESULTADOS.
//CADA VEZ QUE COINCIDE LA BUSQUEDA CON LA EMPRESA, SE GUARDA LA POSICION DE LA MISMA
//EN EL ARREGLO posicion[] PARA LUEGO USARLA AL DESHABILITAR/HABILITAR CUANDO HAY MENOS BOTONES 
//Y QUEREMOS CAMBIAR SU ESTADO.
function crearTablaYBuscador(buscar) {
    let mensaje = `NO HAY COINCIDECIAS CON TU BUSQUEDA`;
    //Reinicia el arreglo
    posicion.length = 0;
    let datosEncontrados = false;
    let tabla = armarCabezal();
    //Si es una cadena vacia, se muestran todas las empresas.
    if (buscar == "") {
        for (let empresa of datosEmpresas) {
            tabla += armarFila(empresa);
            posicion.push(datosEmpresas.indexOf(empresa));
        }
    } else {
        //Si la cadena no es vacia, se busca primero por razon social.
        for (let empresa of datosEmpresas) {
            let razonSocial = (empresa.razonSocial).toLowerCase();
            //Si la razon social incluye la busqueda que hace el perfil admin
            if (razonSocial.includes(buscar.toLowerCase())) {
                //Se guarda el indice en posicion[] para luego usarlo en la funcion buscarEmpresa.
                posicion.push(datosEmpresas.indexOf(empresa));
                //Se arma la fila con los datos correspondientes de la empresa
                tabla += armarFila(empresa);
                //Los datos fueron encontrados
                datosEncontrados = true;

            }
        }
        //Si los datos no fueron encontrados, se procede a buscar por nombre de fantasia
        if (!datosEncontrados) {
            for (let empresa of datosEmpresas) {
                let nombreFantasia = (empresa.nombreFantasia).toLowerCase();
                if (nombreFantasia.includes(buscar.toLowerCase())) {
                    posicion.push(datosEmpresas.indexOf(empresa));
                    tabla += armarFila(empresa);
                    datosEncontrados = true;
                }
            }
        }
        //Si en las busquedas por razon social y nombre de fantasia , datosEncontrados no paso a true(osea que no hubo coincidencias)
        //se le informa al perfil admin al respecto.
        if (!datosEncontrados) {
            tabla += `<tr ><td colspan="4">${mensaje}</td></tr>`;
        }
    }
    tabla += `</table>`;
    return tabla;
}

//Obtiene el nombre de la foto
function obtenerNombreArchivo(ruta) {
    let nombreArchivo;
    let posicionUltimaBarra = ruta.lastIndexOf("\\");
    nombreArchivo = ruta.substring(posicionUltimaBarra + 1);
    return nombreArchivo;
}

//Calcula el porcentaje de solicitudes de envios  que estan 
//en estado "en transito" y "finalizada"
function calculoPorcentaje(_datos) {
    let total = _datos[0] + _datos[1] + _datos[2];
    let aceptadas = _datos[0] + _datos[1];
    let porcentaje = 0;

    if (aceptadas != 0) {
        porcentaje = ((aceptadas / total) * 100).toFixed(2);
    }

    return porcentaje;
}

//Ingresa al arreglo datosSolicitudes y registra 
//la cantidad de solicitudes que tiene el usuario en cada estado.
function extraerDatos(_nombreUsuario) {
    //["En transito", "finalizado", 'pendiente'] las posiciones en como se ordenan en el arreglo cantidades
    let cantidades = [0, 0, 0];
    for (let solicitud of datosSolicitudes) {
        if (_nombreUsuario == solicitud.usuario.nombreUsuario) {
            switch (solicitud.estado) {
                case "EN TRANSITO":
                    cantidades[0]++;
                    break;
                case "FINALIZADA":
                    cantidades[1]++;
                    break;
                default:
                    cantidades[2]++;
                    break;
            }
        }
    }
    return cantidades;
}

/*
Esta funcion retorna el cliente con mas cantidad de traslados
utilizando las solicitudes guardadas en "solicitudes[]" va agregando en un arreglo "clientes[]" objetos Cliente 
con el nombre del mismo si estos no fueron agregados anteriormente y su propiedad cantidad = 1(cantidad de solicitudes) 
si ya fue agregado anteriormente solamente le suma uno a la propiedad cantidad del mismo.
Al final busca en el arreglo "clientes[]" cual de ellos tiene mas cantidad de solicitudes y retorna su nombre
*/
function maxTraslados() {
    let clientes = [];
    for (let solicitud of datosSolicitudes) {
        if (usuarioActivo.nombreUsuario == solicitud.empresaEncargada.nombreUsuario && solicitud.estado == "FINALIZADA") {

            let nombreEncontrado = false;

            for (let cliente of clientes) {
                if (cliente.nombre == solicitud.usuario.nombreUsuario) {
                    nombreEncontrado = true;
                }
            }

            if (!nombreEncontrado) {
                let cliente = new Cliente(solicitud.usuario.nombreUsuario, 1)
                clientes.push(cliente);
            } else {
                let aux;
                for (let i = 0; i < clientes.length; i++) {
                    if (clientes[i].nombre == solicitud.usuario.nombreUsuario) {
                        aux = i;
                    }
                }
                clientes[aux].cantidad++;
            }
        }
    }

    let max = 0;
    let clienteMayor = "";

    for (let cliente of clientes) {
        if (cliente.cantidad >= max) {
            max = cliente.cantidad;
            clienteMayor += " " + cliente.nombre;
        }
    }
    return clienteMayor;
}


function preCargaDatos() {
    //!Usuarios persona
    guardarDatosPersona("3.234.567-3", "Gonzalo", "Acosta", "persona1", "Ab.12345");
    guardarDatosPersona("4.456.234-3", "Gabriela", "Perez", "persona2", "Ab.12345");
    guardarDatosPersona("4.345.789-0", "Romualdo", "Gonzales", "persona3", "Ab.12345");
    guardarDatosPersona("3.675.432-1", "Federica", "Martinez", "persona4", "Ab.12345");

    //!Usuarios empresa
    guardarDatosEmpresa("123456789", "Herramientas srl", "Max Herramientas", "empresa1", "Ab.12345", 1);
    datosEmpresas[0].estado = "HABILITADA";

    guardarDatosEmpresa("987654321", "Pizza sa", "PizFast", "empresa2", "Ab.12345", 2);
    datosEmpresas[1].estado = "HABILITADA";

    guardarDatosEmpresa("352413687", "Mudanzas sas", "Carlos Morez", "empresa3", "Ab.12345", 3);
    datosEmpresas[2].estado = "HABILITADA";

    guardarDatosEmpresa("089757643", "Enviamos S.A.", "Envios YA!", "empresa4", "Ab.12345", 1);
    datosEmpresas[3].estado = "DESHABILITADA";

    guardarDatosEmpresa("019283746", "RapiLLevamos SRL", "Correcaminos", "empresa5", "Ab.12345", 2);
    datosEmpresas[4].estado = "DESHABILITADA";

    //!Solicitudes
    guardarDatosSolicitud(30, 1, 'Blablablablabla', 'aceite.webp', datosPersonas[0]);
    datosSolicitudes[0].estado = "EN TRANSITO";
    datosSolicitudes[0].empresaEncargada = datosEmpresas[0];

    guardarDatosSolicitud(56, 1, 'Blablablablabla', 'azucar.jpg', datosPersonas[1]);
    datosSolicitudes[1].estado = "FINALIZADA";
    datosSolicitudes[1].empresaEncargada = datosEmpresas[1];

    guardarDatosSolicitud(80, 2, 'Blablablablabla', 'carne.jpg', datosPersonas[2]);
    datosSolicitudes[2].estado = "PENDIENTE";

    //!Pre carga de vehiculos
    guardarVehiculos('MOTO');
    guardarVehiculos('CAMIONETA');
    guardarVehiculos('CAMION');
}
