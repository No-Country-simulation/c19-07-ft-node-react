import { useEffect, useState } from "react";

import { Autocomplete, Button, Grid, TextField } from "@mui/material";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAxiosPrivate } from "../../../../hooks";
import { UsersResponse } from "../../../../interfaces";
import { CreateParentFormData, createParentFormSchema } from "../../schemas";

interface ParentCreateFormProps {
  onSubmit: (data: CreateParentFormData) => void;
}

export const ParentCreateForm = ({ onSubmit }: ParentCreateFormProps) => {
  const api = useAxiosPrivate();

  const [users, setUsers] = useState<{ value: string; label: string }[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateParentFormData>({
    resolver: zodResolver(createParentFormSchema),
  });

  useEffect(() => {
    setIsLoadingUsers(true);

    const getUsers = async () => {
      try {
        const resp = await api.get<UsersResponse>(
          "/admin/users?limit=150&type-user=parents"
        );
        if (resp.data.success) {
          const users = resp.data.data.items.map((user) => ({
            value: user.user_id,
            label: user.name,
          }));

          console.log({ users });

          setUsers(users);
          setIsLoadingUsers(false);
        }
      } catch (error) {
        setIsLoadingUsers(false);
      }
    };

    getUsers();
  }, []);

  return (
    <Grid
      container
      columns={{ xs: 6, sm: 12 }}
      spacing={3}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid item xs={6}>
        <Autocomplete
          fullWidth
          openOnFocus
          blurOnSelect
          autoHighlight
          options={users}
          // onChange={(e, value) => console.log({ e, value })}
          // Revisar <Controller /> react-hook-form
          {...register("user_id")}
          getOptionLabel={(option) => option.label}
          getOptionKey={(option) => option.value}
          renderInput={(params) => (
            <TextField
              {...params}
              value={params.inputProps.value}
              label="Select User"
              variant="standard"
              error={!!errors.user_id}
              helperText={errors.user_id?.message}
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
            />
          )}
        />
      </Grid>

      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Kinship"
          variant="standard"
          placeholder="E.g. FATHER, MOTHER"
          {...register("relation")}
          error={!!errors.relation}
          helperText={errors.relation?.message}
          disabled={isSubmitting || isLoadingUsers}
        />
      </Grid>

      <Grid item xs={12} sm={3}>
        <Button type="submit" variant="contained">
          Create
        </Button>
      </Grid>
    </Grid>
  );
};
