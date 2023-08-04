import { useContext, useEffect, useMemo, useState } from "react";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Stack,
  SvgIcon,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { KeywordsTable } from "src/sections/keywords/keywords-table";
import { KeywordsSearch } from "src/sections/keywords/keywords-search";
import SEO from "@/components/seo";
import {
  GetProjectKeywords,
  GetProjects,
  getDomainAnalytics,
} from "@/utils/axios/axios";
import { OverviewCard } from "@/sections/overview/overview-card";
import { AuthContext } from "@/contexts/auth-context";

const useCustomerIds = (keywords) => {
  return useMemo(() => {
    return keywords === [] ? null : keywords?.map((keyword) => keyword.id);
  }, [keywords]);
};

const Page = () => {
  const [keywords, setKeywords] = useState([]);
  const [groupedKeywords, setGroupedKeywords] = useState({});
  const [comparekeywords, setComparekeywords] = useState([]);

  const [potentialKeywords, setPotentialKeywords] = useState([]);
  const [groupedPotentialKeywords, setGroupedPotentialKeywords] = useState({});
  const [comparePotentialKeywords, setComparePotentialKeywords] = useState([]);

  const [domainAnalytics, setDomainAnalytics] = useState([]);
  const [groupedDomainAnalytics, setGroupedDomainAnalytics] = useState([]);
  const [compareDomainAnalytics, setCompareDomainAnalytics] = useState([]);

  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(0);
  const [compareOption, setCompareOption] = useState([]);
  const [isCompare, setIsCompare] = useState(false);
  const { user } = useContext(AuthContext);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchSEOProjects = async () => {
      const data = await GetProjects({
        client_id: user.id,
      });
      const projects = data.filter((item) => {
        return item.sub_category === "SEO";
      });

      setProjects(projects);
      setSelectedProject(projects.length !== 0 ? projects[0].id : 0);
    };
    fetchSEOProjects();
  }, []);

  useEffect(() => {
    const fetchProjectKeywords = async () => {
      const data = await GetProjectKeywords({
        project_id: 107,
      });
      if (!data) {
        return;
      }
      const groupedKeywords = data.keywords.reduce((acc, keyword) => {
        const afterWhatDays = keyword.after_what_days;
        if (!acc[afterWhatDays]) {
          acc[afterWhatDays] = [];
        }
        acc[afterWhatDays].push(keyword);
        return acc;
      }, {});

      const groupedPotentialKeywords = data.potential_keywords.reduce(
        (acc, keyword) => {
          const afterWhatDays = keyword.after_what_days;
          if (!acc[afterWhatDays]) {
            acc[afterWhatDays] = [];
          }
          acc[afterWhatDays].push(keyword);
          return acc;
        },
        {}
      );

      const objectKeys = [
        ...new Set([
          ...Object.keys(groupedKeywords),
          ...Object.keys(groupedPotentialKeywords),
        ]),
      ];

      setCompareOption(objectKeys);
      setGroupedKeywords(groupedKeywords);
      setGroupedPotentialKeywords(groupedPotentialKeywords);
    };

    const fetchDomainAnalytics = async () => {
      const data = await getDomainAnalytics({
        project_id: 107,
      });

      if (!data) {
        return;
      }

      const groupedAnalytics = data.reduce((acc, item) => {
        const afterWhatDays = item.after_what_days;
        if (!acc[afterWhatDays]) {
          acc[afterWhatDays] = [];
        }
        acc[afterWhatDays].push(item);
        return acc;
      }, {});

      setGroupedDomainAnalytics(groupedAnalytics);
    };

    fetchProjectKeywords();
    fetchDomainAnalytics();
  }, []);

  useEffect(() => {
    if (compareOption.length !== 0) {
      const numArray = compareOption.map(Number);
      const maxNum = Math.max(...numArray);
      setKeywords(groupedKeywords[maxNum] ? groupedKeywords[maxNum] : []);
      setPotentialKeywords(
        groupedPotentialKeywords[maxNum] ? groupedPotentialKeywords[maxNum] : []
      );
      setDomainAnalytics(
        groupedDomainAnalytics[maxNum] ? groupedDomainAnalytics[maxNum] : []
      );
    }
  }, [compareOption]);

  const keywordIds = useCustomerIds(keywords);
  const keywordsSelection = useSelection(keywordIds);
  const potentialKeywordIds = useCustomerIds(keywords);
  const potentialKeywordsSelection = useSelection(potentialKeywordIds);

  const handleShowLatest = () => {
    const numArray = compareOption.map(Number);
    const maxNum = Math.max(...numArray);
    setKeywords(groupedKeywords[maxNum]);
    setPotentialKeywords(groupedPotentialKeywords[maxNum]);
    setComparekeywords([]);
    setComparePotentialKeywords([]);
    setCompareDomainAnalytics([]);
  };

  const handleCompare = (value) => {
    const numArray = compareOption.map(Number);
    const maxNum = Math.max(...numArray);
    setIsCompare(true);
    setComparekeywords(groupedKeywords[maxNum - value]);
    setComparePotentialKeywords(groupedPotentialKeywords[maxNum - value]);
    setCompareDomainAnalytics(groupedDomainAnalytics[maxNum - value]);
  };

  return (
    <>
      <SEO pageTitle="Keywords Ranking" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction={`${isSmallScreen ? "column" : "row"}`}
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">Keywords Ranking</Typography>
                <Stack alignItems="center" direction="row" spacing={1}>
                  <Button
                    color="inherit"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    }
                  >
                    Import
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    }
                  >
                    Export
                  </Button>
                </Stack>
              </Stack>
              <div>
                <FormControl>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedProject}
                    disabled={
                      projects.length === 0 || projects.length === 1
                        ? true
                        : false
                    }
                    sx={{
                      border: "none",
                      outline: "none",
                      width: "250px",
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                        outline: "none",
                      },
                    }}
                    onChange={(e) => setSelectedProject(e.target.value)}
                  >
                    {projects.map((item, index) => {
                      if (item == 0) {
                        return;
                      }
                      return (
                        <MenuItem
                          key={index}
                          value={item.id}
                          hidden={selectedProject === item.id}
                        >
                          {item.name} - {item.sub_category}
                        </MenuItem>
                      );
                    })}
                    <MenuItem value={0} hidden>
                      No SEO Project
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>
            </Stack>
            <KeywordsSearch
              compareOption={compareOption}
              handleShowLatest={handleShowLatest}
              handleCompare={handleCompare}
            />
            <Box
              component="main"
              sx={{
                flexGrow: 1,
              }}
            >
              <Container maxWidth="xl">
                {domainAnalytics.map((item, index) => {
                  return (
                    <Grid container spacing={3} key={index}>
                      <Grid xs={12} sm={6} lg={3} padding={1} item={true}>
                        <OverviewCard
                          title="Domain Authority"
                          value={item.da}
                          compareData={compareDomainAnalytics[0]?.da}
                        />
                      </Grid>
                      <Grid xs={12} sm={6} lg={3} padding={1} item={true}>
                        <OverviewCard
                          title="Page Authority"
                          value={item.pa}
                          compareData={compareDomainAnalytics[0]?.pa}
                        />
                      </Grid>
                      <Grid xs={12} sm={6} lg={3} padding={1} item={true}>
                        <OverviewCard
                          title="Spam Score"
                          value={item.ss}
                          compareData={compareDomainAnalytics[0]?.ss}
                        />
                      </Grid>
                      <Grid xs={12} sm={6} lg={3} padding={1} item={true}>
                        <OverviewCard
                          title="Backlinks Profile"
                          value={item.bp}
                          compareData={compareDomainAnalytics[0]?.bp}
                        />
                      </Grid>
                    </Grid>
                  );
                })}
              </Container>
            </Box>

            <KeywordsTable
              items={keywords}
              onDeselectAll={keywordsSelection.handleDeselectAll}
              onDeselectOne={keywordsSelection.handleDeselectOne}
              onSelectAll={keywordsSelection.handleSelectAll}
              onSelectOne={keywordsSelection.handleSelectOne}
              selected={keywordsSelection.selected}
              potentialKeywords
              comparekeywords={comparekeywords}
            />
            <KeywordsTable
              items={potentialKeywords}
              onDeselectAll={potentialKeywordsSelection.handleDeselectAll}
              onDeselectOne={potentialKeywordsSelection.handleDeselectOne}
              onSelectAll={potentialKeywordsSelection.handleSelectAll}
              onSelectOne={potentialKeywordsSelection.handleSelectOne}
              selected={potentialKeywordsSelection.selected}
              comparekeywords={comparePotentialKeywords}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
