import { ProjectCard } from "./components";
import { Box, Container, Grid } from "@mui/material";

interface Project {
  title: string;
  description: string;
  image?: string;
  link: string;
}

const cProjects: Project[] = [
  {
    title: "Koujiya Soup",
    description: "Homemade Japanese and Chinese cuisine soup",
    image: "/images/projects/soup.jpg",
    link: "https://koujiya-soup.com/",
  },
  {
    title: "Upmesh",
    description: "Automate live streaming selling on Facebook and Instagram",
    image: "/images/projects/upmesh.jpg",
    link: "https://www.upmesh.io/",
  },
  {
    title: "RAMP DEFI",
    description: "Decentralized app for staking and borrowing crypto assets",
    image: "/images/projects/ramp.jpg",
    link: "https://appv2.rampdefi.com",
  },
];

const pProjects: Project[] = [
  {
    title: "poodle-ui",
    description: "Simple React UI components with system",
    link: "https://ui.poodle.sh/",
  },
  {
    title: "poodle-note",
    description: "Simple note web app that save data at the local.",
    link: "https://note.poodle.sh/",
  },
];

export function Projects() {
  return (
    <Container maxWidth="lg">
      <Box
        component="h1"
        sx={{
          fontSize: {
            xs: "2rem",
            sm: "2.5rem",
            md: "3rem",
          },
          fontWeight: "bold",
          marginBottom: "1rem",
        }}
      >
        PROJECTS
      </Box>
      <p>Here are some of the projects I have worked on</p>

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
          mt: "1rem",
        }}
      >
        Commercial Projects
      </Box>
      <Box
        sx={{
          mt: "1rem",
        }}
      >
        <Grid container spacing={{ xs: 4, sm: 3 }}>
          {cProjects.map((project) => {
            return (
              <Grid item key={project.title} sm={4} xs={12}>
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  link={project.link}
                />
              </Grid>
            );
          })}
        </Grid>
      </Box>

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
          mt: "4rem",
        }}
      >
        Personal Projects
      </Box>
      <Box
        sx={{
          mt: "1rem",
        }}
      >
        <Grid container spacing={{ xs: 4, sm: 3 }}>
          {pProjects.map((project) => {
            return (
              <Grid item key={project.title} sm={4} xs={12}>
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  link={project.link}
                />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Container>
  );
}
