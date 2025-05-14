import React from "react";
import { TemplatesProvider, useTemplates } from "./template-context";
import { Card } from "@/components/ui-componets/general/card/Card";
import { CardHeader } from "@/components/ui-componets/general/card/CardHeader";
import { CardBody } from "@/components/ui-componets/general/card/CardBody";
import Loader from "@/components/ui-componets/load/Loader";
import SearchTemplate from "./template-search";
import TemplateCard from "./template-card";
import TemplatesPager from "./template-pager";
import CreateTemplateModal from "../modals/create-template-modal";
import UpdateTemplateModal from "../modals/update-template-modal";
import DeleteTemplateModal from "../modals/delete-template-model";
import ShowTemplateModal from "../modals/show-template-modal";
import { useAuth } from "@/contexts/authContext";
import { useGetRequestUser } from "@/lib/api/api-hooks/requests/use-get-request_user";

function TemplatesContent() {
  const { templates, loading, openCreate } = useTemplates();
  const { user } = useAuth();
  const userId = user?.user_id || 0;

  const { request,loading:load } = useGetRequestUser(userId||0);
  return (
    <Card>
      {load?<Loader/>:!request ? (
        <div className="flex flex-col items-center text-center text-primary text-2xl font-bold  my-auto justify-center">
          ¡No hay ninguna solicitud activa!
        </div>
      ) : (
        <>
          <CardHeader>
            <h6 className="text-2xl font-bold text-primary flex-1">
              Plantillas
            </h6>
            <div className="flex items-center gap-4">
              {/* <SearchTemplate /> */}
              {/* <button onClick={openCreate} className="create">
            + Nueva
          </button> */}
            </div>
          </CardHeader>

          <CardBody>
            {loading ? (
              <>
                <Loader />
                <div className="text-center text-gray-500 py-8">
                  Cargando...
                </div>
              </>
            ) : templates.length > 0 ? (
              <div className="flex flex-wrap items-center justify-center gap-4">
                {templates.map((t) => (
                  <TemplateCard key={t.document_id} item={t} />
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                No hay plantillas para mostrar.
              </div>
            )}
          </CardBody>
        </>
      )}

      {/* <TemplatesPager /> */}

      <CreateTemplateModal />
      <UpdateTemplateModal />
      <DeleteTemplateModal />
      <ShowTemplateModal />
    </Card>
  );
}

export default function TemplatesView() {
  return (
    <TemplatesProvider>
      <TemplatesContent />
    </TemplatesProvider>
  );
}
