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
import home3 from "../assets/image/home3.jpg"; // Import the image
import special from "../assets/image/special.jpg"; // Import the image
import multiple from "../assets/image/allimage.jpg"; // Import the image
import nigerseed from "../assets/image/nigerseed.jpg"; // Import the image
import kidneybeans from "../assets/image/kidneybeans.jpg"; // Import the image
import greenmungbeans from "../assets/image/Green-Mung-Beans.png"; // Import the image
import miningproduct from "../assets/image/miningproduct.jpg"; // Import the image
import oilseed from "../assets/image/humerasesame.png"; // Import the image
import excavator from "../assets/image/excavator.png"; // Import the image
import dozer from "../assets/image/dozer.png"; // Import the image
import crane from "../assets/image/crane1.jpg"; // Import the image
import coffee from "../assets/image/c1.webp"; // Import the image
import consulting from "../assets/image/consulting.jpg"; // Import the image
import commission from "../assets/image/commission.png"; // Import the image
import loader from "../assets/image/loader.png"; // Import the image

const Service = () => {
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
            src={homeImageHovered ? multiple : loader} // Replace with your image URL
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
              color: "red", // Make text white for visibility
              textAlign: "center",
              backgroundColor:
                "rgba(0, 0, 0, 0.5)" /* Optional: Add a semi-transparent background */,
              borderRadius: 15 /* Optional: Rounded corners */,
              fontSize: "2rem", // Large text size
              fontWeight: "bold", // Optional: Make the text bold
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)", // Optional: Add text shadow for contrast
            }}
          >
            Our Servises
            <Space />
            
              We Provide a variety of services
            </Text>
        </div>
      </Container>
      <Container
        mt={32}
        mb={40}
        fluid
        style={{
          width: "100%", // full viewport width
          overflow: "hidden", // hide any overflow>
        }}
      >
        {/* Centered Title */}
        <Title ta={"center"} order={2} mt="sm" mb="sm">
          <Divider
            my="xl"
            label={
              <Text size="xl" color="red" fw={800} fz={26}>
                Our Services
              </Text>
            }
            labelPosition="center"
            color="red"
            size="md"
          />
        </Title>
        <Container fluid bg={'#F8F7F6'} 
        style={{
          borderRadius: "8px", // Apply the custom border radius here
          padding: "20px",
        }}>
          <Title ta={"center"} order={3} mt="xs" mb="sm">
            Ethiopian Origin Exports
          </Title>
          <Grid grow>
            <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Card.Section component="a" >
                  <Image src={coffee} height={'auto'} alt="Ethiopian Product" />
                </Card.Section>

                <Group justify="space-between" mt="md" mb="xs">
                  <Text fw={500}>Coffee</Text>
                </Group>

                <Text size="sm" c="dimmed">
                  Both raw and processed varieties, including washed and
                  unwashed Ethiopian coffee
                </Text>
              </Card>
            </Grid.Col><Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Card.Section component="a" >
                  <Image src={nigerseed} height={'auto'} alt="Niger Seed" />
                </Card.Section>

                <Group justify="space-between" mt="md" mb="xs">
                  <Text fw={500}>Niger Seed</Text>
                </Group>

                <Text size="sm" c="dimmed">
                  Both raw and processed varieties, including washed and
                  unwashed Ethiopian coffee
                </Text>
              </Card>
            </Grid.Col><Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Card.Section component="a" >
                  <Image src={kidneybeans} height={'auto'} alt="Kidney Beans" />
                </Card.Section>

                <Group justify="space-between" mt="md" mb="xs">
                  <Text fw={500}>Red Kidney Beans</Text>
                </Group>

                <Text size="sm" c="dimmed">
                  Both raw and processed varieties, including washed and
                  unwashed Ethiopian coffee
                </Text>
              </Card>
            </Grid.Col><Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Card.Section component="a" >
                  <Image src={greenmungbeans} height={'auto'} alt="Green Mung Beans" />
                </Card.Section>

                <Group justify="space-between" mt="md" mb="xs">
                  <Text fw={500}>Green Mung Beans</Text>
                </Group>

                <Text size="sm" c="dimmed">
                  Both raw and processed varieties, including washed and
                  unwashed Ethiopian coffee
                </Text>
              </Card>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Card.Section component="a" >
                  <Image src={miningproduct} height={'auto'} alt="Norway" />
                </Card.Section>

                <Group justify="space-between" mt="md" mb="xs">
                  <Text fw={500}>Mining Products</Text>
                </Group>

                <Text size="sm" c="dimmed">
                  Premium Humera and Wellega sesame seeds, Niger seed
                </Text>
              </Card>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Card.Section component="a" >
                  <Image src={oilseed} height={'auto'} alt="Norway" />
                </Card.Section>

                <Group justify="space-between" mt="md" mb="xs">
                  <Text fw={500}>Premium Humera Oil Seeds</Text>
                </Group>

                <Text size="sm" c="dimmed">
                Premium Humera Oil Seeds
                </Text>
              </Card>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Card.Section component="a" >
                  <Image src={special} height={'auto'} alt="Specialty Exports" />
                </Card.Section>

                <Group justify="space-between" mt="md" mb="xs">
                  <Text fw={500}>Specialty Exports</Text>
                </Group>

                <Text size="sm" c="dimmed">
                Specialty Exports Additional items upon request...
                </Text>
              </Card>
            </Grid.Col>
          </Grid>
        </Container>
        <Divider my="md" opacity={1} bd={'3px, soliid, #0077ff'}/>
        <Container fluid bg={'#45443F'}
        style={{
          borderRadius: "8px", 
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Apply a custom shadow      
          padding: "10px",
        }}>
          <Title ta={"center"} order={3} mt="sm" mb="sm">
            Global Imports to East Africa
          </Title>
          <Grid grow pb={30}>
            <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Card.Section component="a" >
                  <Image src={excavator} height={'auto'} alt="Ethiopian Product" />
                </Card.Section>

                <Group justify="space-between" mt="md" mb="xs">
                  <Text fw={500}>Excavator</Text>
                </Group>

                <Text size="sm" c="dimmed">
                  we are dedicated to providing top-tier import services for
                  high-performance excavators. Our selection includes a wide
                  range of models designed for various construction and
                  excavation tasks, ensuring you have the right machinery for
                  your projects.
                </Text>
              </Card>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Card.Section component="a" >
                  <Image src={dozer} height={'auto'} alt="Norway" />
                </Card.Section>

                <Group justify="space-between" mt="md" mb="xs">
                  <Text fw={500}>Loader</Text>
                </Group>

                <Text size="sm" c="dimmed">
                  We specialize ourselves on delivering premium import services
                  for high-quality loaders. Our range includes versatile models
                  tailored for various construction and material handling
                  applications, ensuring optimal performance and efficiency for
                  your projects.
                </Text>
              </Card>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Card.Section component="a" >
                  <Image src={crane} height={'auto'} alt="Norway" />
                </Card.Section>

                <Group justify="space-between" mt="md" mb="xs">
                  <Text fw={500}>Cranes</Text>
                </Group>

                <Text size="sm" c="dimmed">
                  We specialize ourselves on delivering premium import services
                  for high-quality cranes. Our range includes versatile models
                  tailored for various construction and material handling
                  applications, ensuring optimal performance and efficiency for
                  your projects.
                </Text>
              </Card>
            </Grid.Col>
          </Grid>
        </Container>
        <Container fluid>
          <Title ta={"center"} order={3} mt="sm" mb="sm">
            Comprehensive Trade Services
          </Title>
          <Grid grow>
            <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Card.Section component="a" >
                  <Image src={consulting} height={'auto'} alt="consulting" />
                </Card.Section>

                <Group justify="space-between" mt="md" mb="xs">
                  <Text fw={500}>Consulting Service</Text>
                </Group>

                <Text size="sm" c="dimmed">
                  we are dedicated to providing top-tier import services for
                  high-performance excavators. Our selection includes a wide
                  range of models designed for various construction and
                  excavation tasks, ensuring you have the right machinery for
                  your projects.
                </Text>
              </Card>
            </Grid.Col>
            <Divider my="md" />
            <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Card.Section component="a" >
                  <Image src={commission} height={'auto'} alt="commission" />
                </Card.Section>

                <Group justify="space-between" mt="md" mb="xs">
                  <Text fw={500}>Loader</Text>
                </Group>

                <Text size="sm" c="dimmed">
                  We specialize ourselves on delivering premium import services
                  for high-quality loaders. Our range includes versatile models
                  tailored for various construction and material handling
                  applications, ensuring optimal performance and efficiency for
                  your projects.
                </Text>
              </Card>
            </Grid.Col>
          </Grid>
        </Container>
      </Container>
    </>
  );
};

export default Service;
