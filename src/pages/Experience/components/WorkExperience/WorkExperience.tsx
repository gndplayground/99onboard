import { Box } from "@mui/material";

interface WorkExperienceProps {
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  description: string[];
  link: string;
}

export function WorkExperience({
  company,
  position,
  startDate,
  endDate,
  description,
  link,
}: WorkExperienceProps) {
  return (
    <Box>
      <Box
        component="a"
        sx={{
          color: "primary.main",
          textDecoration: "none",
          fontSize: {
            xs: "1.25rem",
            sm: "1.5rem",
          },
          fontWeight: "bold",
        }}
        href={link}
        target="_blank"
      >
        {company}
      </Box>
      <Box
        component="p"
        sx={{
          margin: 0,
          fontStyle: "italic",
        }}
      >
        {position} -- {startDate} - {endDate ? endDate : "Present"}
      </Box>
      <Box
        component="ul"
        sx={{
          paddingLeft: "1rem",
          margin: 0,
          mt: "16px",
          listStyleType: "disc",
        }}
      >
        {description.map((desc, index) => (
          <li key={index}>{desc}</li>
        ))}
      </Box>
    </Box>
  );
}
