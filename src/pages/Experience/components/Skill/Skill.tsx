import { Box } from "@mui/material";
import { ReactNode } from "react";

export interface SkillProps {
  icon: ReactNode;
  name: string;
}

export function Skill({ icon, name }: { icon: ReactNode; name: string }) {
  return (
    <Box>
      <Box
        sx={{
          border: "1px solid",
          borderColor: "primary.main",
          padding: "1rem",
          fontSize: "3rem",
          borderRadius: "50%",
          width: "6rem",
          height: "6rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {icon}
      </Box>
      <Box
        sx={{
          textAlign: "center",
          marginTop: "0.5rem",
          fontWeight: "bold",
          fontSize: "1.15rem",
        }}
      >
        {name}
      </Box>
    </Box>
  );
}
