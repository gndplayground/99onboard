import { NavigationBar, Footer } from "@/components";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

export const Main: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <NavigationBar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </Box>
  );
};
