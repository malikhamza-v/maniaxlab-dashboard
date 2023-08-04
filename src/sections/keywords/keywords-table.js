import PropTypes from "prop-types";
import {
  Box,
  Card,
  Checkbox,
  CircularProgress,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Tooltip,
  Typography,
  alpha,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import DeleteIcon from "@mui/icons-material/Delete";

function EnhancedTableToolbar(props) {
  const { numSelected, potentialKeywords } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {`${potentialKeywords ? "Potential" : "Priority"} Keywords`}
        </Typography>
      )}

      {numSelected > 0 && (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

export const KeywordsTable = (props) => {
  const {
    items = [],
    onDeselectAll,
    onDeselectOne,
    onSelectAll,
    onSelectOne,
    selected = [],
    potentialKeywords,
    comparekeywords,
    isKeywordsLoading,
  } = props;

  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items.length > 0 && selected.length === items.length;

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            potentialKeywords={potentialKeywords}
          />
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedAll}
                      indeterminate={selectedSome}
                      onChange={(event) => {
                        if (event.target.checked) {
                          onSelectAll?.();
                        } else {
                          onDeselectAll?.();
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">Keyword</TableCell>
                  <TableCell align="center">Position (Google)</TableCell>
                  <TableCell align="center">Position (Bing)</TableCell>
                  <TableCell align="center">Keyword Difficulty</TableCell>
                  <TableCell align="center">Potential Traffic</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {items.length !== 0 &&
                  items.map((customer) => {
                    const value = comparekeywords?.filter((item) => {
                      return item.keyword === customer.keyword;
                    });

                    const isSelected = selected.includes(customer.id);

                    return (
                      <TableRow hover key={customer.id} selected={isSelected}>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isSelected}
                            onChange={(event) => {
                              if (event.target.checked) {
                                onSelectOne?.(customer.id);
                              } else {
                                onDeselectOne?.(customer.id);
                              }
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2" align="center">
                            {customer.keyword}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          {value[0]?.position_google
                            ? ` ${value[0]?.position_google} -> ${customer.position_google}`
                            : customer.position_google}
                        </TableCell>
                        <TableCell align="center">
                          {value[0]?.position_bing
                            ? `${value[0]?.position_bing} -> ${customer.position_bing} `
                            : customer.position_bing}
                        </TableCell>
                        <TableCell align="center">
                          {value[0]?.keyword_difficulty
                            ? `${value[0]?.keyword_difficulty} -> ${customer.keyword_difficulty}`
                            : customer.keyword_difficulty}
                        </TableCell>
                        <TableCell align="center">
                          {value[0]?.keyword_difficulty
                            ? `${value[0]?.potential_traffic} -> ${customer.potential_traffic} `
                            : customer.potential_traffic}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
            {items.length === 0 && !isKeywordsLoading && (
              <div className="text-center py-3">
                <span className="text-secondary">
                  {!potentialKeywords
                    ? "Unlock the full potential of your project! Start by adding priority keywords now"
                    : "Our specialists are currently adding the keywords for you - Please check back later"}
                </span>
              </div>
            )}

            {isKeywordsLoading && (
              <div className="text-center py-3">
                <CircularProgress style={{ height: "30px", width: "30px" }} />{" "}
              </div>
            )}
          </TableContainer>
        </Box>
      </Scrollbar>
    </Card>
  );
};
