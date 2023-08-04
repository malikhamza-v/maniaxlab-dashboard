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
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";

export const OverviewCard = (props) => {
  const { compareData, sx, value, title } = props;

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
            {!compareData ? (
              <Typography variant="h4">{value}</Typography>
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
          </Stack>
          {/* <Avatar
            sx={{
              backgroundColor: "success.main",
              height: 56,
              width: 56,
            }}
          >
            <SvgIcon>
              <UsersIcon />
            </SvgIcon>
          </Avatar> */}
        </Stack>
      </CardContent>
    </Card>
  );
};
