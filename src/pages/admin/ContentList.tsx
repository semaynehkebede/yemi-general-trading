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
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import Content from "./Content";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { contentData, fetchContentThunk } from "../../features/contentSlice";
import { RiArrowDropDownFill } from "react-icons/ri";
import ContentUpdate from "./ContentUpdate";
import { Content as contentType} from "../../types/contentType";

const ContentList = () => {
  const dispatch = useAppDispatch();
  const { content, status, error } = useAppSelector(contentData);
  const [modalOpened, setModalOpened] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectdContent, setSelectdContent] = useState<any>();

  useEffect(() => {
    dispatch(fetchContentThunk());
  }, [dispatch]);
  console.log("content list", content, status);
  const onSubmitDelete = (content: any) => {
    // dispatch(deletePatientAction(patient.id));
    if (status === "succeeded") {
      setOpenDeleteModal(false);
    }
  };
  return (
    <>
      {/* Button outside the container, positioned to the right */}
      <Group
        justify="space-between"
        style={{ marginBottom: "20px", padding: "0 20px" }}
        mt={10}
      >
        <Title order={3}>Manage Content</Title>
        <Button variant="outline" onClick={() => setModalOpened(true)}>
          Add New
        </Button>
      </Group>
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
          setSelectdContent({});
        }}
        centered
        title="Delete Confirmation"
        size="sm"
      >
        <Modal.Body>
          <p>
            Are you sure you want to delete {selectdContent?.name}{" "}
          </p>
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
            onClick={() => onSubmitDelete('selectPatient')}
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
        <Title ta={"center"} order={3} mt="xs" mb="sm">
          Service Content
        </Title>
        <Grid grow>
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section component="a">
                <Image src={"coffee"} height={"auto"} alt="Ethiopian Product" />
              </Card.Section>

              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>Coffee</Text>
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
                      setSelectdContent('');
                    }}
                    >
                      Edit
                    </Menu.Item>
                    <Menu.Item
                      // icon={<FiTrash2 size={16} />}
                      // onClick={handleDelete}
                      color="red"
                    >
                      Delete
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Group>

              <Text size="sm" c="dimmed">
                Both raw and processed varieties, including washed and unwashed
                Ethiopian coffee
              </Text>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section component="a">
                <Image src={"nigerseed"} height={"auto"} alt="Niger Seed" />
              </Card.Section>

              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>Niger Seed</Text>
                <RiArrowDropDownFill />
              </Group>

              <Text size="sm" c="dimmed">
                Both raw and processed varieties, including washed and unwashed
                Ethiopian coffee
              </Text>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section component="a">
                <Image src={"kidneybeans"} height={"auto"} alt="Kidney Beans" />
              </Card.Section>

              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>Red Kidney Beans</Text>
              </Group>

              <Text size="sm" c="dimmed">
                Both raw and processed varieties, including washed and unwashed
                Ethiopian coffee
              </Text>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section component="a">
                <Image
                  src={"greenmungbeans"}
                  height={"auto"}
                  alt="Green Mung Beans"
                />
              </Card.Section>

              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>Green Mung Beans</Text>
              </Group>

              <Text size="sm" c="dimmed">
                Both raw and processed varieties, including washed and unwashed
                Ethiopian coffee
              </Text>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section component="a">
                <Image src={"miningproduct"} height={"auto"} alt="Norway" />
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
              <Card.Section component="a">
                <Image src={"oilseed"} height={"auto"} alt="Norway" />
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
              <Card.Section component="a">
                <Image
                  src={"special"}
                  height={"auto"}
                  alt="Specialty Exports"
                />
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

      <Container
        fluid
        bg={"#F8F7F6"}
        style={{
          borderRadius: "8px", // Apply the custom border radius here
          padding: "20px",
        }}
      >
        <Title ta={"center"} order={3} mt="xs" mb="sm">
          About Content
        </Title>
        <Grid grow>
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section component="a">
                <Image src={"coffee"} height={"auto"} alt="Ethiopian Product" />
              </Card.Section>

              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>Coffee</Text>
              </Group>

              <Text size="sm" c="dimmed">
                Both raw and processed varieties, including washed and unwashed
                Ethiopian coffee
              </Text>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section component="a">
                <Image src={"nigerseed"} height={"auto"} alt="Niger Seed" />
              </Card.Section>

              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>Niger Seed</Text>
              </Group>

              <Text size="sm" c="dimmed">
                Both raw and processed varieties, including washed and unwashed
                Ethiopian coffee
              </Text>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section component="a">
                <Image src={"kidneybeans"} height={"auto"} alt="Kidney Beans" />
              </Card.Section>

              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>Red Kidney Beans</Text>
              </Group>

              <Text size="sm" c="dimmed">
                Both raw and processed varieties, including washed and unwashed
                Ethiopian coffee
              </Text>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section component="a">
                <Image
                  src={"greenmungbeans"}
                  height={"auto"}
                  alt="Green Mung Beans"
                />
              </Card.Section>

              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>Green Mung Beans</Text>
              </Group>

              <Text size="sm" c="dimmed">
                Both raw and processed varieties, including washed and unwashed
                Ethiopian coffee
              </Text>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section component="a">
                <Image src={"miningproduct"} height={"auto"} alt="Norway" />
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
              <Card.Section component="a">
                <Image src={"oilseed"} height={"auto"} alt="Norway" />
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
              <Card.Section component="a">
                <Image
                  src={"special"}
                  height={"auto"}
                  alt="Specialty Exports"
                />
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

      <Container
        fluid
        bg={"#F8F7F6"}
        style={{
          borderRadius: "8px", // Apply the custom border radius here
          padding: "20px",
        }}
      >
        <Title ta={"center"} order={3} mt="xs" mb="sm">
          Contact Content
        </Title>
        <Grid grow>
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section component="a">
                <Image src={"coffee"} height={"auto"} alt="Ethiopian Product" />
              </Card.Section>

              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>Coffee</Text>
              </Group>

              <Text size="sm" c="dimmed">
                Both raw and processed varieties, including washed and unwashed
                Ethiopian coffee
              </Text>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section component="a">
                <Image src={"nigerseed"} height={"auto"} alt="Niger Seed" />
              </Card.Section>

              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>Niger Seed</Text>
              </Group>

              <Text size="sm" c="dimmed">
                Both raw and processed varieties, including washed and unwashed
                Ethiopian coffee
              </Text>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section component="a">
                <Image src={"kidneybeans"} height={"auto"} alt="Kidney Beans" />
              </Card.Section>

              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>Red Kidney Beans</Text>
              </Group>

              <Text size="sm" c="dimmed">
                Both raw and processed varieties, including washed and unwashed
                Ethiopian coffee
              </Text>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section component="a">
                <Image
                  src={"greenmungbeans"}
                  height={"auto"}
                  alt="Green Mung Beans"
                />
              </Card.Section>

              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>Green Mung Beans</Text>
              </Group>

              <Text size="sm" c="dimmed">
                Both raw and processed varieties, including washed and unwashed
                Ethiopian coffee
              </Text>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section component="a">
                <Image src={"miningproduct"} height={"auto"} alt="Norway" />
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
              <Card.Section component="a">
                <Image src={"oilseed"} height={"auto"} alt="Norway" />
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
              <Card.Section component="a">
                <Image
                  src={"special"}
                  height={"auto"}
                  alt="Specialty Exports"
                />
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

      <Container
        fluid
        bg={"#F8F7F6"}
        style={{
          borderRadius: "8px", // Apply the custom border radius here
          padding: "20px",
        }}
      >
        <Title ta={"center"} order={3} mt="xs" mb="sm">
          Location Content
        </Title>
        <Grid grow>
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section component="a">
                <Image src={"coffee"} height={"auto"} alt="Ethiopian Product" />
              </Card.Section>

              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>Coffee</Text>
              </Group>

              <Text size="sm" c="dimmed">
                Both raw and processed varieties, including washed and unwashed
                Ethiopian coffee
              </Text>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section component="a">
                <Image src={"nigerseed"} height={"auto"} alt="Niger Seed" />
              </Card.Section>

              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>Niger Seed</Text>
              </Group>

              <Text size="sm" c="dimmed">
                Both raw and processed varieties, including washed and unwashed
                Ethiopian coffee
              </Text>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section component="a">
                <Image src={"kidneybeans"} height={"auto"} alt="Kidney Beans" />
              </Card.Section>

              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>Red Kidney Beans</Text>
              </Group>

              <Text size="sm" c="dimmed">
                Both raw and processed varieties, including washed and unwashed
                Ethiopian coffee
              </Text>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section component="a">
                <Image
                  src={"greenmungbeans"}
                  height={"auto"}
                  alt="Green Mung Beans"
                />
              </Card.Section>

              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>Green Mung Beans</Text>
              </Group>

              <Text size="sm" c="dimmed">
                Both raw and processed varieties, including washed and unwashed
                Ethiopian coffee
              </Text>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section component="a">
                <Image src={"miningproduct"} height={"auto"} alt="Norway" />
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
              <Card.Section component="a">
                <Image src={"oilseed"} height={"auto"} alt="Norway" />
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
              <Card.Section component="a">
                <Image
                  src={"special"}
                  height={"auto"}
                  alt="Specialty Exports"
                />
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
    </>
  );
};

export default ContentList;
