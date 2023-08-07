import {
  Box,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
  CircularProgress,
} from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { ProjectCard } from "@/sections/projects/project-card";
import SEO from "@/components/seo";
import { ProjectFilter } from "@/sections/projects/project-filter";
import { useContext, useEffect, useState } from "react";
import { GetProjects } from "@/utils/axios/axios";
import { AuthContext } from "@/contexts/auth-context";
import { AppDataContext } from "@/contexts/app-data-context";

const Page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [filterProjects, setFilterProjects] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("All");

  const { user } = useContext(AuthContext);
  const { appDataState, appDataDispatch } = useContext(AppDataContext);
  const { projects } = appDataState;

  useEffect(() => {
    if (projects.length === 0) {
      const fetchClientProjects = async () => {
        setIsLoading(true);
        const data = await GetProjects({
          client_id: user.id,
        });
        setIsLoading(false);
        appDataDispatch({ type: "SET_PROJECTS", payload: data });
      };

      fetchClientProjects();
    }
  }, []);

  useEffect(() => {
    if (projects.length !== 0) {
      setFilterProjects(projects);
    }
  }, [projects]);

  const handleFilter = () => {
    if (selectedFilter === "All") {
      return;
    }
    const data = projects.filter((item) => {
      return item.status === selectedFilter;
    });

    setFilterProjects(data);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setSelectedFilter(value);
  };

  const handleClearFilter = () => {
    setFilterProjects(projects);
    setSelectedFilter("All");
  };

  return (
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
            <ProjectFilter
              handleFilter={handleFilter}
              handleClearFilter={handleClearFilter}
              setSelectedFilter={setSelectedFilter}
              handleChange={handleChange}
              selectedFilter={selectedFilter}
            />
            <Grid container spacing={3}>
              {isLoading ? (
                <Box sx={{ display: "flex", mx: "auto" }}>
                  <CircularProgress />
                </Box>
              ) : filterProjects.length !== 0 ? (
                filterProjects.map((item, index) => (
                  <Grid xs={12} md={12} lg={12} key={index}>
                    <ProjectCard data={item} />
                  </Grid>
                ))
              ) : (
                <Container
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src="assets/errors/no-project.png"
                    className="img-fluid"
                    height={120}
                    width={120}
                  />
                  <Typography className="text-secondary text-center">
                    No {selectedFilter} Projects at the moment
                  </Typography>
                </Container>
              )}
            </Grid>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
