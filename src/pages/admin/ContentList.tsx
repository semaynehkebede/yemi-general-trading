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
import { useEffect, useState } from "react";
import Content from "./Content";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { RiArrowDropDownFill } from "react-icons/ri";
import ContentUpdate from "./ContentUpdate";
import { RootState } from "../../app/store";
import ServiceRegistration from "./ServiceRegistration";
import AboutContent from "./AboutContent";
import SliderImage from "./SliderImage";
import Contact from "./Contact";
import { deleteImageAction, fetchImageThunk } from "../../features/imageSlice";
import { deleteAboutAction, fetchAboutThunk } from "../../features/aboutSlice";
import {
  deleteServiceAction,
  fetchServiceThunk,
} from "../../features/serviceSlice";
import { toast } from "react-hot-toast"; // Import toast notification library
import SliderUpdate from "./SliderUpdate";
import AboutUpdate from "./about/AboutUpdate";
import { fetchContactThunk } from "../../features/contactSlice";
import ContactUpdate from "./ContactUpdate";

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
  const [openUpdateServiceModal, setOpenUpdateServiceModal] = useState(false);
  const [openUpdateSliderModal, setOpenUpdateSliderModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openDeleteAboutContentModal, setOpenDeleteAboutContentModal] =
    useState(false);
  const [openDeleteServiceContentModal, setOpenDeleteServiceContentModal] =
    useState(false);
  const [selectdContent, setSelectdContent] = useState<any>();
  const [selectdData, setSelectdData] = useState<any>();
  const [openUpdateAboutModal, setOpenUpdateAboutModal] = useState(false);
  const [openUpdateContactModal, setOpenUpdateContactModal] = useState(false);

  useEffect(() => {
    dispatch(fetchImageThunk());
    dispatch(fetchAboutThunk());
    dispatch(fetchServiceThunk());
    dispatch(fetchContactThunk());
  }, []);

  // Delete Service
  const onSubmitDeleteSliderData = async (data: any) => {
    try {
      await dispatch(deleteImageAction(data.id)).unwrap();
      toast.success("Data Deleted successfully!"); // Show success notification
      // Close the modal
      setOpenDeleteModal(false);
      setSelectdData({});
    } catch (error) {
      toast.error("Failed to Delete. Please try again!"); // Show error notification
    }
  };

  // Delete Service
  const onSubmitDeleteServiceData = async (data: any) => {
    try {
      await dispatch(deleteServiceAction(data.id)).unwrap();
      toast.success("Data Deleted successfully!"); // Show success notification
      // Close the modal
      setOpenDeleteServiceContentModal(false);
      setSelectdData({});
    } catch (error) {
      toast.error("Failed to Delete. Please try again!"); // Show error notification
    }
  };

  const onSubmitDeleteAboutData = async (data: any) => {
    console.log("on function", data);
    try {
      await dispatch(deleteAboutAction(data.id)).unwrap();
      toast.success("Data Deleted successfully!"); // Show success notification
      setOpenDeleteAboutContentModal(false);
      setSelectdData({});
    } catch (error) {
      toast.error("Failed to Delete. Please try again!"); // Show error notification
    }
  };

  console.log("the contact", contactData);

  return (
    <>
      <Group
        justify="center"
        style={{ marginBottom: "20px", padding: "0 20px" }}
        mt={10}
      >
        <Title order={3}>Manage Content</Title>
      </Group>

      {/* Create Slide Image modal */}
      <Modal
        opened={sliderModalOpened}
        onClose={() => {
          setSliderModalOpened(false);
        }}
        title="Create Image for Slide"
        size={"md"} // Predefined size (sm, md, lg, xl)
        styles={{
          title: {
            textAlign: "center",
            width: "100%",
          },
        }}
        centered
      >
        <SliderImage onClose={() => setSliderModalOpened(false)} />
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
        <Contact onClose={() => setContactModalOpened(false)} />
      </Modal>

      {/* Create About Content */}
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
        <AboutContent onClose={() => setAboutModalOpened(false)} />
      </Modal>

      {/* Service Modal */}
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
        <ServiceRegistration onClose={() => setServiceModalOpened(false)} />
      </Modal>

      {/* Update Slider */}
      <Modal
        opened={openUpdateSliderModal}
        onClose={() => {
          setOpenUpdateSliderModal(false);
          setSelectdData({});
        }}
        title="Update the following Content"
        size={"md"} // Predefined size (sm, md, lg, xl)
        styles={{
          title: {
            textAlign: "center", // Center the title text
            width: "100%",
          },
        }}
      >
        <SliderUpdate
          selectedItem={selectdData}
          onClose={(isOpened: boolean) => setOpenUpdateSliderModal(isOpened)}
        />
      </Modal>

      {/* Update Service */}
      <Modal
        opened={openUpdateServiceModal}
        onClose={() => {
          setOpenUpdateServiceModal(false);
          // setSelectedData({});
        }}
        title="Update Service"
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
          onClose={(isOpened: boolean) => setOpenUpdateServiceModal(isOpened)}
        />
      </Modal>

      {/* Update About content */}
      <Modal
        opened={openUpdateAboutModal}
        onClose={() => {
          setOpenUpdateAboutModal(false);
          // setSelectedData({});
        }}
        title="Update About Content"
        size={"md"} // Predefined size (sm, md, lg, xl)
        styles={{
          title: {
            textAlign: "center", // Center the title text
            width: "100%",
          },
        }}
      >
        <AboutUpdate
          selectedItem={selectdData}
          onClose={(isOpened: boolean) => setOpenUpdateAboutModal(isOpened)}
        />
      </Modal>

      {/* Update contact content */}
      <Modal
        opened={openUpdateContactModal}
        onClose={() => {
          setOpenUpdateContactModal(false);
          // setSelectedData({});
        }}
        title="Update Contact"
        size={"md"} // Predefined size (sm, md, lg, xl)
        styles={{
          title: {
            textAlign: "center", // Center the title text
            width: "100%",
          },
        }}
      >
        <ContactUpdate
          selectedItem={selectdData}
          onClose={(isOpened: boolean) => setOpenUpdateContactModal(isOpened)}
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
            onClick={() => onSubmitDeleteSliderData(selectdData)}
          >
            Delete
          </Button>
        </div>
      </Modal>

      {/* /////////////////////start for delete service//////////////////////// */}
      <Modal
        opened={openDeleteServiceContentModal}
        onClose={() => {
          setOpenDeleteServiceContentModal(false);
          setSelectdData({});
        }}
        centered
        title="Delete Confirmation"
        size="sm"
      >
        <Modal.Body>
          <p>Are you sure to delete this service?</p>
        </Modal.Body>
        <div>
          <Button
            className="mr-4"
            variant="light"
            onClick={() => setOpenDeleteServiceContentModal(false)}
          >
            Cancel
          </Button>
          <Button
            variant="filled"
            color="red"
            onClick={() => onSubmitDeleteServiceData(selectdData)}
          >
            Delete
          </Button>
        </div>
      </Modal>
      {/* /////////////////////Close for delete service//////////////////////// */}

      {/* /////////////////////start for delete about//////////////////////// */}
      <Modal
        opened={openDeleteAboutContentModal}
        onClose={() => {
          setOpenDeleteAboutContentModal(false);
          setSelectdData({});
        }}
        centered
        title="Delete Confirmation"
        size="sm"
      >
        <Modal.Body>
          <p>Are you sure to delete the item?</p>
        </Modal.Body>
        <div>
          <Button
            className="mr-4"
            variant="light"
            onClick={() => setOpenDeleteAboutContentModal(false)}
          >
            Cancel
          </Button>
          <Button
            variant="filled"
            color="red"
            onClick={() => onSubmitDeleteAboutData(selectdData)}
          >
            Delete
          </Button>
        </div>
      </Modal>
      {/* /////////////////////Close for delete about//////////////////////// */}
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
                    {item.image && (
                      <Image
                        src={item.image}
                        // src={`data:image/png;base64,${item.image}`}
                        mah={"calc(100vh - 60px)"}
                        alt={item.image_type}
                      />
                    )}
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
                            setOpenUpdateSliderModal(true);
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
                      src={item.image}
                      // src={`data:image/png;base64,${item.image}`}
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
                            setOpenUpdateServiceModal(true);
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
                            setOpenDeleteServiceContentModal(true);
                            setSelectdData(item);
                          }}
                        >
                          Delete
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </Group>
                  <Text fw={500}>Service Name:- {item.service_name}</Text>
                  <Text fw={500}>Service Type:- {item.service_type}</Text>
                  <Text size="sm" c="dimmed">
                    <span style={{ fontWeight: 500 }}>Description:-</span>
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
                      src={item.image}
                      // src={`data:image/png;base64,${item.image}`}
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
                            setOpenUpdateAboutModal(true);
                            setSelectdData(item);
                          }}
                        >
                          Edit
                        </Menu.Item>
                        <Menu.Item
                          color="red"
                          onClick={() => {
                            setOpenDeleteAboutContentModal(true);
                            setSelectdData(item);
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
          {contactData.contact ? (
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
                      src={contactData.contact.image}
                      h={"calc(100vh - 60px)"}
                      alt={contactData.contact.file_name}
                      p={"10px"}
                    />
                  </Card.Section>
                </Card>
              </Grid.Col>

              {/* Contact Info Card */}
              <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                <Card withBorder shadow="sm" radius="md">
                  <Card.Section withBorder inheritPadding py="xs">
                    <Group justify="space-between">
                      <Text fw={500}>{contactData.contact.company_name}</Text>
                      <Menu withinPortal position="bottom-end" shadow="sm">
                        <Menu.Target>
                          <ActionIcon variant="subtle" color="gray">
                            <RiArrowDropDownFill size={16} />
                            {/* <IconDots size={16} /> */}
                          </ActionIcon>
                        </Menu.Target>

                        <Menu.Dropdown>
                          <Menu.Item
                          onClick={() => {
                            setOpenUpdateContactModal(true);
                            setSelectdData(contactData.contact);
                          }}
                          >Edit</Menu.Item>
                          <Menu.Item>Preview all</Menu.Item>
                          <Menu.Item
                            // leftSection={<IconTrash size={14} />}
                            color="red"
                          >
                            Delete all
                          </Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
                    </Group>
                  </Card.Section>

                  <Text mt="sm" c="dimmed" size="sm">
                    {contactData.contact.description}
                  </Text>
                  <Text mt="sm" c="dimmed" size="sm">
                    <Space />
                    Office Address:
                    <Space />
                    {contactData.contact.office_full_address}
                    <Space />
                    Phone: {contactData.contact.phone_number}
                    <Space />
                    Email: {contactData.contact.email_address}
                    <Space />
                    {contactData.contact.description}
                  </Text>
                </Card>
              </Grid.Col>
            </>
          ) : (
            // No contact available
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
                    There is no Content related to Your Services
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
