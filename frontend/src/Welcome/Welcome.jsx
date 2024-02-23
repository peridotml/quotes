import { Title, Text, NumberInput, Container } from "@mantine/core";
import { useStore } from "../store.js";

export function Welcome() {
  const topK = useStore((state) => state.topK);
  const setTopK = useStore((state) => state.setTopK);
  return (
    <>
      <Container style={{ justifyContent: "center", alignItems: "center" }}>
        <Title order={1} size={65} ta="center" style={{ paddingTop: 20 }}>
          <Text inherit component="span">
            Quote Finder
          </Text>
        </Title>
        <Text
          ta="center"
          c="dimmed"
          mb={15}
          component={"span"}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          Find up to
          <NumberInput
            size="xs"
            style={{ width: "50px", height: "5px", paddingBottom: "30px" }}
            clampBehavior="strict"
            value={topK}
            onChange={setTopK}
            min={1}
            max={50}
          />
          quotes.
        </Text>
      </Container>
    </>
  );
}
