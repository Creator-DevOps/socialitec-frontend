import React from "react";
import { ProgramsProvider, usePrograms } from "./program-context";
import { Card } from "@/components/ui-componets/general/card/Card";
import { CardHeader } from "@/components/ui-componets/general/card/CardHeader";
import { CardBody } from "@/components/ui-componets/general/card/CardBody";
import Loader from "@/components/ui-componets/load/Loader";
import SearchProgram from "./program-search";
import ProgramRow from "./program-row";
import ProgramsPager from "./program-pager";
import CreateProgramModal from "../modals/create-program-modal";
import UpdateProgramModal from "../modals/update-program-modal";
import DeleteProgramModal from "../modals/delete-program-model";
import ShowProgramModal from "../modals/show-program-modal";
function ProgramsContent() {
  const { programs, loading, openCreate } = usePrograms();

  return (
    <Card>
      <CardHeader>
        <h6 className="text-2xl font-bold text-primary flex-1">Programas</h6>
        <div className="flex items-center gap-4">
          <SearchProgram />
          <button onClick={openCreate} className="create">
            + Nuevo
          </button>
        </div>
      </CardHeader>

      <CardBody>
        {loading ? (
          <>
            <Loader />
            <div className="text-center text-gray-500 py-8">Cargando...</div>
          </>
        ) : programs.length > 0 ? (
          <table className="table">
            <thead className="thead">
              <tr>
                <th>Nombre</th>
                <th>Institución</th>
                <th className="hidden md:table-cell ">Responsable</th>
                <th className="hidden xl:table-cell">Responsable Email</th>
                <th className="w-8"></th>
              </tr>
            </thead>
            <tbody className="tbody">
              {programs.map((p) => (
                <ProgramRow key={p.program_id} item={p} />
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center text-gray-500 py-8">
            No hay instituciones para mostrar.
          </div>
        )}
      </CardBody>

      <ProgramsPager />

      <CreateProgramModal />
      <UpdateProgramModal />
      <DeleteProgramModal />
      <ShowProgramModal />
    </Card>
  );
}

export default function ProgramsView() {
  return (
    <ProgramsProvider>
      <ProgramsContent />
    </ProgramsProvider>
  );
}
