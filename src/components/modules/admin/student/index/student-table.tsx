import React from "react";
import { StudentsProvider, useStudents } from "./student-context";
import { Card } from "@/components/ui-componets/general/card/Card";
import { CardHeader } from "@/components/ui-componets/general/card/CardHeader";
import { CardBody } from "@/components/ui-componets/general/card/CardBody";
import Loader from "@/components/ui-componets/load/Loader";
import SearchStudent from "./student-search";
import StudentRow from "./student-row";
import StudentsPager from "./student-pager";
import CreateStudentModal from "../modals/create-student-modal";
import UpdateStudentModal from "../modals/update-student-modal";
import DeleteStudentModal from "../modals/delete-student-model";
import ShowStudentModal from "../modals/show-student-modal";

function StudentsContent() {
  const { students, loading, openCreate } = useStudents();

  return (
    <Card>
      <CardHeader>
        <h6 className="text-2xl font-bold text-primary flex-1">Estudiantes</h6>
        <div className="flex items-center gap-4">
          <SearchStudent />
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
        ) : students.length > 0 ? (
          <table className="table">
            <thead className="thead">
              <tr>
                <th>Nombre</th>
                <th className="hidden md:table-cell">Email</th>
                <th className="hidden md:table-cell">Carrera</th>

                <th/>
              </tr>
            </thead>
            <tbody className="tbody">
              {students.map((c) => (
                <StudentRow key={c.user_id} item={c} />
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center text-gray-500 py-8">
            No hay estudiantes para mostrar.
          </div>
        )}
      </CardBody>

      <StudentsPager />

      <CreateStudentModal />
      <UpdateStudentModal />
      <DeleteStudentModal />
      <ShowStudentModal />
    </Card>
  );
}

export default function StudentsView() {
  return (
    <StudentsProvider>
      <StudentsContent />
    </StudentsProvider>
  );
}
