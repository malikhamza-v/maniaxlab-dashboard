import {
  Box,
  Button,
  Card,
  FormControl,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  SvgIcon,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useContext } from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { GenerateReferralCode } from "@/utils/axios/axios";
import { AuthContext } from "@/contexts/auth-context";

const ReferralCodeIcon = () => (
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
      d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
    />
  </svg>
);

const ReferralCode = () => {
  const theme = useTheme();

  const { user, refreshUser } = useContext(AuthContext);

  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleGenerate = async () => {
    const status = await GenerateReferralCode({
      user_id: user.id,
    });

    if (status) {
      refreshUser();
    }
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
        <OutlinedInput
          fullWidth
          placeholder="Generate a referral code"
          disabled
          value={user?.coupon?.coupon}
          startAdornment={
            <InputAdornment position="start">
              <SvgIcon color="action" fontSize="small">
                <ReferralCodeIcon />
              </SvgIcon>
            </InputAdornment>
          }
          sx={{ maxWidth: 500 }}
        />
      </FormControl>
      <Box
        sx={{
          display: "flex",
        }}
      >
        {!user?.coupon?.coupon && (
          <div>
            <Button
              onClick={handleGenerate}
              sx={{ marginRight: "10px" }}
              startIcon={
                <SvgIcon fontSize="small">
                  <PlusIcon />
                </SvgIcon>
              }
              variant="contained"
            >
              Generate
            </Button>
          </div>
        )}
        {/* <div>
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
        </div> */}
      </Box>
    </Card>
    // <Box
    //   sx={{
    //     display: "flex",
    //     justifyContent: "space-between",
    //     alignItems: "center",
    //   }}
    // >
    //   <OutlinedInput
    //     defaultValue=""
    //     fullWidth
    //     disabled
    //     startAdornment={
    //       <InputAdornment position="start">
    //         <SvgIcon color="action" fontSize="small">
    //           <ReferralCodeIcon />
    //         </SvgIcon>
    //       </InputAdornment>
    //     }
    //     sx={{ maxWidth: 500 }}
    //   />

    //   <div>
    //     <Button
    //       //   onClick={() => handleCompare(selectedFilter)}
    //       //   disabled={selectedFilter === 0 ? true : false}
    //       sx={{ marginRight: "10px" }}
    //       startIcon={
    //         <SvgIcon fontSize="small">
    //           <AttachFileIcon />
    //           {/* <CompareArrowsOutlinedIcon /> */}
    //         </SvgIcon>
    //       }
    //       variant="contained"
    //     >
    //       Copy to clipboard
    //     </Button>
    //   </div>
    // </Box>
  );
};

export default ReferralCode;
