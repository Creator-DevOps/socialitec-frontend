import React from "react";
import { InstitutionsProvider, useInstitutions } from "./institution-context";
import { Card } from "@/components/ui-componets/general/card/Card";
import { CardHeader } from "@/components/ui-componets/general/card/CardHeader";
import { CardBody } from "@/components/ui-componets/general/card/CardBody";
import Loader from "@/components/ui-componets/load/Loader";
import SearchInstitution from "./institution-search";
import InstitutionRow from "./institution-row";
import InstitutionsPager from "./institution-pager";
import CreateInstitutionModal from "../modals/create-institution-modal";
import UpdateInstitutionModal from "../modals/update-institution-modal";
import DeleteInstitutionModal from "../modals/delete-institution-model";
import ShowInstitutionModal from "../modals/show-institution-modal";

function InstitutionsContent() {
  const { institutions, loading, openCreate } = useInstitutions();

  return (
    <Card>
      <CardHeader>
        <h6 className="text-2xl font-bold text-primary flex-1">Instituciones</h6>
        <div className="flex items-center gap-4">
          <SearchInstitution />
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
        ) : institutions.length > 0 ? (
          <table className="table">
            <thead className="thead">
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th className="hidden md:table-cell">Teléfono</th>
                <th className="hidden md:table-cell">C.P</th>

                <th />
              </tr>
            </thead>
            <tbody className="tbody">
              {institutions.map((i) => (
                <InstitutionRow key={i.institution_id} item={i} />
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center text-gray-500 py-8">
            No hay instituciones para mostrar.
          </div>
        )}
      </CardBody>

      <InstitutionsPager />

      <CreateInstitutionModal />
      <UpdateInstitutionModal />
      <DeleteInstitutionModal />
      <ShowInstitutionModal />
    </Card>
  );
}

export default function InstitutionsView() {
  return (
    <InstitutionsProvider>
      <InstitutionsContent />
    </InstitutionsProvider>
  );
}
