import {
  Button,
  Card,
  Container,
  Divider,
  Flex,
  Grid,
  Group,
  Image,
  Title,
  Text,
  Overlay,
  Space,
} from "@mantine/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import kidneybeans from "../assets/image/kidneybeans.jpg"; // Import the image
import pules from "../assets/image/pulses.jpg"; // Import the image
import multiple from "../assets/image/allimage.jpg"; // Import the image
import home2 from "../assets/image/home4.jpg"; // Import the image
import sinotruck from "../assets/image/sino3.jpg"; // Import the image
import sinotrack from "../assets/image/sinotrack.png"; // Import the image
import miningproduct from "../assets/image/miningproduct.jpg"; // Import the image
import coffee from "../assets/image/c1.webp"; // Import the image
import avatoor2 from "../assets/image/avator2.jpg"; // Import the image
import avatoor1 from "../assets/image/avatoor1.jpg"; // Import the image

const About = () => {
  const [homeImageHovered, setHomeImageHovered] = useState(false);
  return (
    <>
      <Container fluid p={0} h={"calc(100vh - 80px)"}>
        <div
          onMouseEnter={() => setHomeImageHovered(true)} // On hover, set to true
          onMouseLeave={() => setHomeImageHovered(false)} // On hover leave, set to false
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            overflow: "hidden", // Ensure no overflow from the image
            transition: "all 0.3s ease", // Smooth transition for hover effects
          }}
        >
          <Image
            src={homeImageHovered ? sinotrack : kidneybeans} // Replace with your image URL
            alt="Full-screen"
            style={{
              objectFit: "cover", // Still cover but with max width/height
              width: "100%", // Ensure it spans the full width
              height: "100%", // Ensure it spans the full height
              maxWidth: "100%", // Prevent image from overflowing horizontally
              maxHeight: "100%", // Prevent image from overflowing vertically
              display: "block",
              filter: homeImageHovered ? "contrast(150%)" : "none",
              transition: "filter 0.3s ease",
            }}
          />
          <Text
            style={{
              position: "absolute", // Position the text absolutely within the container
              top: "50%", // Center vertically
              left: "50%", // Center horizontally
              transform: "translate(-50%, -50%)", // Adjust for perfect centering
              color: "white", // Make text white for visibility
              textAlign: "center",
              backgroundColor:
                "rgba(0, 0, 0, 0.5)" /* Optional: Add a semi-transparent background */,
              borderRadius: 15 /* Optional: Rounded corners */,
              fontSize: "2rem", // Large text size
              fontWeight: "bold", // Optional: Make the text bold
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)", // Optional: Add text shadow for contrast
            }}
          >
            About Us
            <Space />
            We Provide a variety of services
          </Text>
        </div>
      </Container>
      <Container
        mt={32}
        fluid
        bg={"#ced4da"}
        style={{
          width: "100%", // full viewport width
          overflow: "hidden", // hide any overflow>
        }}
      >
        <Title ta={"center"} order={2} mt="sm" mb="sm">
          <Divider
            my="xl"
            label={
              <Text size="xl" color="red" fw={800} fz={26}>
                About YEMI General Trading LLC
              </Text>
            }
            labelPosition="center"
            color="red"
            size="md"
          />
        </Title>
        <Grid grow pb={30}>
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }} pb={20}>
          <Card
              shadow="sm"
              padding="xl"
              component="a"
              target="_blank"
            >
              <Card.Section>
              <Image
                src={coffee} // Replace with your image URL
                alt="Full-screen"
                style={{
                  objectFit: "cover", // Still cover but with max width/height
                  width: "100%", // Ensure it spans the full width
                  height: "100%", // Ensure it spans the full height
                  display: "block",
                  transition: "filter 0.3s ease",
                }}
              />
              </Card.Section>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
            <Card shadow="sm" radius="md" withBorder>
              <Group justify="space-between" mt="xs" mb="xs">
                <Text fw={500} fz={22}>
                  About Us
                </Text>
              </Group>

              <Text size="mD" c="dimmed">
                YEMI General Trading L.L.C. was Founded on June 25, 2022, in
                Dubai, UAE, Y E M I GENERAL TRADING L.L.C. is a dedicated
                provider of world-class import and export solutions. Our
                extensive services include trading, commissioning, civil works,
                and brokerage, aimed at empowering businesses by connecting them
                with global opportunities. We specialize in delivering
                high-quality products and tailored trade solutions to meet
                diverse client needs worldwide.
              </Text>
            </Card>
          </Grid.Col>
        </Grid>
      </Container>
      <Container
        mt={42}
        fluid
        style={{
          width: "100%", // full viewport width
          overflow: "hidden", // hide any overflow>
        }}
      >
        <Title ta={"center"} order={2} mt="sm" mb="sm">
          <Divider
            my="xl"
            label={
              <Text size="xl" color="red" fw={800} fz={26}>
                Our Workers
              </Text>
            }
            labelPosition="center"
            color="red"
            size="md"
          />
        </Title>
        <Grid grow pb={30}>
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
            <Card
              shadow="sm"
              padding="xl"
              component="a"
              target="_blank"
            >
              <Card.Section>
                <Image src={avatoor1} h={160} alt="No way!" style={{objectFit: 'contain'}}/>
              </Card.Section>

              <Text fw={500} size="lg" mt="md">
                You&apos;ve won a million dollars in cash!
              </Text>

              <Text mt="xs" c="dimmed" size="sm">
                Please click anywhere on this card to claim your reward, this is
                not a fraud, trust us
              </Text>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
            <Card
              shadow="sm"
              padding="xl"
              component="a"
              target="_blank"
            >
              <Card.Section>
                <Image src={avatoor2} h={160} alt="No way!" style={{objectFit: 'contain'}}/>
              </Card.Section>

              <Text fw={500} size="lg" mt="md">
                You&apos;ve won a million dollars in cash!
              </Text>

              <Text mt="xs" c="dimmed" size="sm">
                Please click anywhere on this card to claim your reward, this is
                not a fraud, trust us
              </Text>
            </Card>
          </Grid.Col>
        </Grid>
        <Grid grow pb={30}>
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
            <Card
              shadow="sm"
              padding="xl"
              component="a"
              target="_blank"
            >
              <Card.Section>
                <Image src={avatoor2} h={160} alt="No way!" style={{objectFit: 'contain'}}/>
              </Card.Section>

              <Text fw={500} size="lg" mt="md">
                You&apos;ve won a million dollars in cash!
              </Text>

              <Text mt="xs" c="dimmed" size="sm">
                Please click anywhere on this card to claim your reward, this is
                not a fraud, trust us
              </Text>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
            <Card
              shadow="sm"
              padding="xl"
              component="a"
              target="_blank"
            >
              <Card.Section>
                <Image src={avatoor1} h={160} alt="No way!" style={{objectFit: 'contain'}}/>
              </Card.Section>

              <Text fw={500} size="lg" mt="md">
                You&apos;ve won a million dollars in cash!
              </Text>

              <Text mt="xs" c="dimmed" size="sm">
                Please click anywhere on this card to claim your reward, this is
                not a fraud, trust us
              </Text>
            </Card>
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
};

export default About;
