// import React, { useEffect } from "react";
// import ModalContainer from "@/components/containers/modal.container";
// import { useForm, SubmitHandler } from "react-hook-form";
// import { FormInput } from "@/components/forms/inputs/form-input";
// import { useReportCycleItems } from "../index/reportCycleItem-context";
// import { useParams } from "react-router-dom";
// import { useGetReportCycle } from "@/lib/api/api-hooks/reports/cycles/use-get-cycle";

// interface FormValues {
//   cycle_id: number;
//   report_number: number;
//   title: string;
//   start_date: string; // ISO date
//   end_date: string;
//   [key: string]: unknown;
// }

// const CreateReportCycleItemModal: React.FC = () => {
//   const { isCreateOpen, closeCreate, handleCreate} =
//     useReportCycleItems();
//     const { cycleId } = useParams<{cycleId:string}>();
//      const {
//       reportCycle
//     } = useGetReportCycle(Number(cycleId));

//   const {
//     control,
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//     reset,
//   } = useForm<FormValues>();

//   const onSubmit = async (data: FormValues) => {
//     await handleCreate({
//       ...data,
//       cycle_id: reportCycle!.cycle_id,
//     });
//     closeCreate();
//     reset();
//   };

//   if (!isCreateOpen) return null;

//   return (
//     <ModalContainer
//       visible
//       onClose={() => {
//         reset();
//         closeCreate();
//       }}
//     >
//       <div className="flex flex-col gap-6 md:px-6">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-primary">
//             Agregar nueva Asignación
//           </h2>
//           <p>Completa los datos de la asignación a registrar.</p>
//         </div>

//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className="flex flex-col space-y-4"
//         >
//           <div className="flex flex-col gap-1 w-full text-left">
//             <label htmlFor="cycle_display" className="font-semibold text-xs md:text-sm">
//               Ciclo
//             </label>
//             <input
//               id="cycle_display"
//               type="text"
//               disabled
//               value={reportCycle?.folder_name ?? ""}
//               className="border-b border-gray-300  text-xs md:text-sm py-1 cursor-not-allowed"
//             />
//           </div>
//           <FormInput
//             name="title"
//             label="Titulo de la Entrega"
//             placeholder="Ej. Primer avance"
            
//             register={register}
//             errors={errors}
//             rules={{ required: "Título obligatorio" }}
//           />
//           {/* <FormInput
//           hidden={true}
//             name="cycle_id"
//             label="Ciclo"
//             placeholder={reportCycle?.folder_name}
//             defaultValue={reportCycle?.cycle_id}
//             register={register}
//             errors={errors}
//             disabled={true}
//           /> */}

//           {/* Select para número de reporte */}
//           <div className="flex flex-col gap-1 mb-6 w-full text-left">
//             <label
//               htmlFor="report_number"
//               className="font-semibold text-xs md:text-sm"
//             >
//               Número de Reporte
//             </label>
//             <select
//               id="report_number"
//               className={`
//       border-b border-gray-300 focus:outline-none focus:border-secondary
//       text-xs md:text-sm py-1
//       ${errors.report_number ? "border-red-500" : ""}
//     `}
//               defaultValue=""
//               {...register("report_number", {
//                 required: "Número de reporte obligatorio",
//                 valueAsNumber: true,
//               })}
//             >
//               <option value="" disabled>
//                 — Selecciona número de reporte —
//               </option>
//               <option value={1}>Reporte 1</option>
//               <option value={2}>Reporte 2</option>
//               <option value={3}>Reporte 3</option>
//             </select>
//             {errors.report_number && (
//               <p className="text-red-500 !text-xs mt-1">
//                 {errors.report_number.message}
//               </p>
//             )}
//           </div>

//           <FormInput
//             name="start_date"
//             label="Fecha Inicio"
//             placeholder="Ej. 2025/01/29"
//             register={register}
//             errors={errors}
//             rules={{ required: "Fecha inicio obligatoria" }}
//           />
//           <FormInput
//             name="end_date"
//             label="Fecha fin"
//             placeholder="Ej. 2025-06-10"
//             register={register}
//             errors={errors}
//             rules={{ required: "Fecha fin obligatoria" }}
//           />

//           <div className="flex justify-end gap-4 pt-4">
//             <button
//               type="button"
//               onClick={() => {
//                 reset();
//                 closeCreate();
//               }}
//               className="cancel"
//             >
//               Cancelar
//             </button>
//             <button type="submit" className="create">
//               Guardar
//             </button>
//           </div>
//         </form>
//       </div>
//     </ModalContainer>
//   );
// };

// export default CreateReportCycleItemModal;
