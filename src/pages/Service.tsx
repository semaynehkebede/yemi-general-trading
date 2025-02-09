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
import pules from "../assets/image/pulses.jpg";
import automobil from "../assets/image/automobil.jpg"; 
import multiple from "../assets/image/allimage.jpg"; 
import miningproduct from "../assets/image/miningproduct.jpg"; 
import wolegasesame from "../assets/image/wolegasesame.jpg"; 
import excavator from "../assets/image/excavator.jpg"; 
import forklift from "../assets/image/forklift.jpg"; 
import crane from "../assets/image/crane1.jpg"; 
import coffee from "../assets/image/c1.webp"; 
import consulting from "../assets/image/consulting.jpg"; 
import commission from "../assets/image/commission.png"; 
import loader from "../assets/image/loader.png"; 
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { RootState } from "../app/store";
import { fetchImageThunk } from "../features/imageSlice";
import { fetchServiceThunk } from "../features/serviceSlice";
import CommonLink from "./CommonLink";

const Service = () => {
  const dispatch = useAppDispatch();
  const sliderImage = useAppSelector((state: RootState) => state.imageContent);
  const serviceData = useAppSelector(
    (state: RootState) => state.serviceContentData
  );

  const serviceSliderImage = sliderImage.image.filter(
    (image: any) => image.image_type === "service"
  );
  const importServiceOnService = serviceData.serviceCont.filter(
    (data: any) =>
      data.display_place === "service" &&
      data.service_type === "GlobalImportstoEastAfrica"
  );
  const exportServiceOnService = serviceData.serviceCont.filter(
    (data: any) =>
      data.display_place === "service" &&
      data.service_type === "EthiopianOriginExports"
  );
  const comprehensiveServiceOnService = serviceData.serviceCont.filter(
    (data: any) =>
      data.display_place === "service" &&
      data.service_type === "ComprehensiveTradeServices"
  );

  useEffect(() => {
    dispatch(fetchImageThunk());
    dispatch(fetchServiceThunk());
  }, []);
  console.log("a service", serviceData);
  const slideImage1 =
    serviceSliderImage.length > 0
      ? `data:image/png;base64,${serviceSliderImage[0].image}`
      : multiple;
  const slideImage2 =
    serviceSliderImage.length > 1
      ? `data:image/png;base64,${serviceSliderImage[1].image}`
      : loader;

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
            src={homeImageHovered ? slideImage1 : slideImage2}
            alt="Full-screen"
            style={{
              objectFit: "cover",
              width: "100%", 
              height: "100%",
              maxWidth: "100%",
              maxHeight: "100%",
              display: "block",
            paddingTop: "8px",
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
              color: "red", 
              textAlign: "center",
              backgroundColor:
                "rgba(0, 0, 0, 0.5)" ,
              borderRadius: 15 ,
              fontSize: "2rem", 
              fontWeight: "bold", 
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
            }}
          >
            {serviceSliderImage.length > 0 ? (
              serviceSliderImage[0]?.description
            ) : (
              <>
                Our Servises
                <Space />
                We Provide a variety of services
              </>
            )}
          </Text>
        </div>
      </Container>
      <Container
        mt={32}
        mb={40}
        fluid
        style={{
          width: "100%",
          overflow: "hidden", 
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
        <Container
          fluid
          bg={"#F8F7F6"}
          style={{
            borderRadius: "8px", 
            padding: "20px",
          }}
        >
          <Title ta={"center"} order={3} mt="xs" mb="sm">
            Ethiopian Origin Exports
          </Title>
          <Grid grow>
            {exportServiceOnService.length > 0 ? (
              exportServiceOnService.map((item) => (
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                  <Card shadow="sm" padding="lg" radius="md" withBorder h={'100%'}  mb={'12px'}>
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
                        mah={'calc(100vh - 40px)'}
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
                  <Card shadow="sm" padding="lg" radius="md" withBorder h={'100%'}  mb={'12px'}>
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
                  <Card
                    shadow="sm"
                    padding="lg"
                    radius="md"
                    withBorder
                    h={"100%"}
                    mb={"12px"}
                  >
                    <Card.Section component="a" h={"100%"}>
                      <Image
                        src={pules}
                        height={"auto"}
                        alt="Ethiopian Origin Mining Products"
                      />
                    </Card.Section>

                    <Group justify="space-between" mt="md" mb="xs">
                      <Text fw={500}>Pulses</Text>
                    </Group>

                    <Text size="sm" c="dimmed">
                    A diverse selection, including kidney beans, black beans, green mung beans, and more.
                    </Text>
                  </Card>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                  <Card shadow="sm" padding="lg" radius="md" withBorder h={'100%'}  mb={'12px'}>
                    <Card.Section component="a" h={'100%'} >
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
                  <Card shadow="sm" padding="lg" radius="md" withBorder h={'100%'}  mb={'12px'}>
                    <Card.Section component="a" h={'100%'}>
                     <Image src={wolegasesame} height={"auto"} alt="Norway" />
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
        </Container>
        <Divider my="md" opacity={1} bd={"3px, soliid, #0077ff"} />
        <Container
          fluid
          bg={"#45443F"}
          style={{
            borderRadius: "8px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", 
            padding: "10px",
          }}
        >
          <Title ta={"center"} order={3} mt="sm" mb="sm">
            Global Imports to East Africa
          </Title>
          <Grid grow>
            {importServiceOnService.length > 0 ? (
              importServiceOnService.map((item) => (
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                  <Card shadow="sm" padding="lg" radius="md" withBorder h={'100%'}  mb={'12px'}>
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
                        mah={'calc(100vh - 40px)'}
                        
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
                  <Card shadow="sm" padding="lg" radius="md" withBorder h={'100%'}  mb={'12px'}>
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
                  <Card shadow="sm" padding="lg" radius="md" withBorder h={'100%'}  mb={'12px'}>
                    <Card.Section component="a" h={'100%'}>
                      <Image
                        src={forklift}
                        height={"auto"}
                        alt="Dozer Imported Products"
                      />
                    </Card.Section>

                    <Group justify="space-between" mt="md" mb="xs">
                      <Text fw={500}>Forklift</Text>
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
                  <Card shadow="sm" padding="lg" radius="md" withBorder h={'100%'}  mb={'12px'}>
                    <Card.Section component="a" h={'100%'}>
                      <Image
                        src={automobil}
                        height={"auto"}
                        alt="Crane Imported Products"
                      />
                    </Card.Section>

                    <Group justify="space-between" mt="md" mb="xs">
                      <Text fw={500}>Automobiles and Parts</Text>
                    </Group>

                    <Text size="sm" c="dimmed">
                    We deliver a wide selection of electric and hybrid 
                    vehicles, along with a comprehensive range of essential spare parts, ensuring reliability, efficiency, and sustainability 
                    for various transportation needs. 
                    </Text>
                  </Card>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                  <Card shadow="sm" padding="lg" radius="md" withBorder h={'100%'}  mb={'12px'}>
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
        </Container>
        <Container fluid>
          <Title ta={"center"} order={3} mt="sm" mb="sm">
            Comprehensive Trade Services
          </Title>
          <Grid grow>
            {comprehensiveServiceOnService.length > 0 ? (
              comprehensiveServiceOnService.map((item) => (
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                  <Card shadow="sm" padding="lg" radius="md" withBorder h={'100%'}  mb={'12px'}>
                    <Card.Section component="a" h={'100%'}>
                      <Image
                        src={item?.image ? item.image : consulting}
                        alt={
                          item?.file_name
                            ? item.file_name
                            : "Comprehensive Service..."
                        }
                        height={200}
                        width="100%"
                        fit="cover" 
                        style={{ objectFit: "cover" }} 
                      />
                    </Card.Section>

                    <Group justify="space-between" mt="md" mb="xs">
                      <Text fw={500}>
                        {item?.file_name
                          ? item?.file_name
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
                  <Card shadow="sm" padding="lg" radius="md" withBorder h={'100%'}  mb={'12px'}>
                    <Card.Section component="a" h={'100%'}>
                      <Image
                        src={consulting}
                        width="100%" 
                        fit="cover"
                        style={{ objectFit: "cover" }}
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
                  <Card shadow="sm" padding="lg" radius="md" withBorder mah={'100%'}  mb={'12px'}>
                    <Image
                      src={commission}
                      alt="commission"
                      fit="cover" 
                      style={{ objectFit: "cover" }} // Ensures no distortion
                    />

                    <Group justify="space-between" mt="md" mb="xs">
                      <Text fw={500}>Commission</Text>
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
        </Container>
      </Container>
      <CommonLink />
    </>
  );
};

export default Service;
