import { Box, Container } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export function Footer() {
  return (
    <Box
      sx={{
        marginTop: "auto",
        paddingBottom: "2rem",
        paddingTop: "5rem",
        position: "relative",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              marginRight: "1rem",
            }}
          >
            <a href="">
              <GitHubIcon />
            </a>
          </Box>
          <Box>
            <a href="">
              <LinkedInIcon />
            </a>
          </Box>
        </Box>
        <Box
          sx={{
            mt: "0.5rem",
            fontSize: "0.875rem",
            textAlign: "center",
          }}
        >
          © 2024 Giang Nguyen. All rights reserved.
        </Box>
      </Container>
    </Box>
  );
}
