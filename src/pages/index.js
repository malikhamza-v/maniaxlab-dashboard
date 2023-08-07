import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { OverviewBudget } from "src/sections/overview/overview-budget";
import { OverviewTasksProgress } from "src/sections/overview/overview-tasks-progress";
import { OverviewTotalCustomers } from "src/sections/overview/overview-total-customers";
import { OverviewTotalProfit } from "src/sections/overview/overview-total-profit";
import SEO from "@/components/seo";

import {
  Box,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { AccountProfile } from "src/sections/account/account-profile";
import { AccountProfileDetails } from "src/sections/account/account-profile-details";
import { SettingsPassword } from "@/sections/settings/settings-password";
import { useContext, useEffect, useState } from "react";
import { AppDataContext } from "@/contexts/app-data-context";

const UserProfile = () => (
  <>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <div>
            <Typography variant="h4">Account</Typography>
          </div>
          <div>
            <Grid
              container
              spacing={3}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Grid xs={12} md={6} lg={4}>
                <AccountProfile />
              </Grid>
              <Grid xs={12} md={6} lg={8}>
                <AccountProfileDetails />
              </Grid>
            </Grid>
          </div>
        </Stack>
      </Container>
    </Box>
  </>
);

const HomePage = () => {
  const { appDataState } = useContext(AppDataContext);

  const { userStats } = appDataState;

  return (
    <>
      <SEO pageTitle="Dashboard" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewBudget
                positive
                sx={{ height: "100%" }}
                value={userStats?.total_projects}
              />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewTotalCustomers
                positive={false}
                sx={{ height: "100%" }}
                value={`$ ${userStats?.total_spent}`}
              />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewTasksProgress
                sx={{ height: "100%" }}
                value={userStats?.projects_in_progress}
              />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewTotalProfit
                sx={{ height: "100%" }}
                value={`$ ${userStats?.referral_profit}`}
              />
            </Grid>
            <UserProfile />
            <Container maxWidth="lg">
              <Stack spacing={3}>
                <Typography variant="h4">Settings</Typography>
                <SettingsPassword />
              </Stack>
            </Container>
          </Grid>
        </Container>
      </Box>
    </>
  );
};
HomePage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default HomePage;
