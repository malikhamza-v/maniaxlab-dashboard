import { useCallback, useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { AuthContext } from "@/contexts/auth-context";
import { Country, State } from "country-state-city";
import { UpdateUserInfo, loginWithToken } from "@/utils/axios/axios";

const states = [
  {
    value: "alabama",
    label: "Alabama",
  },
  {
    value: "new-york",
    label: "New York",
  },
  {
    value: "san-francisco",
    label: "San Francisco",
  },
  {
    value: "los-angeles",
    label: "Los Angeles",
  },
];

export const AccountProfileDetails = () => {
  const { user, refreshUser } = useContext(AuthContext);

  const [values, setValues] = useState(user);

  useEffect(() => {
    if (user.id !== null) {
      setValues(user);
    }
  }, [user]);

  const handleChange = (event) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const status = await UpdateUserInfo(values.id, {
      first_name: values.first_name,
      last_name: values.last_name,
      phone_no: values.phone_no,
    });

    if (status) {
      enqueueSnackbar("User updated successfully!", {
        variant: "success",
        style: { borderRadius: 100 },
      });
      refreshUser();
    } else {
      enqueueSnackbar("Server error! Please try again later", {
        variant: "error",
        style: { borderRadius: 100 },
      });
    }
  };

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  helperText="Please specify the first name"
                  label="First name"
                  name="first_name"
                  onChange={handleChange}
                  required
                  value={values.first_name}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Last name"
                  name="last_name"
                  onChange={handleChange}
                  required
                  value={values.last_name}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  disabled
                  required
                  value={values.email}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone_no"
                  onChange={handleChange}
                  type="number"
                  value={values.phone_no}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Country"
                  name="country"
                  required
                  disabled
                  select
                  SelectProps={{ native: true }}
                  value={values.billing_info?.country}
                >
                  {Country.getAllCountries().map((item, index) => {
                    return (
                      <option key={index} value={item.isoCode}>
                        {item.name}
                      </option>
                    );
                  })}
                </TextField>
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Select State"
                  name="state"
                  required
                  select
                  disabled
                  SelectProps={{ native: true }}
                  value={values.billing_info?.state}
                >
                  {State.getStatesOfCountry(values.billing_info?.country)?.map(
                    (item, index) => {
                      return (
                        <option key={index} value={item.isoCode}>
                          {item.name}
                        </option>
                      );
                    }
                  )}

                  {states.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button variant="contained" type="submit">
            Save details
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
