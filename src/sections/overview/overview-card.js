import PropTypes from "prop-types";
import ArrowDownIcon from "@heroicons/react/24/solid/ArrowDownIcon";
import ArrowUpIcon from "@heroicons/react/24/solid/ArrowUpIcon";
import UsersIcon from "@heroicons/react/24/solid/UsersIcon";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";

export const OverviewCard = (props) => {
  const { compareData, sx, value, title, isAnalyticsLoading } = props;
  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography color="text.secondary" variant="overline">
              {title}
            </Typography>
            {isAnalyticsLoading ? (
              <div>
                <CircularProgress style={{ height: "30px", width: "30px" }} />{" "}
              </div>
            ) : (
              <>
                {!compareData ? (
                  <>
                    {value ? (
                      <Typography variant="h4">{value}</Typography>
                    ) : (
                      <Typography variant="caption" className="text-primary">
                        Analyzing ...
                      </Typography>
                    )}
                  </>
                ) : (
                  <>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h5">{compareData}</Typography>
                      <Typography variant="h5">
                        <ArrowRightIcon />
                      </Typography>
                      <Typography variant="h5">{value}</Typography>
                    </Box>
                  </>
                )}
              </>
            )}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};
