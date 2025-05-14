import React from "react";
import { RequestsProvider, useRequests } from "./request-context";
import { Card } from "@/components/ui-componets/general/card/Card";
import { CardHeader } from "@/components/ui-componets/general/card/CardHeader";
import { CardBody } from "@/components/ui-componets/general/card/CardBody";
import CreateRequestModal from "../modals/create-request-modal";
import UpdateRequestModal from "../modals/update-request-modal";
import DeleteRequestModal from "../modals/delete-request-model";
import ShowRequestModal from "../modals/show-request-modal";
import { useAuth } from "@/contexts/authContext";
import { useGetRequestUser } from "@/lib/api/api-hooks/requests/use-get-request_user";
import Loader from "@/components/ui-componets/load/Loader";
import ReportsView from "../request/index/requestPanel-table";

function RequestsContent() {
  const { requests, loading, openCreate } = useRequests();
  const { user } = useAuth();
  const userId = user?.user_id || 0;

  const { request,loading:load } = useGetRequestUser(user?.user_id||0);

  return (
    <Card>
      <CardHeader>
        <h6 className="text-2xl font-bold text-primary flex-1">Solicitud</h6>
        <div className="flex items-center gap-4">
          {/* <SearchRequest /> */}
          <button onClick={openCreate} className={`${!request?"":"hidden"} create`}>
            +Nueva
          </button>
        </div>
      </CardHeader>
      {load?<Loader/>:!request ? (
        <div className="flex flex-col items-center text-center text-primary text-2xl font-bold  my-auto justify-center">
          ¡No hay ninguna solicitud activa!
        </div>
      ) : (
        <CardBody>
          < ReportsView/>
        </CardBody>
      )}


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
