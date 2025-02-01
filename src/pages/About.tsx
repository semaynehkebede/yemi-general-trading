import {
  Card,
  Container,
  Divider,
  Grid,
  Group,
  Image,
  Title,
  Text,
  Space,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import kidneybeans from "../assets/image/kidneybeans.jpg"; // Import the image
import sinotrack from "../assets/image/sinotrack.png"; // Import the image
import coffee from "../assets/image/c1.webp"; // Import the image
import avatoor2 from "../assets/image/avator2.jpg"; // Import the image
import avatoor1 from "../assets/image/avatoor1.jpg"; // Import the image
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { RootState } from "../app/store";
import { fetchContentThunk } from "../features/contentSlice";

const About = () => {
  const dispatch = useAppDispatch();

  const aboutData = useAppSelector((state: RootState) => state.aboutContent);
  const aboutOnHome = aboutData.aboutContent.filter(
    (data: any) => data.display_place === "about"
  );
  const contents = useAppSelector((state: RootState) => state.content.content);
  const aboutContents = contents.filter(
    (content: any) =>
      content.content_type === "ABOUT" && content.display_place === "ABOUT"
  );
  useEffect(() => {
    dispatch(fetchContentThunk());
    console.log("a content", contents);
  }, []);
  console.log("a out effect cntent", contents);
  console.log("aboutContents cntent", aboutContents);

  console.log("YUYUYU", aboutContents, status);
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
            <Card shadow="sm" padding="xl" component="a" target="_blank">
              <Card.Section>
                <Image
                  src={
                    aboutOnHome.length > 0 && aboutOnHome[0]?.image
                      ? aboutOnHome[0].image
                      : coffee
                  }
                  alt={
                    aboutOnHome.length > 0 && aboutOnHome[0]?.file_name
                      ? aboutOnHome[0].file_name
                      : "About We..."
                  }
                  // src={coffee} // Replace with your image URL
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
          <Card shadow="sm" padding="lg" radius="md" withBorder h={'100%'} mb={'12px'}>
              <Group justify="center" mb="xs">
                <Text fw={500} size="20px" c={'#8B0000'}>About Us</Text>
              </Group>
              <Text size="16px" style={{lineHeight: 2}} mt={3}>
                {aboutOnHome.length > 0
                  ? aboutOnHome[0].description ?? aboutOnHome[0].description
                  : "YEMI GENERAL TRADING L.L.C. Founded on June 25, 2022, in Dubai, UAE, Y E M I GENERAL TRADING L.L.C. is a dedicated provider of world-class import and export solutions. Our extensive services include trading, commissioning, civil works, and brokerage, aimed at empowering businesses by connecting them with global opportunities. We specialize in delivering high-quality products and tailored trade solutions to meet diverse client needs worldwide."}
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
                Our Clients idea
              </Text>
            }
            labelPosition="center"
            color="red"
            size="md"
          />
        </Title>
        <Grid grow pb={30}>
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
            <Card shadow="sm" padding="xl" component="a" target="_blank">
              {/* <Card.Section>
                <Image
                  src={avatoor1}
                  h={160}
                  alt="No way!"
                  style={{ objectFit: "contain" }}
                />
              </Card.Section> */}

              <Text fw={500} size="lg" mt="md">
                Ms. Senait Mogess
              </Text>

              <Text mt="xs" c="dimmed" size="sm">
                Product ManagerWorking with Abiy Masresha has been a game-changer for our projects. 
                Their machinery is always well-maintained,
                 and the staff is knowledgeable and responsive.
                  We've built a strong, trustworthy relationship over the years.
              </Text>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
            <Card shadow="sm" padding="xl" component="a" target="_blank">
              <Card.Section>
                <Image
                  src={avatoor2}
                  h={160}
                  alt="No way!"
                  style={{ objectFit: "contain" }}
                />
              </Card.Section>

              <Text fw={500} size="lg" mt="md">
                Dr. Biniam...
              </Text>

              <Text mt="xs" c="dimmed" size="sm">
                CEO of our company
              </Text>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
            <Card shadow="sm" padding="xl" component="a" target="_blank">
              <Card.Section>
                <Image
                  src={avatoor2}
                  h={160}
                  alt="No way!"
                  style={{ objectFit: "contain" }}
                />
              </Card.Section>

              <Text fw={500} size="lg" mt="md">
                Dr. Alazar Danel...
              </Text>

              <Text mt="xs" c="dimmed" size="sm">
              Senior Manager
              </Text>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
            <Card shadow="sm" padding="xl" component="a" target="_blank">
              <Card.Section>
                <Image
                  src={avatoor1}
                  h={160}
                  alt="No way!"
                  style={{ objectFit: "contain" }}
                />
              </Card.Section>

              <Text fw={500} size="lg" mt="md">
                Mr Abebe...
              </Text>

              <Text mt="xs" c="dimmed" size="sm">
                Consultant
              </Text>
            </Card>
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
};

export default About;
