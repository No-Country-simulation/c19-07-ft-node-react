import { useState } from "react";

import { Link as RouterLink } from "react-router-dom";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Link,
  Stack,
  Button,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";

const loginFormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

export const LoginForm = () => {
  // ? Hide or show password
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // ? Form handling
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof loginFormSchema>> = async (
    data
  ) => {
    console.log({ data });
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          placeholder="john.doe@example.com"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <Box display="flex" flexDirection="column">
          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            placeholder="********"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Link
            component={RouterLink}
            to=""
            color="text.secondary"
            variant="caption"
            textAlign="right"
            my={1}
          >
            Forgot your password?
          </Link>
        </Box>

        <Button type="submit" variant="contained">
          Login
        </Button>
      </Stack>
    </Box>
  );
};
