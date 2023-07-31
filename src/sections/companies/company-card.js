import PropTypes from "prop-types";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ClockIcon from "@heroicons/react/24/solid/ClockIcon";
import {
  Avatar,
  Box,
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

const getServiceLogo = (project_category) => {
  if (project_category === "Digital Marketing") {
    return "assets/services/digital-marketing.png";
  }
};

const ProjectReports = ({ expanded }) => {
  return (
    <Collapse in={expanded} timeout="auto" unmountOnExit>
      <CardContent>
        <Typography paragraph>Method:</Typography>
        <Typography paragraph>
          Heat 1/2 cup of the broth in a pot until simmering, add saffron and
          set aside for 10 minutes.
        </Typography>
        <Typography paragraph>
          Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
          over medium-high heat. Add chicken, shrimp and chorizo, and cook,
          stirring occasionally until lightly browned, 6 to 8 minutes. Transfer
          shrimp to a large plate and set aside, leaving chicken and chorizo in
          the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
          pepper, and cook, stirring often until thickened and fragrant, about
          10 minutes. Add saffron broth and remaining 4 1/2 cups chicken broth;
          bring to a boil.
        </Typography>
        <Typography paragraph>
          Add rice and stir very gently to distribute. Top with artichokes and
          peppers, and cook without stirring, until most of the liquid is
          absorbed, 15 to 18 minutes. Reduce heat to medium-low, add reserved
          shrimp and mussels, tucking them down into the rice, and cook again
          without stirring, until mussels have opened and rice is just tender, 5
          to 7 minutes more. (Discard any mussels that don&apos;t open.)
        </Typography>
        <Typography>
          Set aside off of the heat to let rest for 10 minutes, and then serve.
        </Typography>
      </CardContent>
    </Collapse>
  );
};

export const CompanyCard = (props) => {
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
        direction="row"
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
          <SvgIcon color="action" fontSize="small">
            <ArrowDownOnSquareIcon />
          </SvgIcon>
          <Typography color="text.secondary" display="inline" variant="body2">
            {data.downloads} Downloads
          </Typography>
        </Stack>
      </Stack>
      <ProjectReports expanded={expanded} />
    </Card>
  );
};

CompanyCard.propTypes = {
  data: PropTypes.object.isRequired,
};
