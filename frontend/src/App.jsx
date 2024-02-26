import "@mantine/core/styles.css";
import { MantineProvider, Container } from "@mantine/core";
import { theme } from "./theme";
import { Welcome } from "./Welcome/Welcome";
import { SearchBar } from "./SearchBar";
import { Results } from "./Results";
import { IntroModal } from "./IntroModal";

export default function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <Welcome />
      <Container>
        <SearchBar />
        <Results />
      </Container>
      <IntroModal />
    </MantineProvider>
  );
}
