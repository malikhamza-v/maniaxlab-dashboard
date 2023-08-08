import PropTypes from "prop-types";
import {
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";

export const ReferralTable = (props) => {
  const { items = [] } = props;

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Referral Email</TableCell>
                  <TableCell align="center">Referral Service</TableCell>
                  <TableCell align="center">Purchase Amount</TableCell>
                  <TableCell align="center">Profit Gained</TableCell>
                  <TableCell align="center">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((referral, index) => {
                  return (
                    <TableRow hover key={index}>
                      <TableCell>
                        <Typography variant="subtitle2" align="center">
                          {referral.user_email}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">{referral.category}</TableCell>
                      <TableCell align="center">
                        $ {referral.original_amount}
                      </TableCell>
                      <TableCell align="center">
                        $ {referral.original_amount * 0.15}
                      </TableCell>
                      <TableCell align="center">
                        {referral.referral_profit}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            <div className="text-center py-3">
              <span className="text-secondary">
                There are no referrals linked to your referral code at the
                moment
              </span>
            </div>
          </TableContainer>
        </Box>
      </Scrollbar>
    </Card>
  );
};

ReferralTable.propTypes = {
  items: PropTypes.array,
};
