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
          disabled={
            compareOption.length === 1 || compareOption.length === 0
              ? true
              : false
          }
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
