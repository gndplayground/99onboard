import { Box } from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";

export interface ProjectCardProps {
  title: string;
  description: string;
  image?: string;
  link: string;
}

export function ProjectCard({
  title,
  description,
  image,
  link,
}: ProjectCardProps) {
  return (
    <Box
      sx={{
        borderRadius: "12px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        border: "1px solid",
        borderColor: "primary.main",
        height: "100%",
        position: "relative",
        transition: "box-shadow 0.3s",
        "&:hover": {
          boxShadow: "0px 0px 112px -41px #6c4cec",
        },
        w: "100%",
      }}
    >
      <Box
        component="a"
        href={link}
        target="_blank"
        sx={{
          display: "block",
          padding: "1rem",
          backgroundColor: "#6c4cec",
          height: "200px",
          w: "100%",
          borderRadius: "12px 12px 0 0",
        }}
      >
        {image ? (
          <img
            src={image}
            alt={title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            loading="lazy"
          />
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              color: "white",
              fontSize: "2rem",
            }}
          >
            <LaunchIcon />
          </Box>
        )}
      </Box>
      <Box
        sx={{
          padding: "1rem",
        }}
      >
        <Box
          component="h2"
          sx={{
            fontSize: {
              xs: "1.5rem",
              sm: "1.75rem",
            },
            fontWeight: "bold",
            marginBottom: "1rem",
            margin: 0,
          }}
        >
          {title}
        </Box>
        <Box
          component="p"
          sx={{
            margin: "0.5rem 0 0 0",
          }}
        >
          {description}
        </Box>
      </Box>
    </Box>
  );
}
