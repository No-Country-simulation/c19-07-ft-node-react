import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CustomForm } from "../../../../components";
import { userCreateFormFields } from "../../constants";
import { CreateUserFormData, createUserFormSchema } from "../../schemas";

interface UserCreateFormProps {
  onSubmit: (data: CreateUserFormData) => void;
}

export const UserCreateForm = ({ onSubmit }: UserCreateFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  });

  return (
    <CustomForm
      errors={errors}
      register={register}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit(onSubmit)}
      submitButtonLabel={"Create"}
      formFields={userCreateFormFields}
    />
  );
};
