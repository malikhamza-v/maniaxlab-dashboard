import { useContext, useEffect, useMemo, useState } from "react";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
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
  TextField,
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
  addPriorityKeyword,
  getDomainAnalytics,
} from "@/utils/axios/axios";
import { OverviewCard } from "@/sections/overview/overview-card";
import Snackbar from "@/components/snackbar";
import { AppDataContext } from "@/contexts/app-data-context";

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
  const [isKeywordsLoading, setIsKeywordsLoading] = useState(false);

  const [domainAnalytics, setDomainAnalytics] = useState([]);
  const [groupedDomainAnalytics, setGroupedDomainAnalytics] = useState([]);
  const [compareDomainAnalytics, setCompareDomainAnalytics] = useState([]);
  const [isAnalyticsLoading, setIsAnalyticsLoading] = useState(false);

  const [seoProjects, setSeoProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(0);
  const [compareOption, setCompareOption] = useState([]);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const { appDataState } = useContext(AppDataContext);

  const { projects } = appDataState;

  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    if (projects !== 0) {
      const data = projects.filter((item) => {
        return item.sub_category === "SEO";
      });
      setSeoProjects(data);
      setSelectedProject(data.length !== 0 ? data[0].id : 0);
    }
  }, [projects]);

  useEffect(() => {
    const fetchProjectKeywords = async () => {
      setIsKeywordsLoading(true);
      const data = await GetProjectKeywords({
        project_id: selectedProject,
      });

      setIsKeywordsLoading(false);
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
      setIsAnalyticsLoading(true);
      const data = await getDomainAnalytics({
        project_id: selectedProject,
      });

      setIsAnalyticsLoading(false);

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
    if (selectedProject !== 0) {
      fetchProjectKeywords();
      fetchDomainAnalytics();
    }
  }, [selectedProject]);

  useEffect(() => {
    const numArray = compareOption.map(Number);
    const maxNum = numArray.length === 0 ? 0 : Math.max(...numArray);
    setKeywords(groupedKeywords[maxNum] ? groupedKeywords[maxNum] : []);

    setPotentialKeywords(
      groupedPotentialKeywords[maxNum] ? groupedPotentialKeywords[maxNum] : []
    );
    setDomainAnalytics(
      groupedDomainAnalytics[maxNum] ? groupedDomainAnalytics[maxNum] : []
    );
  }, [
    compareOption,
    groupedDomainAnalytics,
    groupedKeywords,
    groupedPotentialKeywords,
  ]);

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
    setComparekeywords(groupedKeywords[maxNum - value]);
    setComparePotentialKeywords(groupedPotentialKeywords[maxNum - value]);
    setCompareDomainAnalytics(groupedDomainAnalytics[maxNum - value]);
  };

  const handleAddPriorityKeyword = async () => {
    const numArray = compareOption.map(Number);
    const maxNum = numArray.length !== 0 ? Math.max(...numArray) : 0;
    const data = await addPriorityKeyword({
      keyword,
      project: selectedProject,
      after_what_days: maxNum,
    });
    setKeyword("");
    if (data) {
      Snackbar("Keyword Added Successfully!", "success");
      setPotentialKeywords([...potentialKeywords, data]);
    }
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
                      seoProjects.length === 0 || seoProjects.length === 1
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
                    onChange={(e) => {
                      setSelectedProject(e.target.value);
                      setDomainAnalytics([]);
                      setGroupedDomainAnalytics([]);
                      setCompareDomainAnalytics([]);

                      setKeywords([]);
                      setGroupedKeywords([]);
                      setComparekeywords([]);

                      setPotentialKeywords([]);
                      setGroupedPotentialKeywords([]);
                      setComparePotentialKeywords([]);

                      setCompareOption([]);
                      handleShowLatest();
                    }}
                  >
                    {seoProjects.map((item, index) => {
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
                <Grid container spacing={3}>
                  <Grid xs={12} sm={6} lg={3} padding={1} item={true}>
                    <OverviewCard
                      title="Domain Authority"
                      value={domainAnalytics[0]?.da}
                      compareData={compareDomainAnalytics[0]?.da}
                      isAnalyticsLoading={isAnalyticsLoading}
                    />
                  </Grid>
                  <Grid xs={12} sm={6} lg={3} padding={1} item={true}>
                    <OverviewCard
                      title="Page Authority"
                      value={domainAnalytics[0]?.pa}
                      compareData={compareDomainAnalytics[0]?.pa}
                      isAnalyticsLoading={isAnalyticsLoading}
                    />
                  </Grid>
                  <Grid xs={12} sm={6} lg={3} padding={1} item={true}>
                    <OverviewCard
                      title="Spam Score"
                      value={domainAnalytics[0]?.ss}
                      compareData={compareDomainAnalytics[0]?.ss}
                      isAnalyticsLoading={isAnalyticsLoading}
                    />
                  </Grid>
                  <Grid xs={12} sm={6} lg={3} padding={1} item={true}>
                    <OverviewCard
                      title="Backlinks Profile"
                      value={domainAnalytics[0]?.bp}
                      compareData={compareDomainAnalytics[0]?.bp}
                      isAnalyticsLoading={isAnalyticsLoading}
                    />
                  </Grid>
                </Grid>
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
              isKeywordsLoading={isKeywordsLoading}
            />
            <KeywordsTable
              items={potentialKeywords}
              onDeselectAll={potentialKeywordsSelection.handleDeselectAll}
              onDeselectOne={potentialKeywordsSelection.handleDeselectOne}
              onSelectAll={potentialKeywordsSelection.handleSelectAll}
              onSelectOne={potentialKeywordsSelection.handleSelectOne}
              selected={potentialKeywordsSelection.selected}
              comparekeywords={comparePotentialKeywords}
              isKeywordsLoading={isKeywordsLoading}
            />
            <Box display="flex" justifyContent="flex-end" gap={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Enter Keyword"
                  name="priorit_keyword"
                  disabled={seoProjects.length === 0 ? true : false}
                  onChange={(e) => setKeyword(e.target.value)}
                  required
                  value={keyword}
                />
              </Grid>
              <Button
                disabled={seoProjects.length === 0 ? true : false}
                onClick={() => {
                  handleAddPriorityKeyword();
                }}
                variant="contained"
              >
                Add Keyword
              </Button>
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
