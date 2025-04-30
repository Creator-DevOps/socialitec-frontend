import React, { useEffect } from 'react';
import ModalContainer from '@/components/containers/modal.container';
import { useForm } from 'react-hook-form';
import { FormInput } from '@/components/forms/inputs/form-input';
import { useCoordinators } from '../index/coordinator-context';
import Loader from '@/components/ui-componets/load/Loader';

interface FormValues {
  name: string;
  email?: string;
  departament?: string;
  password?: string;
  confirmPassword?: string;
  [key: string]: unknown;
}

const UpdateCoordinatorModal: React.FC = () => {
  const { isEditOpen, selected, closeEdit, handleUpdate } = useCoordinators();
  const { register, handleSubmit, watch, setValue, formState: { errors }, reset } = useForm<FormValues>();
  const password = watch('password', '');

  useEffect(() => {
    if (selected) {
      setValue('name', selected.name);
      setValue('email', selected.email || '');
      setValue('departament', selected.departament || '');
    }
  }, [selected]);

  const onSubmit = async (data: FormValues) => {
    await handleUpdate(data);
    //reset();
  };

  if (!isEditOpen || !selected) return null;
  return (
    <ModalContainer visible onClose={closeEdit}>
      <div className="flex flex-col gap-6 md:px-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary">Editar Coordinador</h2>
          <p>Modifica los datos del coordinador seleccionado.</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
          <FormInput name="name" label="Nombre" placeholder="Nombre del coordinador"
            register={register} errors={errors} rules={{ required: 'Nombre es obligatorio' }} />
          <FormInput name="email" label="Correo electrónico" placeholder="correo@ejemplo.com"
            register={register} errors={errors}
            rules={{ required: 'Correo es obligatorio', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Correo inválido' } }} />
          <FormInput name="departament" label="Departamento" placeholder="Departamento"
            register={register} errors={errors} rules={{ required: 'Departamento obligatorio' }} />
          <FormInput name="password" type="password" label="Nueva contraseña (opcional)" placeholder="Nueva contraseña"
            register={register} errors={errors}
            rules={{ pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, message: 'La contraseña debe tener al menos 8 caracteres, incluir mayúscula, minúscula, número y carácter especial' } }} />
          <FormInput name="confirmPassword" type="password" label="Confirmar contraseña" placeholder="Confirma la nueva contraseña"
            register={register} errors={errors}
            rules={{ validate: value => (!password || value === password) || 'Las contraseñas no coinciden' }} />
          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={closeEdit} className="cancel">Cancelar</button>
            <button type="submit" className="create">Actualizar</button>
          </div>
        </form>
      </div>
    </ModalContainer>
  );
};

export default UpdateCoordinatorModal;