import { Box, Container, styled } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Link, useLocation } from "react-router-dom";

const StyledLink = styled(Link)<{
  active: boolean;
}>(
  ({ theme, active }) => `
  text-decoration: underline;
  color: ${active ? theme.palette.primary.main : theme.palette.text.primary};
  font-size: 1.25rem;
  font-weight: 700;
`,
);

export function NavigationBar() {
  const location = useLocation();

  return (
    <Box
      component="header"
      sx={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        className="circle-animation"
        sx={{
          position: "absolute",
          bottom: 0,
          right: -100,
          zIndex: -1,
          width: 200,
          height: 200,
          borderRadius: "50%",
          backgroundColor: "primary.main",
        }}
      />
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <nav aria-label="Main navigation">
            <Box
              component="ul"
              sx={{
                display: "flex",
                gap: "1rem",
                listStyle: "none",
                padding: 0,
              }}
            >
              <li>
                <StyledLink active={location.pathname === "/"} to="/">
                  Home
                </StyledLink>
              </li>
              <li>
                <StyledLink
                  active={location.pathname === "/experience"}
                  to="/experience"
                >
                  Experience
                </StyledLink>
              </li>
              <li>
                <StyledLink
                  active={location.pathname === "/projects"}
                  to="/projects"
                >
                  Projects
                </StyledLink>
              </li>
            </Box>
          </nav>
          <Box
            sx={{
              marginLeft: "auto",
              display: "flex",
              gap: "0.75rem",
            }}
          >
            <Box
              component="a"
              href="#"
              aria-label="GitHub repository"
              title="GitHub repository"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: "text.primary",
              }}
            >
              <GitHubIcon />
            </Box>
            <Box
              component="a"
              href="#"
              aria-label="LinkedIn profile"
              title="LinkedIn profile"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: "text.primary",
              }}
            >
              <LinkedInIcon />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
