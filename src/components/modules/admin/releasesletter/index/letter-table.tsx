import React from "react";
import { LettersProvider, useLetters } from "./letter-context";
import { Card } from "@/components/ui-componets/general/card/Card";
import { CardHeader } from "@/components/ui-componets/general/card/CardHeader";
import { CardBody } from "@/components/ui-componets/general/card/CardBody";
import Loader from "@/components/ui-componets/load/Loader";
import SearchLetter from "./letter-search";
import LetterCard from "./letter-card";
import LettersPager from "./letter-pager";
import CreateLetterModal from "../modals/create-letter-modal";
import UpdateLetterModal from "../modals/update-letter-modal";
import DeleteLetterModal from "../modals/delete-letter-model";
import ShowLetterModal from "../modals/show-letter-modal";

function LettersContent() {
  const { letters, loading, openCreate } = useLetters();

  return (
    <Card>
      <CardHeader>
        <h6 className="text-2xl font-bold text-primary flex-1">
          Cartas de Liberación
        </h6>
        <div className="flex items-center gap-4">
          <SearchLetter />
          <button onClick={openCreate} className="create">
            +Nueva
          </button>
        </div>
      </CardHeader>

      <CardBody>
        {loading ? (
          <>
            <Loader />
            <div className="text-center text-gray-500 py-8">Cargando...</div>
          </>
        ) : letters.length > 0 ? (
          <div className="flex flex-wrap items-center justify-center gap-4">
            {letters.map((l) => (
              <LetterCard key={l.document_id} item={l} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-8">
            No hay cartas para mostrar.
          </div>
        )}
      </CardBody>

      <LettersPager />

      <CreateLetterModal />
      <UpdateLetterModal />
      <DeleteLetterModal />
      <ShowLetterModal />
    </Card>
  );
}

export default function LettersView() {
  return (
    <LettersProvider>
      <LettersContent />
    </LettersProvider>
  );
}
