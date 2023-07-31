import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  Card,
  FormControl,
  MenuItem,
  Select,
  SvgIcon,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import TipsAndUpdatesOutlinedIcon from "@mui/icons-material/TipsAndUpdatesOutlined";
import CompareArrowsOutlinedIcon from "@mui/icons-material/CompareArrowsOutlined";

const ClearFilterIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="w-6 h-6"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const FilterIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
    />
  </svg>
);

export const KeywordsSearch = ({
  compareOption,
  handleShowLatest,
  handleCompare,
}) => {
  const [selectedFilter, setSelectedFilter] = useState(0);
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleChange = (e) => {
    const { value } = e.target;
    setSelectedFilter(value);
  };

  const handleClearFilter = () => {
    setSelectedFilter(1);
  };
  return (
    <Card
      sx={{
        p: 2,
        display: "flex",
        flexDirection: isMediumScreen ? "column" : "row",
        gap: isMediumScreen ? "1rem" : "0px",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <FormControl sx={{ width: "60%", border: "none", outline: "none" }}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedFilter}
          sx={{
            border: "none",
            outline: "none",
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: "none",
              outline: "none",
            },
          }}
          onChange={handleChange}
        >
          {compareOption.map((item, index) => {
            if (item == 0) {
              return;
            }
            return (
              <MenuItem key={index} value={item}>
                Before {item}-Days
              </MenuItem>
            );
          })}
          <MenuItem value={0} hidden>
            Latest
          </MenuItem>
        </Select>
      </FormControl>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <div>
          <Button
            onClick={() => handleCompare(selectedFilter)}
            disabled={selectedFilter === 0 ? true : false}
            sx={{ marginRight: "10px" }}
            startIcon={
              <SvgIcon fontSize="small">
                <CompareArrowsOutlinedIcon />
              </SvgIcon>
            }
            variant="contained"
          >
            Compare
          </Button>
        </div>
        <div>
          <Button
            onClick={() => {
              handleShowLatest();
              setSelectedFilter(0);
            }}
            startIcon={
              <SvgIcon fontSize="small">
                <TipsAndUpdatesOutlinedIcon />
              </SvgIcon>
            }
            variant="contained"
          >
            Show Latest
          </Button>
        </div>
      </Box>
    </Card>
  );
};
