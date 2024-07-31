import { useState } from "react";

import { Link as RouterLink } from "react-router-dom";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Link,
  Stack,
  Alert,
  Button,
  TextField,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";

import { useAuthStore } from "../../../hooks";

const loginFormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

export const LoginForm = () => {
  const { errorMessage, startLogin } = useAuthStore();

  // ? Hide or show password
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // ? Form handling
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "4anna.leon@example.com",
      password: "o1iHKekh",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof loginFormSchema>> = async (
    data
  ) => {
    await startLogin({ ...data });
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
          disabled={isSubmitting}
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
            disabled={isSubmitting}
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

        {errorMessage && (
          <Alert
            className="animate__animated animate__headShake"
            severity="error"
          >
            {errorMessage}
          </Alert>
        )}

        <Button type="submit" variant="contained" disabled={isSubmitting}>
          {isSubmitting && <CircularProgress size={15} sx={{ mr: 1 }} />}
          Login
        </Button>
      </Stack>
    </Box>
  );
};
