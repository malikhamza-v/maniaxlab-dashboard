import {
  Box,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { ProjectCard } from "@/sections/projects/project-card";
import SEO from "@/components/seo";
import { client_projects_data } from "@/utils/client-project-data";
import { ProjectFilter } from "@/sections/projects/project-filter";

const Page = () => (
  <>
    <SEO pageTitle="Projects & Reports" />
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={3}>
          <Stack direction="row" justifyContent="space-between" spacing={4}>
            <Stack spacing={1}>
              <Typography variant="h4">Projects & Reports</Typography>
            </Stack>
          </Stack>
          <ProjectFilter />
          <Grid container spacing={3}>
            {client_projects_data.map((item, index) => (
              <Grid xs={12} md={12} lg={12} key={index}>
                <ProjectCard data={item} />
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
