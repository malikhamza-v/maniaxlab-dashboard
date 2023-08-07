import { enqueueSnackbar } from "notistack";

const Snackbar = (message, type) => {
  return enqueueSnackbar(message, {
    variant: type,
    style: { borderRadius: 100 },
  });
};

export default Snackbar;
