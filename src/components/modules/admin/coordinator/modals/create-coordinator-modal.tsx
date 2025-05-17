import React from 'react';
import ModalContainer from '@/components/containers/modal.container';
import { useForm } from 'react-hook-form';
import { FormInput } from '@/components/forms/inputs/form-input';
import { useCoordinators } from '../index/coordinator-context';
import Loader from '@/components/ui-componets/load/Loader';

interface FormValues {
  name: string;
  email: string;
  departament: string;
  password: string;
  confirmPassword: string;
  [key: string]: unknown;
}

const CreateCoordinatorModal: React.FC = () => {
  const { isCreateOpen, closeCreate, handleCreate } = useCoordinators();
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<FormValues>();
  const password = watch('password', '');

  const onSubmit = async (data: FormValues) => {
    await handleCreate(data);
    reset();
  };

  if (!isCreateOpen) return null;
  return (
    <ModalContainer visible onClose={closeCreate}>
      <div className="flex flex-col gap-6 md:px-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary">Agregar nuevo Coordinador</h2>
          <p>Ingresa los datos del coordinador que deseas registrar.</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
          <FormInput name="name" label="Nombre" placeholder="Nombre del coordinador"
            register={register} errors={errors} rules={{ required: 'Nombre es obligatorio' }} />
          <FormInput name="email" label="Correo electrónico" placeholder="correo@leon.tecnm.mx"
            register={register} errors={errors}
            rules={{ required: 'Correo es obligatorio', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Correo inválido' } }} />
          <FormInput name="departament" label="Departamento" placeholder="Departamento"
            register={register} errors={errors} rules={{ required: 'Departamento obligatorio' }} />
          <FormInput name="password" type="password" label="Contraseña" placeholder="Contraseña"
            register={register} errors={errors}
            rules={{ required: 'Contraseña es obligatoria', pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, message: 'La contraseña debe tener al menos 8 caracteres, incluir mayúscula, minúscula, número y carácter especial' } }} />
          <FormInput name="confirmPassword" type="password" label="Confirmar contraseña" placeholder="Confirma la contraseña"
            register={register} errors={errors}
            rules={{ required: 'Confirmación es obligatoria', validate: value => value === password || 'Las contraseñas no coinciden' }} />
          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={closeCreate} className="cancel">Cancelar</button>
            <button type="submit" className="create">Guardar</button>
          </div>
        </form>
      </div>
    </ModalContainer>
  );
};

export default CreateCoordinatorModal;