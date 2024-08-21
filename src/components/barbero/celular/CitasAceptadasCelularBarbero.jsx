import React, { useEffect, useState } from "react";
import { actualizarCitaBarbero, EliminarCita, obtenerCitasBarbero } from "../../../peticiones/CitasPeticiones";
import { formatDate } from "../../../util/cartas/CartasCitasCelular";
import { TituloGenericos } from "../../../util/titulos/TituloGenericos";
import { FiScissors } from "react-icons/fi";
import "./../../../css/citasaceptadascelularbarbero.css";

export default function CitasAceptadasCelularBarbero() {
  const [citas, setCitas] = useState([]);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    obtenerCitasBarbero(setCitas, setMensaje);
  }, [citas]);

  return (
    <>
      <section>
        <TituloGenericos titulo={"CITAS ACEPTADAS"} icono={FiScissors} />
      </section>
      <br />

      <section>
        <CitaTablaBarbero
          citas={citas}
          estado={"Aceptada"}
          botonFinalizar={true}
        />
      </section>
      {mensaje && <p className="p-mensaje-table-barbero-pc">{mensaje}</p>}
    </>
  );
}

export function CitaTablaBarbero({ citas, estado, botonFinalizar = false,botonEliminar=false }) {
  const citasAceptadas = citas.filter((cita) => cita.estado === estado);
  const [mensaje, setMensaje] = useState("");

  if (citasAceptadas.length === 0) {
    return <p className="p-mensaje-table-barbero-pc">No hay citas aceptadas</p>;
  }

  function actualizarCita(citaId) {
    return actualizarCitaBarbero(setMensaje, citaId, "Realizada");
  }

  // Determine if the table should be scrollable
  const isScrollable = citasAceptadas.length > 7;

  return (
    <>
      <section className="section-contenedor-table-barbero">
        <div
          className={`div-contenedor-cita-aceptada-barbero ${
            isScrollable ? "scrollable" : ""
          }`}
        >
          <table className=" table table-barbero-pc">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Cliente</th>
                <th scope="col">Estilo</th>
                <th scope="col">Precio</th>
                <th scope="col">Fecha</th>
                <th scope="col">Hora</th>
                {botonFinalizar && <th scope="col">¿Finalizada?</th>}
                {botonEliminar && <th scope="col">¿Eliminar?</th>}
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {citasAceptadas &&
                citasAceptadas.map((citaBarbero, index) => (
                  <tr key={citaBarbero.citaId}>
                    <th scope="row">{index + 1}</th>
                    <td>{citaBarbero.cliente.nombre}</td>
                    <td>{citaBarbero.estilo.nombre}</td>
                    <td>{citaBarbero.estilo.precio}</td>
                    <td>{formatDate(citaBarbero.fecha)}</td>
                    <td>{citaBarbero.hora}</td>
                    <td>
                      {botonFinalizar && (
                        <button
                          type="button"
                          className="button-finalizar-aceptada"
                          onClick={() => actualizarCita(citaBarbero.citaId)}
                        >
                          Finalizar
                        </button>
                      )}

                      {botonEliminar && (
                        <button
                          type="button"
                          className="button-finalizar-aceptada"
                          onClick={() => EliminarCita(setMensaje,citaBarbero.citaId,citaBarbero.estado)}
                        >
                          Eliminar
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>

      {mensaje && <p className="p-mensaje-table-barbero-pc">{mensaje}</p>}
    </>
  );
}
