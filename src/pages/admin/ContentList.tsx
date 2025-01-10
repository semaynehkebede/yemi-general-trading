import {
  Card,
  Container,
  Grid,
  Group,
  Text,
  Title,
  Image,
  Button,
  Modal,
  Menu,
  ActionIcon,
  Space,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import Content from "./Content";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { deleteContentAction } from "../../features/contentSlice";
import { RiArrowDropDownFill } from "react-icons/ri";
import ContentUpdate from "./ContentUpdate";
import { RootState } from "../../app/store";
import ServiceRegistration from "./ServiceRegistration";
import AboutContent from "./AboutContent";
import SliderImage from "./SliderImage";
import Contact from "./Contact";
// import Contact from "../Contact";
import { deleteImageAction, fetchImageThunk } from "../../features/imageSlice";
import { fetchAboutThunk } from "../../features/aboutSlice";
import { fetchServiceThunk } from "../../features/serviceSlice";
import { Notification } from "@mantine/core";

const ContentList = () => {
  const dispatch = useAppDispatch();
  const sliderImage = useAppSelector((state: RootState) => state.imageContent);
  const aboutData = useAppSelector((state: RootState) => state.aboutContent);
  const serviceData = useAppSelector(
    (state: RootState) => state.serviceContentData
  );
  const contactData = useAppSelector((state: RootState) => state.contactData);
  const [modalOpened, setModalOpened] = useState(false);
  const [sliderModalOpened, setSliderModalOpened] = useState(false);
  const [contactModalOpened, setContactModalOpened] = useState(false);
  const [serviceModalOpened, setServiceModalOpened] = useState(false);
  const [aboutModalOpened, setAboutModalOpened] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectdContent, setSelectdContent] = useState<any>();
  const [selectdData, setSelectdData] = useState<any>();

  useEffect(() => {
    dispatch(fetchImageThunk());
    dispatch(fetchAboutThunk());
    dispatch(fetchServiceThunk());
  }, []);

  const onSubmitDelete = (content: any) => {
    console.log("deleted id", content.id);

    dispatch(deleteContentAction(content.id));
    if (status === "succeeded") {
      setOpenDeleteModal(false);
    }
  };

  const onSubmitDeleteData = async (data: any) => {
    try {
      console.log("Deletion id: before dispach", data.id);
      const response = await dispatch(deleteImageAction(data.id)).unwrap();
      console.log("Deletion id: after dispach", data.id);
      const successMessage =
        response?.data?.message || "Image deleted successfully!";
      console.log("Deletion response:", response);
      // Show success notification
      <Notification color="green" title="Success">
        {successMessage}
      </Notification>;
      // Close the modal
      setOpenDeleteModal(false);
      setSelectdData({});
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error || "Failed to delete the image.";
      // Handle any errors and show an error notification
      // Show error notification
      <Notification color="red" title="Error">
        {errorMessage}
      </Notification>;
    }
  };
  return (
    <>
      <Group
        justify="center"
        style={{ marginBottom: "20px", padding: "0 20px" }}
        mt={10}
      >
        <Title order={3}>Manage Content</Title>
      </Group>

      <Modal
        opened={sliderModalOpened}
        onClose={() => {
          setSliderModalOpened(false);
          // setSelectedData({});
        }}
        title="Update Content"
        size={"md"} // Predefined size (sm, md, lg, xl)
        styles={{
          title: {
            textAlign: "center", // Center the title text
            width: "100%",
          },
        }}
        centered
      >
        <SliderImage onClose={() => setSliderModalOpened(true)} />
      </Modal>
      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)} // Close modal when triggered
        title="Add New Content"
        size="md" // Predefined size (sm, md, lg, xl)
        styles={{
          title: {
            textAlign: "center", // Center the title text
            width: "100%",
            // marginLeft: "8rem",
          },
        }}
        centered
      >
        <Content onClose={() => setModalOpened(true)} />
      </Modal>
      <Modal
        opened={contactModalOpened}
        onClose={() => setContactModalOpened(false)} // Close modal when triggered
        title="Contact Information"
        size="md" // Predefined size (sm, md, lg, xl)
        styles={{
          title: {
            textAlign: "center", // Center the title text
            width: "100%",
          },
        }}
        centered
      >
        <Contact onClose={() => setContactModalOpened(true)} />
      </Modal>
      <Modal
        opened={aboutModalOpened}
        onClose={() => setAboutModalOpened(false)} // Close modal when triggered
        title="Add Content for About"
        size="md" // Predefined size (sm, md, lg, xl)
        styles={{
          title: {
            textAlign: "center", // Center the title text
            width: "100%",
          },
        }}
        centered
      >
        <AboutContent onClose={() => setAboutModalOpened(true)} />
      </Modal>

      <Modal
        opened={serviceModalOpened}
        onClose={() => setServiceModalOpened(false)} // Close modal when triggered
        title="Add Service Content"
        size="md" // Predefined size (sm, md, lg, xl)
        styles={{
          title: {
            textAlign: "center", // Center the title text
            width: "100%",
            // marginLeft: "8rem",
          },
        }}
        centered
      >
        <ServiceRegistration onClose={() => setServiceModalOpened(true)} />
      </Modal>

      <Modal
        opened={openUpdateModal}
        onClose={() => {
          setOpenUpdateModal(false);
          // setSelectedData({});
        }}
        title="Update Content"
        size={"md"} // Predefined size (sm, md, lg, xl)
        styles={{
          title: {
            textAlign: "center", // Center the title text
            width: "100%",
          },
        }}
      >
        <ContentUpdate
          selectedItem={selectdContent}
          onClose={(isOpened: boolean) => setOpenUpdateModal(isOpened)}
        />
      </Modal>
      <Modal
        opened={openDeleteModal}
        onClose={() => {
          setOpenDeleteModal(false);
          setSelectdData({});
        }}
        centered
        title="Delete Confirmation"
        size="sm"
      >
        <Modal.Body>
          <p>Are you sure to delete the item? </p>
        </Modal.Body>
        <div>
          <Button
            className="mr-4"
            variant="light"
            onClick={() => setOpenDeleteModal(false)}
          >
            Cancel
          </Button>
          <Button
            variant="filled"
            color="red"
            onClick={() => onSubmitDeleteData(selectdData)}
          >
            Delete
          </Button>
        </div>
      </Modal>

      <Container
        fluid
        bg={"#F8F7F6"}
        style={{
          borderRadius: "8px", // Apply the custom border radius here
          padding: "20px",
        }}
      >
        <Group
          justify="space-between"
          style={{ marginBottom: "10px", padding: "0 10px" }}
          mt={10}
        >
          <Title ta={"center"} order={3} mt="xs" mb="sm">
            Slider Image
          </Title>
          <Button variant="outline" onClick={() => setSliderModalOpened(true)}>
            Add New
          </Button>
        </Group>
        <Grid grow>
          {sliderImage.image.length > 0 ? (
            sliderImage.image.map((item) => (
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
                      src={`${item.file_url}`} // Use the file_url property from the API response
                      // src={`data:image/png;base64,${item.image}`}
                      mah={"calc(100vh - 60px)"}
                      alt={item.image_type}
                    />
                  </Card.Section>
                  <Group justify="space-between" mt="md" mb="xs">
                    <Text fw={500}>Image Type:- {item.image_type}</Text>
                    <Menu shadow="md" width={200}>
                      <Menu.Target>
                        <ActionIcon variant="outline">
                          <RiArrowDropDownFill size={24} />
                        </ActionIcon>
                      </Menu.Target>

                      <Menu.Dropdown>
                        <Menu.Item
                          // icon={<FiEdit2 size={16} />}
                          // onClick={handleEdit}
                          onClick={() => {
                            setOpenUpdateModal(true);
                            setSelectdData(item);
                          }}
                        >
                          Edit
                        </Menu.Item>
                        <Menu.Item
                          // icon={<FiTrash2 size={16} />}
                          // onClick={handleDelete}
                          color="red"
                          onClick={() => {
                            setOpenDeleteModal(true);
                            setSelectdData(item);
                          }}
                        >
                          Delete
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </Group>
                  <Text size="sm" c="dimmed">
                    {item.description}
                  </Text>
                </Card>
              </Grid.Col>
            ))
          ) : (
            <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Card.Section component="a"></Card.Section>

                <Group justify="space-between" mt="md" mb="xs">
                  <Text fw={400} ta={"center"} c={"red"}>
                    There is no Contents related to This
                  </Text>
                </Group>
              </Card>
            </Grid.Col>
          )}
        </Grid>
      </Container>

      <Container
        fluid
        bg={"#F8F7F6"}
        style={{
          borderRadius: "8px", // Apply the custom border radius here
          padding: "20px",
        }}
      >
        <Group
          justify="space-between"
          style={{ marginBottom: "10px", padding: "0 10px" }}
          mt={10}
        >
          <Title ta={"center"} order={3} mt="xs" mb="sm">
            Service Content
          </Title>
          <Button variant="outline" onClick={() => setServiceModalOpened(true)}>
            Add New
          </Button>
        </Group>
        <Grid grow>
          {serviceData.serviceCont.length > 0 ? (
            serviceData.serviceCont.map((item) => (
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
                      src={`data:image/png;base64,${item.image}`}
                      mah={"calc(100vh - 60px)"}
                      alt={item.display_place}
                    />
                  </Card.Section>
                  <Group justify="space-between" mt="md" mb="xs">
                    <Text fw={500}>Display place:- {item.display_place}</Text>
                    <Menu shadow="md" width={200}>
                      <Menu.Target>
                        <ActionIcon variant="outline">
                          <RiArrowDropDownFill size={24} />
                        </ActionIcon>
                      </Menu.Target>

                      <Menu.Dropdown>
                        <Menu.Item
                          // icon={<FiEdit2 size={16} />}
                          // onClick={handleEdit}
                          onClick={() => {
                            setOpenUpdateModal(true);
                            setSelectdContent(item);
                          }}
                        >
                          Edit
                        </Menu.Item>
                        <Menu.Item
                          // icon={<FiTrash2 size={16} />}
                          // onClick={handleDelete}
                          color="red"
                          onClick={() => {
                            setOpenDeleteModal(true);
                            setSelectdContent(item);
                          }}
                        >
                          Delete
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </Group>
                  <Text fw={500}>{item.service_name}</Text>
                  <Text size="sm" c="dimmed">
                    {item.description}
                  </Text>
                </Card>
              </Grid.Col>
            ))
          ) : (
            <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
              <Card
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                h={"100%"}
                mb={"12px"}
              >
                <Card.Section component="a"></Card.Section>
                <Group justify="space-between" mt="md" mb="xs">
                  <Text fw={400} ta={"center"} c={"red"}>
                    There is no Contents related to Your Services
                  </Text>
                </Group>
              </Card>
            </Grid.Col>
          )}
        </Grid>
      </Container>

      <Container
        fluid
        bg={"#F8F7F6"}
        style={{
          borderRadius: "8px", // Apply the custom border radius here
          padding: "20px",
        }}
      >
        <Group
          justify="space-between"
          style={{ marginBottom: "10px", padding: "0 10px" }}
          mt={10}
        >
          <Title ta={"center"} order={3} mt="xs" mb="sm">
            About Content
          </Title>
          {/* <Title order={3}>Manage Content</Title> */}
          <Button variant="outline" onClick={() => setAboutModalOpened(true)}>
            Add New
          </Button>
        </Group>
        <Grid grow>
          {aboutData.aboutContent.length > 0 ? (
            aboutData.aboutContent.map((item) => (
              <Grid.Col span={{ base: 12, md: 6, lg: 3 }} key={item.id}>
                <Card
                  shadow="sm"
                  padding="lg"
                  radius="md"
                  withBorder
                  h={"100%"}
                  mb={"12px"}
                >
                  <Card.Section h={"100%"}>
                    <Image
                      src={`data:image/png;base64,${item.image}`}
                      alt={item.display_place}
                      h={"calc(100vh - 80px)"}
                      p={"10px"}
                      fit="contain" // Prevents distortion of the image
                    />
                  </Card.Section>

                  <Group justify="space-between" mt="md" mb="xs">
                    <Text fw={500}>Display place: {item.display_place}</Text>
                    <Menu shadow="md" width={200}>
                      <Menu.Target>
                        <ActionIcon variant="outline">
                          <RiArrowDropDownFill size={24} />
                        </ActionIcon>
                      </Menu.Target>
                      <Menu.Dropdown>
                        <Menu.Item
                          onClick={() => {
                            setOpenUpdateModal(true);
                            setSelectdContent(item);
                          }}
                        >
                          Edit
                        </Menu.Item>
                        <Menu.Item
                          color="red"
                          onClick={() => {
                            setOpenDeleteModal(true);
                            setSelectdContent(item);
                          }}
                        >
                          Delete
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </Group>

                  <Group justify="space-between" mt="md" mb="xs"></Group>
                  <Text size="sm" c="dimmed">
                    {item.description}
                  </Text>
                </Card>
              </Grid.Col>
            ))
          ) : (
            <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
              <Card
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                h={"100%"}
                mb={"12px"}
              >
                <Card.Section h={"100%"}>
                  <Text fw={400} ta="center" c="red">
                    You Have no Content
                  </Text>
                </Card.Section>
              </Card>
            </Grid.Col>
          )}
        </Grid>
      </Container>

      <Container
        fluid
        bg={"#F8F7F6"}
        style={{
          borderRadius: "8px", // Apply the custom border radius here
          padding: "20px",
        }}
      >
        <Group
          justify="space-between"
          style={{ marginBottom: "10px", padding: "0 10px" }}
          mt={10}
        >
          <Title ta={"center"} order={3} mt="xs" mb="sm">
            Contact Content
          </Title>
          <Button variant="outline" onClick={() => setContactModalOpened(true)}>
            Add New
          </Button>
        </Group>
        <Grid grow>
          {contactData.contact.length > 0 ? (
            contactData.contact.map((item) => (
              <>
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
                        src={`data:image/png;base64,${item.image}`}
                        h={"calc(100vh - 60px)"}
                        alt={item.file_name}
                        p={"10px"}
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
                    style={{ justifyContent: "center" }}
                    h={"100%"}
                    mb={"12px"}
                  >
                    <Text fz={17} fw={400}>
                      YEMI General Trading L.L.C
                    </Text>
                    {item.officeFullAddress}
                    <Space />
                    Mai Tower, Office
                    <Space />
                    602 Dubai, UAE
                    <Space />
                    Phone: {item.phoneNumber}
                    <Space />
                    Email: {item.emailAddress}
                    <Space />
                    {item.description}
                  </Card>
                </Grid.Col>
              </>
            ))
          ) : (
            <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
              <Card
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                h={"100%"}
                mb={"12px"}
              >
                <Card.Section component="a"></Card.Section>

                <Group justify="space-between" mt="md" mb="xs">
                  <Text fw={400} ta={"center"} c={"red"}>
                    There is no Contents related to Your Services
                  </Text>
                </Group>
              </Card>
            </Grid.Col>
          )}
        </Grid>
      </Container>
    </>
  );
};

export default ContentList;
