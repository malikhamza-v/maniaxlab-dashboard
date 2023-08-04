import { Box, Container, Stack, Typography } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import SEO from "@/components/seo";
import ReferralCode from "@/sections/referral/referral-code";
import { ReferralTable } from "@/sections/referral/referral-table";
import { useContext, useEffect, useState } from "react";
import { GetReferralProjects } from "@/utils/axios/axios";
import { AuthContext } from "@/contexts/auth-context";

const Page = () => {
  const [referralProjects, setReferralProjects] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user.coupon) {
      const fetchReferralProjects = async () => {
        const data = await GetReferralProjects({
          id: user?.coupon?.id,
        });
        setReferralProjects(data);
      };

      fetchReferralProjects();
    }
  }, []);

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
                <Typography variant="h4">Referral Code</Typography>
              </Stack>
            </Stack>
            <ReferralCode />
            <ReferralTable items={referralProjects} />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
