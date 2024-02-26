import { useEffect } from "react";
import { useDebouncedValue } from "@mantine/hooks";
import { TextInput, Loader, rem, Container, NumberInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

import { useStore } from "./store.js";

export function SearchBar() {
  const query = useStore((state) => state.query);
  const topK = useStore((state) => state.topK);
  const loading = useStore((state) => state.loading);

  const setQuery = useStore((state) => state.setQuery);
  const clearResults = useStore((state) => state.clearResults);

  const fetchSearchResults = useStore((state) => state.fetchSearchResults);
  const [debounced] = useDebouncedValue(query, 400);

  useEffect(() => {
    if (query != "") {
      fetchSearchResults(query, topK);
    } else {
      clearResults();
    }
  }, [debounced]);

  const search = (
    <IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
  );

  const loader = <Loader color="gray" size="sm" />;
  return (
    <>
      <Container
        size={500}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextInput
          style={{ width: "100%" }}
          label=""
          radius="xl"
          size="lg"
          value={query}
          leftSection={loading ? loader : search}
          onChange={(event) => setQuery(event.currentTarget.value)}
        />
      </Container>
    </>
  );
}
