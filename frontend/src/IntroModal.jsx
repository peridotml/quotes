import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Title, Text, Anchor, List } from "@mantine/core";
import { IconBrandLinkedin } from "@tabler/icons-react";

export function IntroModal() {
  const [opened, { open, close }] = useDisclosure(true);

  return (
    <>
      <Button
        radius="md"
        onClick={open}
        variant="outline"
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          opacity: 0.8,
        }}
      >
        Info
      </Button>
      <Modal
        opened={opened}
        onClose={close}
        title={"Welcome to Quote Finder"}
        size="xl"
      >
        <Title order={2}>What is it?</Title>
        <Text mb="md" mt="sm">
          Explore the potential of sparse embeddings by typing in keywords and
          getting the best matches from a database of 100k quotes.
        </Text>

        <Title order={2}>How does it work?</Title>
        <List size="md" mt="sm" withPadding>
          <List.Item>
            Powered by sparse embeddings generated with{" "}
            <Anchor
              href="https://huggingface.co/naver/efficient-splade-VI-BT-large-query"
              target="_blank"
            >
              SPLADE 🤗
            </Anchor>{" "}
            (Sparse Lexical and Expansion Model) for meaningful search results.
          </List.Item>
          <List.Item>
            Built with Rust ensuring lightning-fast response times.
          </List.Item>
          <List.Item>
            Embeddings are sent to Pinecone to find the most relevant documents.
          </List.Item>
        </List>
        <Title order={2} mt="lg">
          About Me
        </Title>
        <Text mt="sm">
          I'm a generalist with experience spanning data science, ML
          engineering, and software development. I thrive on filling the diverse
          needs of complex projects and would love to get your ML / AI
          inniatives off the ground.
        </Text>

        <Text mt="md">
          If you're looking for a flexible problem-solver, let's connect on
          <Anchor
            href="https://www.linkedin.com/in/evanasadler/"
            target="_blank"
          >
            <IconBrandLinkedin />
          </Anchor>
          !
        </Text>
      </Modal>
    </>
  );
}
