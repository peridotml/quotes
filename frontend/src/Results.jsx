import React from "react";
import { useStore } from "./store.js";
import { Box, Card, Text, Group } from "@mantine/core";

export function Results() {
  const results = useStore((state) => state.results);

  return (
    <Box sx={{ maxWidth: 1000 }} mt={20} mx="auto">
      {results
        .filter((item) => item.score > 0.1)
        .map((item) => (
          <Card
            key={item.id}
            shadow="sm"
            p="md"
            radius="md"
            mb="sm"
            sx={{ position: "relative" }}
          >
            <Text
              size="md"
              style={{
                marginBottom: 10,
                lineHeight: 1.6,
                maxHeight: "8em",
                overflow: "scroll",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 4,
                WebkitBoxOrient: "vertical",
              }}
            >
              "{item.metadata.quote}"
            </Text>
            <Text size="sm" fw={500} style={{ marginBottom: 10 }}>
              - {item.metadata.author}
            </Text>
            <Text
              size="xs"
              c="dimmed"
              style={{ position: "absolute", bottom: 5, right: 5 }}
            >
              Score: {item.score.toFixed(2)}
            </Text>
          </Card>
        ))}
    </Box>
  );
}
