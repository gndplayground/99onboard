import { Box, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";

export function Landing() {
  return (
    <Box
      sx={{
        mt: {
          xs: "4rem",
          md: "8rem",
        },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column-reverse",
              md: "row",
            },
            gap: {
              xs: "1.5rem",
              md: "2rem",
            },
          }}
        >
          <Box>
            <Box
              component="h1"
              sx={{
                marginTop: 0,
                marginBottom: 0,
                fontSize: {
                  xs: "2rem",
                  sm: "3rem",
                },
                textAlign: {
                  xs: "center",
                  md: "left",
                },
              }}
            >
              I'm{" "}
              <Box
                component="span"
                sx={{
                  color: "primary.main",
                }}
              >
                Giang
              </Box>
            </Box>
            <Box
              sx={{
                marginTop: "1.5rem",
                fontSize: {
                  xs: "1rem",
                  sm: "1.25rem",
                },
                "& p": {
                  marginTop: 0,
                  marginBottom: "0.75rem",
                },
                textAlign: {
                  xs: "center",
                  md: "left",
                },
              }}
            >
              <p>
                I'm a Frontend Engineer with more than seven years of
                experience. I'm passionate about creating user-friendly and
                performant applications.
              </p>
              <p>
                You can contact me via email{" "}
                <a href="mailto:giang.nguyen.dev@gmail.com">
                  giang.nguyen.dev@gmail.com
                </a>
              </p>
              <Box
                sx={{
                  marginTop: "2rem",
                }}
              >
                <Button
                  component={Link}
                  to="/projects"
                  variant="outlined"
                  size="large"
                >
                  Discover my projects
                </Button>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginLeft: {
                md: "auto",
              },
            }}
          >
            <Box
              className="me"
              sx={{
                borderRadius: "50%",
                overflow: "hidden",
                width: {
                  xs: 200,
                  sm: 250,
                  md: 300,
                },
                height: {
                  xs: 200,
                  sm: 250,
                  md: 300,
                },
                flexShrink: 0,
                border: "8px solid",
                borderColor: "primary.main",
              }}
            >
              <img
                src="/me.jpg"
                alt="A person working on a laptop"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
