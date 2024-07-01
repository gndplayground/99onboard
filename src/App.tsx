import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Main } from "./layouts";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";
import { PageLoading } from "./components";

const LandingPage = lazy(() =>
  import("./pages/Landing").then((m) => ({
    default: m.Landing,
  })),
);

const ProjectsPage = lazy(() =>
  import("./pages/Projects").then((m) => ({
    default: m.Projects,
  })),
);

const ExperiencePage = lazy(() =>
  import("./pages/Experience").then((m) => ({
    default: m.Experience,
  })),
);

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}>
            <Route
              index
              element={
                <Suspense fallback={<PageLoading />}>
                  <LandingPage />
                </Suspense>
              }
            />
            <Route
              path="experience"
              element={
                <Suspense fallback={<PageLoading />}>
                  <ExperiencePage />
                </Suspense>
              }
            />
            <Route
              path="projects"
              element={
                <Suspense fallback={<PageLoading />}>
                  <ProjectsPage />
                </Suspense>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
