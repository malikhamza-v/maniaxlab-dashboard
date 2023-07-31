import PropTypes from "prop-types";
import ClockIcon from "@heroicons/react/24/solid/ClockIcon";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import DownloadReport from "@heroicons/react/24/outline/ArrowDownTrayIcon";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Collapse,
  Divider,
  LinearProgress,
  Stack,
  SvgIcon,
  Typography,
  linearProgressClasses,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { useState } from "react";
import { getDaysFromStart, getRemainingDays } from "@/utils";
import { report_data } from "@/utils/report-data";

const getServiceLogo = (project_category) => {
  if (project_category === "Digital Marketing") {
    return "assets/services/digital-marketing.png";
  }
};

const ReportCard = ({ data }) => {
  return (
    <Box>
      <Card
        sx={{
          p: 2,
          m: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "lightpink",
        }}
      >
        <Typography variant="body2" sx={{ marginBlock: "auto" }}>
          {data.title}
        </Typography>
        <SvgIcon color="action" fontSize="small" sx={{ cursor: "pointer" }}>
          <DownloadReport />
        </SvgIcon>
      </Card>
    </Box>
  );
};

const ProjectReports = ({ expanded }) => {
  return (
    <Collapse
      in={expanded}
      timeout="auto"
      unmountOnExit
      sx={{ borderTop: 1, borderColor: "grey.200" }}
    >
      <CardContent>
        {report_data.map((data, index) => {
          return <ReportCard data={data} />;
        })}
      </CardContent>
    </Collapse>
  );
};

export const ProjectCard = (props) => {
  const { data } = props;
  const [expanded, setExpanded] = useState(false);
  const logo = getServiceLogo(data.project_category);
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const ProgressBar = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
    },
  }));

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pb: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Avatar src={logo} variant="square" />
            <Box>
              <Typography align="center" variant="subtitle1">
                {data.sub_category}
              </Typography>
              <Typography align="center" variant="subtitle2">
                {data.project_type}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: isSmallScreen ? "column" : "row",
              gap: "10px",
            }}
          >
            <Chip
              label={data.project_status}
              variant="filled"
              color="default"
            />
            <Chip
              label={data.project_category}
              variant="filled"
              color="success"
            />
          </Box>
        </Box>
        <Typography gutterBottom variant="h5">
          {data.project_name}
        </Typography>
        <Typography variant="body1">{data.project_description}</Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ width: "100%", mr: 3 }}>
            <ProgressBar
              variant="determinate"
              value={getRemainingDays(data.created_at, data.project_length)}
            />
          </Box>
          <Box sx={{ minWidth: 35 }}>
            <Typography variant="body2" color="text.secondary">
              {`${getRemainingDays(data.created_at, data.project_length)}%`}
            </Typography>
          </Box>
        </Box>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Stack
        alignItems="center"
        direction={isSmallScreen ? "column" : "row"}
        justifyContent="space-between"
        spacing={2}
        sx={{ p: 2 }}
      >
        <Stack alignItems="center" direction="row" spacing={1}>
          <SvgIcon color="action" fontSize="small">
            <ClockIcon />
          </SvgIcon>
          <Typography color="text.secondary" display="inline" variant="body2">
            Started {getDaysFromStart(data.created_at)}-Day ago
          </Typography>
        </Stack>
        <Stack alignItems="center" direction="row" spacing={1}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setExpanded(!expanded)}
            endIcon={<AssessmentOutlinedIcon />}
          >
            View Reports
          </Button>
        </Stack>
      </Stack>
      <ProjectReports expanded={expanded} />
    </Card>
  );
};

ProjectCard.propTypes = {
  data: PropTypes.object.isRequired,
};
