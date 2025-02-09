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
import { useEffect, useState } from "react";
import hummeraoil from "../assets/image/hummeraoil.jpg"; 

import sinotrack from "../assets/image/sinotrack.png";
import coffee from "../assets/image/c1.webp"; 
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { RootState } from "../app/store";
import { fetchContentThunk } from "../features/contentSlice";
import CommonLink from "./CommonLink";

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
          onMouseEnter={() => setHomeImageHovered(true)} 
          onMouseLeave={() => setHomeImageHovered(false)} 
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            overflow: "hidden", 
            transition: "all 0.3s ease", 
          }}
        >
          <Image
            src={homeImageHovered ? sinotrack : hummeraoil} 
            alt="Full-screen"
            style={{
              objectFit: "cover", 
              width: "100%", 
              height: "100%", 
              maxWidth: "100%", 
              maxHeight: "100%", 
              display: "block",
              filter: homeImageHovered ? "contrast(150%)" : "none",
              transition: "filter 0.3s ease",
            }}
          />
          <Text
            style={{
              position: "absolute",
              top: "50%", 
              left: "50%", 
              transform: "translate(-50%, -50%)", 
              color: "white",
              textAlign: "center",
              backgroundColor:
                "rgba(0, 0, 0, 0.5)" ,
              borderRadius: 15 ,
              fontSize: "2rem", 
              fontWeight: "bold", 
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
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
                  
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "100%", 
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
      <CommonLink />
    </>
  );
};

export default About;
