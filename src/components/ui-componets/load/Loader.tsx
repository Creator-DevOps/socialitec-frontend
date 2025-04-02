import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Loader = () => {
  return (
    <Box className="flex justify-center items-center min-h-screen">
      <CircularProgress className="!text-primary" size={60} />
    </Box>
  );
};

export default Loader;
