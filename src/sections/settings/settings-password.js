import { useCallback, useContext, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  TextField,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { UpdateUserInfo } from "@/utils/axios/axios";
import { AuthContext } from "@/contexts/auth-context";

export const SettingsPassword = () => {
  const [values, setValues] = useState({
    password: "",
    confirm: "",
  });

  const { user } = useContext(AuthContext);

  const handleChange = (event) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (values.password !== "" && values.confirm !== "") {
      const status = await UpdateUserInfo(user.id, {
        password: values.password,
      });
      if (status) {
        enqueueSnackbar("Password changed successfully!", {
          variant: "success",
          style: { borderRadius: 100 },
        });
      } else {
        enqueueSnackbar("Server error! Please try again later", {
          variant: "error",
          style: { borderRadius: 100 },
        });
      }
    } else {
      enqueueSnackbar("Password do not match!", {
        variant: "error",
        style: { borderRadius: 100 },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader subheader="Update password" title="Password" />
        <Divider />
        <CardContent>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Password"
              name="password"
              onChange={handleChange}
              type="password"
              value={values.password}
            />
            <TextField
              fullWidth
              label="Password (Confirm)"
              name="confirm"
              onChange={handleChange}
              type="password"
              value={values.confirm}
            />
          </Stack>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button variant="contained" type="submit">
            Update
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
