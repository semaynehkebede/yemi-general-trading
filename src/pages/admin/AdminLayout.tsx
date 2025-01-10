import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Container,
  Divider,
  Flex,
  Grid,
  Group,
  Image,
  Loader,
  Space,
  Text,
  Title,
} from "@mantine/core";
import pules from "../../assets/image/pulses.jpg"; // Import the image
import multiple from "../../assets/image/allimage.jpg"; // Import the image
import sinotruck from "../../assets/image/sino3.jpg"; // Import the image
import miningproduct from "../../assets/image/miningproduct.jpg"; // Import the image
import oilseed from "../../assets/image/humerasesame.png"; // Import the image
import excavator from "../../assets/image/excavator.png"; // Import the image
import dozer from "../../assets/image/dozer.png"; // Import the image
import crane from "../../assets/image/crane1.jpg"; // Import the image
import coffee from "../../assets/image/c1.webp"; // Import the image
import consulting from "../../assets/image/consulting.jpg"; // Import the image
import commission from "../../assets/image/commission.png"; // Import the image
import maitower from "../../assets/image/maitower.jpg"; // Import the image
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { RootState } from "../../app/store";
import { fetchImageThunk } from "../../features/imageSlice";
import { fetchAboutThunk } from "../../features/aboutSlice";
import { fetchServiceThunk } from "../../features/serviceSlice";
const aboutyemi = `
YEMI GENERAL TRADING L.L.C. Founded on June 25, 2022, in Dubai, UAE,
Y E M I GENERAL TRADING L.L.C. is a dedicated provider of world-class import and export solutions. 
Our extensive services include trading, commissioning, civil works, and brokerage, 
aimed at empowering businesses by connecting them with global opportunities. 
We specialize in delivering high-quality products and tailored trade solutions 
to meet diverse client needs worldwide.
`;
const AdminLayout = () => {
  const dispatch = useAppDispatch();
  const sliderImage = useAppSelector((state: RootState) => state.imageContent);
  const aboutData = useAppSelector((state: RootState) => state.aboutContent);
  const serviceData = useAppSelector(
    (state: RootState) => state.serviceContentData
  );
  const contactData = useAppSelector((state: RootState) => state.contactData);

  const homeSliderImage = sliderImage.image.filter(
    (image: any) => image.image_type === "home"
  );
  const aboutOnHome = aboutData.aboutContent.filter(
    (data: any) => data.display_place === "home"
  );
  const importServiceOnHome = serviceData.serviceCont.filter(
    (data: any) =>
      data.display_place === "home" &&
      data.service_type === "GlobalImportstoEastAfrica"
  );
  const exportServiceOnHome = serviceData.serviceCont.filter(
    (data: any) =>
      data.display_place === "home" &&
      data.service_type === "EthiopianOriginExports"
  );
  const comprehensiveServiceOnHome = serviceData.serviceCont.filter(
    (data: any) =>
      data.display_place === "home" &&
      data.service_type === "ComprehensiveTradeServices"
  );

  useEffect(() => {
    dispatch(fetchImageThunk());
    dispatch(fetchAboutThunk());
    dispatch(fetchServiceThunk());
  }, []);
  console.log("a content", serviceData.serviceCont);

  const slideImage1 =
    homeSliderImage.length > 0
      ? `data:image/png;base64,${homeSliderImage[0].image}`
      : pules;
  const slideImage2 =
    homeSliderImage.length > 1
      ? `data:image/png;base64,${homeSliderImage[1].image}`
      : sinotruck;
  const [homeImageHovered, setHomeImageHovered] = useState(false);
  return (
    <>
      <Container fluid p={0} h={"calc(100vh - 120px)"}>
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
            src={homeImageHovered ? slideImage1 : slideImage2} // Replace with your image URL
            alt="Full-screen"
            style={{
              objectFit: "cover", // Still cover but with max width/height
              width: "100%", // Ensure it spans the full width
              height: "100%", // Ensure it spans the full height
              display: "block",
              filter: homeImageHovered ? "contrast(150%)" : "none",
              transition: "filter 0.3s ease",
            }}
          />
          {/* Text over the image */}
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
            {homeSliderImage.length > 0 ? (
              homeSliderImage[0]?.description
            ) : (
              <>
                Welcome to Y E M I GENERAL TRADING L.L.C.
                <Space />
                Your Gateway to Global Trade Excellence
              </>
            )}
          </Text>
        </div>
      </Container>
      <Container
        mt={12}
        fluid
        // h={"120px"}
        bg={"#e7f5ff"}
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
                Who We Are?
              </Text>
            }
            labelPosition="center"
            color="red"
            size="md"
          />
        </Title>
        <Grid grow>
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder h={'100%'} mb={'12px'}>
              <Card.Section component="a" h={'100%'}>
                <Image
                  src={
                    aboutOnHome.length > 0 && aboutOnHome[0]?.image
                      ? `data:image/png;base64,${aboutOnHome[0].image}`
                      : multiple
                  }
                  alt={
                    aboutOnHome.length > 0 && aboutOnHome[0]?.file_name
                      ? aboutOnHome[0].file_name
                      : "About We..."
                  }
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
                <Text fw={500} size="20px" c={'#8B0000'}>About Our Company</Text>
              </Group>

              <Text size="16px" style={{lineHeight: 2}} mt={3}>
                {aboutOnHome.length > 0
                  ? aboutOnHome[0].description ?? aboutOnHome[0].description
                  : aboutyemi}
              </Text>
            </Card>
          </Grid.Col>
        </Grid>
        <Flex justify="center" mt="lg" mb="lg">
          <Link to={"/about"}>
            <Button size="md" radius="md" variant="outline" color="blue">
              See More
            </Button>
          </Link>
        </Flex>
      </Container>
      <Container
        mt={32}
        fluid
        // h={"120px"}
        bg={"#ced4da"}
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
        <Container fluid>
          <Title ta={"center"} order={3} mt="sm" mb="sm">
            Ethiopian Origin Exports
          </Title>
          <Grid grow>
            {exportServiceOnHome.length > 0 ? (
              exportServiceOnHome.map((item) => (
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                  <Card shadow="sm" padding="lg" radius="md" withBorder h={'100%'} mb={'12px'}>
                    <Card.Section component="a" h={'100%'}>
                      <Image
                        src={
                          item?.image
                            ? `data:image/png;base64,${item.image}`
                            : excavator
                        }
                        alt={
                          item?.service_name
                            ? item.service_name
                            : "Ethiopian Origin Product..."
                        }
                        height={"auto"}
                      />
                    </Card.Section>

                    <Group justify="space-between" mt="md" mb="xs">
                      <Text fw={500}>{item.service_name}</Text>
                    </Group>

                    <Text size="sm" c="dimmed">
                      {item.description}
                    </Text>
                  </Card>
                </Grid.Col>
              ))
            ) : (
              <>
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                  <Card shadow="sm" padding="lg" radius="md" withBorder h={'100%'} mb={'12px'}>
                    <Card.Section component="a" h={'100%'}>
                      <Image
                        src={coffee}
                        height={"auto"}
                        alt="Ethiopian Products Coffee"
                      />
                    </Card.Section>

                    <Group justify="space-between" mt="md" mb="xs">
                      <Text fw={500}>Coffee</Text>
                    </Group>

                    <Text size="sm" c="dimmed">
                      Both raw and processed varieties, including washed and
                      unwashed Ethiopian coffee
                    </Text>
                  </Card>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                  <Card shadow="sm" padding="lg" radius="md" withBorder h={'100%'} mb={'12px'}>
                    <Card.Section component="a" h={'100%'}>
                      <Image
                        src={miningproduct}
                        height={"auto"}
                        alt="Ethiopian Origin Mining Products"
                      />
                    </Card.Section>

                    <Group justify="space-between" mt="md" mb="xs">
                      <Text fw={500}>Mining Products</Text>
                    </Group>

                    <Text size="sm" c="dimmed">
                      Ethiopia is renowned for its wealth of natural resources,
                      particularly gold, copper, and opals, which play a vital
                      role in its mining sector.
                    </Text>
                  </Card>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                  <Card shadow="sm" padding="lg" radius="md" withBorder h={'100%'} mb={'12px'}>
                    <Card.Section component="a" h={'100%'} p={'6px'}>
                      <Image src={oilseed} alt="Oil Seeds" />
                    </Card.Section>

                    <Group justify="space-between" mt="md" mb="xs">
                      <Text fw={500}>Oil Seeds</Text>
                    </Group>

                    <Text size="sm" c="dimmed">
                      Premium Humera and Wellega sesame seeds, Niger seed
                    </Text>
                  </Card>
                </Grid.Col>
              </>
            )}
          </Grid>
          <Flex justify="center" mt="lg" mb="lg">
            <Link to={"/service"}>
              <Button size="md" radius="md" variant="outline" color="blue">
                See More
              </Button>
            </Link>
          </Flex>
        </Container>
        <Divider my="md" />
        <Container fluid>
          <Title ta={"center"} order={3} mt="sm" mb="sm">
            Global Imports to East Africa
          </Title>
          <Grid grow>
            {importServiceOnHome.length > 0 ? (
              importServiceOnHome.map((item) => (
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                  <Card shadow="sm" padding="lg" radius="md" withBorder h={'100%'} mb={'12px'}>
                    <Card.Section component="a" h={'100%'}>
                      <Image
                        src={
                          item?.image
                            ? `data:image/png;base64,${item.image}`
                            : excavator
                        }
                        alt={
                          item?.service_name
                            ? item.service_name
                            : "Imported Products..."
                        }
                        height={"auto"}
                      />
                    </Card.Section>

                    <Group justify="space-between" mt="md" mb="xs">
                      <Text fw={500}>{item.service_name}</Text>
                    </Group>

                    <Text size="sm" c="dimmed">
                      {item.description}
                    </Text>
                  </Card>
                </Grid.Col>
              ))
            ) : (
              <>
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                  <Card shadow="sm" padding="lg" radius="md" withBorder h={'100%'}>
                    <Card.Section component="a" h={'100%'}>
                      <Image
                        src={excavator}
                        height={"auto"}
                        alt="Imported Products"
                      />
                    </Card.Section>

                    <Group justify="space-between" mt="md" mb="xs">
                      <Text fw={500}>Excavator</Text>
                    </Group>

                    <Text size="sm" c="dimmed">
                      we are dedicated to providing top-tier import services for
                      high-performance excavators. Our selection includes a wide
                      range of models designed for various construction and
                      excavation tasks, ensuring you have the right machinery
                      for your projects.
                    </Text>
                  </Card>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                  <Card shadow="sm" padding="lg" radius="md" withBorder h={'100%'}>
                    <Card.Section component="a" h={'100%'}>
                      <Image
                        src={dozer}
                        height={"auto"}
                        alt="Dozer Imported Products"
                      />
                    </Card.Section>

                    <Group justify="space-between" mt="md" mb="xs">
                      <Text fw={500}>Loader</Text>
                    </Group>

                    <Text size="sm" c="dimmed">
                      We specialize ourselves on delivering premium import
                      services for high-quality loaders. Our range includes
                      versatile models tailored for various construction and
                      material handling applications, ensuring optimal
                      performance and efficiency for your projects.
                    </Text>
                  </Card>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                  <Card shadow="sm" padding="lg" radius="md" withBorder h={'100%'} mb={'12px'}>
                    <Card.Section component="a" h={'100%'}>
                      <Image
                        src={crane}
                        height={"auto"}
                        alt="Crane Imported Products"
                      />
                    </Card.Section>

                    <Group justify="space-between" mt="md" mb="xs">
                      <Text fw={500}>Cranes</Text>
                    </Group>

                    <Text size="sm" c="dimmed">
                      We specialize ourselves on delivering premium import
                      services for high-quality cranes. Our range includes
                      versatile models tailored for various construction and
                      material handling applications, ensuring optimal
                      performance and efficiency for your projects.
                    </Text>
                  </Card>
                </Grid.Col>
              </>
            )}
          </Grid>
          <Flex justify="center" mt="lg" mb="lg">
            <Link to={"/service"}>
              <Button size="md" radius="md" variant="outline" color="blue">
                See More
              </Button>
            </Link>
          </Flex>
        </Container>

        <Container>
          <Title ta={"center"} order={3} mt="sm" mb="sm">
            Comprehensive Trade Services
          </Title>
          <Grid grow>
            {comprehensiveServiceOnHome.length > 0 ? (
              comprehensiveServiceOnHome.map((item) => (
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                  <Card shadow="sm" padding="lg" radius="md" withBorder mb={'12px'}>
                    <Card.Section component="a">
                      <Image
                        src={
                          item?.image
                            ? `data:image/png;base64,${item.image}`
                            : consulting
                        }
                        alt={
                          item?.file_name
                            ? item.file_name
                            : "Comprehensive Service..."
                        }
                        fit="cover" // Ensures the image covers the area without stretching
                        style={{ objectFit: "cover" }} // Ensures no distortion
                      />
                    </Card.Section>

                    <Group justify="space-between" mt="md" mb="xs">
                      <Text fw={500}>
                        {item?.service_name
                          ? item?.service_name
                          : `One of Comprehensive Service`}
                      </Text>
                    </Group>

                    <Text size="sm" c="dimmed">
                      {item?.description
                        ? item?.description
                        : `We provide alot of services as you want related to Comprehensive Service`}
                      {item.description}
                    </Text>
                  </Card>
                </Grid.Col>
              ))
            ) : (
              <>
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                  <Card shadow="sm" padding="lg" radius="md" withBorder mb={'12px'}>
                    <Card.Section component="a">
                      <Image
                        src={consulting}
                        fit="cover" // Ensures the image covers the area without stretching
                        style={{ objectFit: "cover" }} // Ensures no distortion
                        alt="consulting"
                      />
                    </Card.Section>

                    <Group justify="space-between" mt="md" mb="xs">
                      <Text fw={500}>Consulting Service</Text>
                    </Group>

                    <Text size="sm" c="dimmed">
                      We are dedicated to providing top-tier Comprehensive
                      Service. We ensuring you have the right choise for your
                      needs.
                    </Text>
                  </Card>
                </Grid.Col>
                <Divider my="md" />
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                  <Card shadow="sm" padding="lg" radius="md" withBorder mb={'12px'}>
                    <Image
                      src={commission}
                      alt="commission"
                      fit="cover" // Ensures the image covers the area without stretching
                      style={{ objectFit: "cover" }} // Ensures no distortion
                    />

                    <Group justify="space-between" mt="md" mb="xs">
                      <Text fw={500}>Commission Service</Text>
                    </Group>

                    <Text size="sm" c="dimmed">
                      We are dedicated to providing top-tier Commission Service.
                      We ensuring you have the right choise for your needs.
                    </Text>
                  </Card>
                </Grid.Col>
              </>
            )}
          </Grid>
          <Flex justify="center" mt="lg" mb="lg">
            <Link to={"/service"}>
              <Button size="md" radius="md" variant="outline" color="blue">
                See More
              </Button>
            </Link>
          </Flex>
        </Container>
      </Container>
      <Container fluid bg={"dark"} mt={50} mb={30}>
        <Title ta={"center"} order={2} mt="sm" mb="sm" c={"white"}>
          Our Location
        </Title>
        <Grid grow mb={30}>
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder h={'100%'} mb={'12px'}>
              <Card.Section component="a" h={'100%'}>
                <Image
                  src={
                    contactData.contact.length > 0 &&
                    contactData.contact[0]?.image
                      ? `data:image/png;base64,${contactData.contact[0].image}`
                      : maitower
                  }
                  height={"auto"}
                  alt={
                    contactData.contact.length > 0 &&
                    contactData.contact[0]?.file_name
                      ? contactData.contact[0].file_name
                      : "Head Office..."
                  }
                />
              </Card.Section>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
            <Card
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              h={'100%'}
              mb={'12px'}
            >
              <Text fz={17} fw={400}>
                YEMI General Trading L.L.C
              </Text>
              Office Address:
              <Space />
              {contactData.contact.length > 0 &&
              contactData.contact[0]?.officeFullAddress ? (
                contactData.contact[0]?.officeFullAddress
              ) : (
                <>
                  Mai Tower, Office
                  <Space />
                  602 Dubai, UAE
                </>
              )}
              <Space />
              Phone:{" "}
              {contactData.contact.length > 0 &&
              contactData.contact[0]?.phoneNumber ? (
                contactData.contact[0]?.phoneNumber
              ) : (
                <>+971543017029</>
              )}
              <Space />
              Email:{" "}
              {contactData.contact.length > 0 &&
              contactData.contact[0]?.emailAddress ? (
                contactData.contact[0]?.emailAddress
              ) : (
                <>Info@yemitradingllc.com</>
              )}
              <Space />
              {contactData.contact.length > 0 &&
              contactData.contact[0]?.description ? (
                contactData.contact[0]?.description
              ) : (
                <>
                  We are conveniently located in the heart of Dubai, providing
                  easy access for both local and international clients. Feel
                  free to visit us or contact us for more information.
                </>
              )}
            </Card>
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
};
export default AdminLayout