import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Loader = () => {
  return (
    <Box className="flex justify-center items-center w-full h-full ">
      <CircularProgress className="!text-primary" size={60} />
    </Box>
  );
};

export default Loader;
