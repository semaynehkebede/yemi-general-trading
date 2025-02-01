import {
  Button,
  Grid,
  Paper,
  PasswordInput,
  TextInput,
  Modal,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { login } from "../features/loginSlice";
import { Credentials } from "../types/contentType";
import { useNavigate } from "react-router-dom";
import { RootState } from "../app/store";

const Login = () => {
  const { loading, error } = useAppSelector((state: RootState) => state.user);

  const dispatch = useAppDispatch();
  const [opened, setOpened] = useState(true); // Modal state
  const navigate = useNavigate(); // Navigate object for navigation

  useEffect(() => {
    if (!opened) {
      navigate("/"); // Redirect to "/home" when modal is closed
    }
  }, [opened, history]);

  // Form validation
  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },

    validate: {
      username: (value) =>
        value.length < 3 ? "User Name must required" : null,
      password: (value) => (value.length < 3 ? "Password is required" : null),
    },
  });

  // const handleSubmit = async (values: Credentials) => {
  //   const resultAction = await dispatch(login(values));
  //   if (login.rejected.match(resultAction)) {
  //     const apiError = resultAction.payload as string;
  //     if (apiError) {
  //       form.setFieldError("username", apiError); // Show error on username field
  //       form.setFieldError("password", apiError); // Show error on password field
  //     }
  //   } else {
  //     setOpened(false); // Close modal on successful login
  //   }
  // };

  const handleSubmit = async (values: Credentials) => {
    console.log("form", values);
    
    const resultAction = await dispatch(login(values));
    if (login.rejected.match(resultAction)) {
      const apiError = resultAction.payload as string;
    } else {
      setOpened(false); // Close modal on successful login
    }
  };
  return (
    <>
      {/* Centered Modal */}
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Login Page" // Title of the modal
        centered // Centers the modal
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Grid>
            <Grid.Col span={12}>
              <TextInput
                withAsterisk
                label="User Name"
                {...form.getInputProps("username")}
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <PasswordInput
                withAsterisk
                label="Password"
                {...form.getInputProps("password")}
              />
            </Grid.Col>
          </Grid>
          <Button fullWidth mt="xl" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
        {/* Display general error */}
        {error && !form.errors.username && !form.errors.password && (
          <p style={{ color: "red" }}>{error}</p>
        )}
      </Modal>
    </>
  );
};

export default Login;
