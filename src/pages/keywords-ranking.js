import { useEffect, useMemo, useState } from "react";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { KeywordsTable } from "src/sections/keywords/keywords-table";
import { KeywordsSearch } from "src/sections/keywords/keywords-search";
import SEO from "@/components/seo";
import { GetProjectKeywords } from "@/utils/axios/axios";
import { OverviewCard } from "@/sections/overview/overview-card";

const useCustomerIds = (keywords) => {
  return useMemo(() => {
    return keywords === [] ? null : keywords?.map((keyword) => keyword.id);
  }, [keywords]);
};

const Page = () => {
  const [keywords, setKeywords] = useState([]);
  const [potentialKeywords, setPotentialKeywords] = useState([]);
  const [groupedKeywords, setGroupedKeywords] = useState({});
  const [groupedPotentialKeywords, setGroupedPotentialKeywords] = useState({});
  const [compareOption, setCompareOption] = useState([]);
  const [isCompare, setIsCompare] = useState(false);
  const [comparekeywords, setComparekeywords] = useState([]);
  const [comparePotentialKeywords, setComparePotentialKeywords] = useState([]);

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

    fetchProjectKeywords();
  }, []);

  useEffect(() => {
    if (compareOption.length !== 0) {
      const numArray = compareOption.map(Number);
      const maxNum = Math.max(...numArray);
      setKeywords(groupedKeywords[maxNum] ? groupedKeywords[maxNum] : []);
      setPotentialKeywords(
        groupedPotentialKeywords[maxNum] ? groupedPotentialKeywords[maxNum] : []
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
  };

  const handleCompare = (value) => {
    const numArray = compareOption.map(Number);
    const maxNum = Math.max(...numArray);
    setIsCompare(true);
    setComparekeywords(groupedKeywords[maxNum - value]);
    setComparePotentialKeywords(groupedPotentialKeywords[maxNum - value]);
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
            <Stack direction="row" justifyContent="space-between" spacing={4}>
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
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  Add
                </Button>
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
                    <OverviewCard title="Domain Authority" value="24K" />
                  </Grid>
                  <Grid xs={12} sm={6} lg={3} padding={1} item={true}>
                    <OverviewCard title="Page Authority" value={30} />
                  </Grid>
                  <Grid xs={12} sm={6} lg={3} padding={1} item={true}>
                    <OverviewCard title="Spam Score" value={50} />
                  </Grid>
                  <Grid xs={12} sm={6} lg={3} padding={1} item={true}>
                    <OverviewCard title="Backlinks Profile" value={50} />
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
