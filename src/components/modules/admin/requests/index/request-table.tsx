import React from "react";
import { RequestsProvider, useRequests } from "./request-context";
import { Card } from "@/components/ui-componets/general/card/Card";
import { CardHeader } from "@/components/ui-componets/general/card/CardHeader";
import { CardBody } from "@/components/ui-componets/general/card/CardBody";
import Loader from "@/components/ui-componets/load/Loader";
import SearchRequest from "./request-search";
import RequestRow from "./request-row";
import RequestsPager from "./request-pager";
import CreateRequestModal from "../modals/create-request-modal";
import UpdateRequestModal from "../modals/update-request-modal";
import DeleteRequestModal from "../modals/delete-request-model";
import ShowRequestModal from "../modals/show-request-modal";

function RequestsContent() {
  const { requests, loading, openCreate } = useRequests();

  return (
    <Card>
      <CardHeader>
        <h6 className="text-2xl font-bold text-primary flex-1">Solicitudes</h6>
        <div className="flex items-center gap-4">
          <SearchRequest />
          <button onClick={openCreate} className="create">
            + Nueva
          </button>
        </div>
      </CardHeader>

      <CardBody>
        {loading ? (
          <>
            <Loader />
            <div className="text-center text-gray-500 py-8">Cargando...</div>
          </>
        ) : requests.length > 0 ? (
          <table className="table">
            <thead className="thead">
              <tr>
                <th>Estudiante</th>
                <th>Institución</th>
                <th className="hidden md:table-cell">Estatus</th>
                <th className="hidden md:table-cell">Progreso</th>

                <th />
              </tr>
            </thead>
            <tbody className="tbody">
              {requests.map((r) => (
                <RequestRow key={r.request_id} item={r} />
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center text-gray-500 py-8">
            No hay solicitudes para mostrar.
          </div>
        )}
      </CardBody>

      <RequestsPager />

      <CreateRequestModal />
      <UpdateRequestModal />
      <DeleteRequestModal />
      <ShowRequestModal />
    </Card>
  );
}

export default function RequestsView() {
  return (
    <RequestsProvider>
      <RequestsContent />
    </RequestsProvider>
  );
}
