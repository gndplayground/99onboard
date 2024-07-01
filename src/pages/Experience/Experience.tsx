import { Box, Container } from "@mui/material";

import { Skill, WorkExperience } from "./components";
import {
  IconCSS,
  IconHtml5,
  IconNextjs,
  IconNodejs,
  IconReact,
  IconTypescript,
} from "@/icons";

interface WorkExperience {
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  description: string[];
  link: string;
}

const workExperience: WorkExperience[] = [
  {
    company: "Ripples Inc",
    position: "Senior Frontend Developer",
    startDate: "02/2022",
    endDate: "06/2024",
    description: [
      "Developed and maintained e-commerce websites using Shopify",
      "Implemented responsive web design using HTML, CSS, and JavaScript",
    ],
    link: "https://www.ripples-inc.com/",
  },
  {
    company: "Upmesh",
    position: "Senior Frontend Developer",
    startDate: "02/2022",
    endDate: "02/2024",
    description: [
      "Help develop a seller dashboard that manages buyer orders from live streaming sales on Facebook and Instagram platform",
      "Develop a gateway website that handles online payment for buyer orders.",
      "Mentor Juniors, code review",
    ],
    link: "https://www.upmesh.io/",
  },
  {
    company: "RAMP DEFI",
    position: "Senior Frontend Developer",
    startDate: "02/2021",
    endDate: "02/2022",
    description: [
      "Built a decentralized application allowing users to earn yields on deposited blockchain assets.",
      "Integrated token swapping for multi chains (BNB, Polygon, Avax)",
    ],
    link: "https://rampdefi.com",
  },
];

export function Experience() {
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
        EXPERIENCE
      </Box>

      <Box
        component="section"
        sx={{
          mt: "2rem",
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
            mt: "1rem",
          }}
        >
          Skills
        </Box>

        <Box component="p">
          I have experience with the following technologies
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            mt: "1rem",
          }}
        >
          <Skill name="HTML" icon={<IconHtml5 />} />
          <Skill name="CSS" icon={<IconCSS />} />
          <Skill name="Typescript" icon={<IconTypescript />} />
          <Skill name="React" icon={<IconReact />} />
          <Skill name="Nextjs" icon={<IconNextjs />} />
          <Skill name="Node.js" icon={<IconNodejs />} />
        </Box>
      </Box>

      <Box
        component="section"
        sx={{
          mt: "5rem",
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
            mt: "1rem",
          }}
        >
          Work Experience
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "3rem",
            mt: "1.5rem",
          }}
        >
          {workExperience.map((exp) => (
            <WorkExperience
              key={exp.company}
              company={exp.company}
              position={exp.position}
              startDate={exp.startDate}
              endDate={exp.endDate}
              description={exp.description}
              link={exp.link}
            />
          ))}
        </Box>
      </Box>
    </Container>
  );
}
