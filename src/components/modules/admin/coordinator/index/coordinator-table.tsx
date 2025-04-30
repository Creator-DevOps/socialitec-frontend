import React from "react";
import { CoordinatorsProvider, useCoordinators } from "./coordinator-context";
import { Card } from "@/components/ui-componets/general/card/Card";
import { CardHeader } from "@/components/ui-componets/general/card/CardHeader";
import { CardBody } from "@/components/ui-componets/general/card/CardBody";
import Loader from "@/components/ui-componets/load/Loader";
import SearchCoordinator from "./coordinator-search";
import CoordinatorRow from "./coordinator-row";
import CoordinatorsPager from "./coordinator-pager";
import CreateCoordinatorModal from "../modals/create-coordinator-modal";
import UpdateCoordinatorModal from "../modals/update-coordinator-modal";
import DeleteCoordinatorModal from "../modals//delete-coordinator-model";

function CoordinatorsContent() {
  const { coordinators, loading, openCreate } = useCoordinators();

  return (
    <Card>
      <CardHeader>
        <h6 className="text-2xl font-bold text-primary flex-1">
          Coordinadores
        </h6>
        <div className="flex items-center gap-4">
          <SearchCoordinator />
          <button onClick={openCreate} className="create">
            + Nuevo
          </button>
        </div>
      </CardHeader>

      <CardBody>
        {loading ? (
          <>
            {" "}
            <Loader />
            <div className="text-center text-gray-500 py-8">
              Cargando...
            </div>{" "}
          </>
        ) : coordinators.length > 0 ? (
          <table className="table">
            <thead className="thead">
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th className="hidden md:table-cell">Departamento</th>
                <th />
              </tr>
            </thead>
            <tbody className="tbody">
              {coordinators.map((c) => (
                <CoordinatorRow key={c.user_id} item={c} />
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center text-gray-500 py-8">
            No hay coordinadores para mostrar.
          </div>
        )}
      </CardBody>

      <CoordinatorsPager />

      <CreateCoordinatorModal />
      <UpdateCoordinatorModal />
      <DeleteCoordinatorModal />
    </Card>
  );
}

export default function CoordinatorsView() {
  return (
    <CoordinatorsProvider>
      <CoordinatorsContent />
    </CoordinatorsProvider>
  );
}
