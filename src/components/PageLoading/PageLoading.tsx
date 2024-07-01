import { CircularProgress, Container } from "@mui/material";

export function PageLoading() {
  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingY: "5rem",
      }}
    >
      <CircularProgress />
    </Container>
  );
}
