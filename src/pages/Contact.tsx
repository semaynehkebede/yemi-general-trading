import {
  Button,
  Card,
  Container,
  Grid,
  Group,
  Image,
  Text,
  Space,
  Stack,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import coffee from "../assets/image/c1.webp"; // Import the image
import map from "../assets/image/map.png"; // Import the image
import { FaPhone } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";
import { PiBuilding } from "react-icons/pi";
import { useAppSelector } from "../hooks/hooks";
import { RootState } from "../app/store";
import toast from "react-hot-toast";
import CommonLink from "./CommonLink";

const Contact = () => {
  const contactData = useAppSelector((state: RootState) => state.contactData);
  const sliderImage = useAppSelector((state: RootState) => state.imageContent);
  const contactImage = sliderImage.image  .filter((image: any) => image.image_type === "contact")[0]?.image || coffee;
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });
  return (
    <>
      <Container
        fluid
        style={{
          width: "100%", // full viewport width
          // height: "100vh", // adjust height as needed
          overflow: "hidden", // hide any overflow
          backgroundImage: `url(${contactImage})`, // replace with your image variable or URL
          backgroundSize: "cover", // makes the image cover the entire container
          backgroundPosition: "center", // centers the image
          backgroundRepeat: "no-repeat", // prevents the image from repeating
        }}
      >
        <Grid grow pb={30} mt={"20%"}>
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }} pb={20}>
            <Card shadow="sm" radius="md" withBorder>
              {/* Use Stack to align items vertically */}
              <Stack align="center" justify="center" mt="xs" mb="xs">
                <FaPhone size={24} />
                <Text fw={400} fz={22}>
                  Phone Number
                </Text>
                <Space />
              </Stack>
              <Text size="md" c="dimmed" ta={"center"}>
                {contactData.contact &&
                contactData.contact?.phone_number
                  ? contactData.contact?.phone_number
                  : `+971543017029`}
              </Text>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }} pb={20}>
            <Card shadow="sm" radius="md" withBorder>
              {/* Use Stack to align items vertically */}
              <Stack align="center" justify="center" mt="xs" mb="xs">
                <TfiEmail size={24} />
                <Text fw={400} fz={22}>
                  Email Address
                </Text>
                <Space />
              </Stack>
              <Text size="md" c="dimmed" ta={"center"}>
                {contactData.contact &&
                contactData.contact?.email_address
                  ? contactData.contact?.email_address
                  : `Info@yemitradingllc.com`}
              </Text>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }} pb={20}>
            <Card shadow="sm" radius="md" withBorder>
              {/* Use Stack to align items vertically */}
              <Stack align="center" justify="center" mt="xs" mb="xs">
                <PiBuilding size={24} />
                <Text fw={400} fz={22}>
                  Our Head Office
                </Text>
                <Space />
              </Stack>
              <Text size="md" c="dimmed" ta={"center"}>
                {contactData.contact &&
                contactData.contact?.office_full_address
                  ? contactData.contact?.office_full_address
                  : `Mai Tower, Office 602, Dubai, UAE`}
              </Text>
            </Card>
          </Grid.Col>
        </Grid>
      </Container>
      <Container
        mt={42}
        style={{
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Shadow
          borderRadius: "8px", // Rounded corners
          backgroundColor: "#fff", // Background color
        }}
      >
        <Grid grow pb={30}>
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
            <Card shadow="sm" padding="xl" component="a" target="_blank">
              <Card.Section></Card.Section>

              <Text fw={500} size="lg" mt="md">
                Contact Form
              </Text>
              <form>
                <TextInput
                  withAsterisk
                  label="Name"
                  placeholder="your name"
                  key={form.key("name")}
                  {...form.getInputProps("name")}
                  readOnly
                  onFocus={() => toast.error(  `Please send your idea:-  ${
                   contactData.contact && contactData.contact?.email_address
                      ? contactData.contact?.email_address
                      : "Info@yemitradingllc.com"
                  }`)}
                />
                <TextInput
                  withAsterisk
                  label="Email"
                  placeholder="your@email.com"
                  key={form.key("email")}
                  {...form.getInputProps("email")}
                  readOnly
                  onFocus={() => toast.error(  `Please send your idea:-  ${
                   contactData.contact && contactData.contact?.email_address
                      ? contactData.contact?.email_address
                      : "Info@yemitradingllc.com"
                  }`)}
                />
                <TextInput
                  withAsterisk
                  label="Phone"
                  placeholder="your phone number"
                  key={form.key("Phone")}
                  {...form.getInputProps("Phone")}
                  readOnly
                  onFocus={() => toast.error(  `Please send your idea:-  ${
                   contactData.contact && contactData.contact?.email_address
                      ? contactData.contact?.email_address
                      : "Info@yemitradingllc.com"
                  }`)}
                />
                <TextInput
                  withAsterisk
                  label="Subject"
                  placeholder="Subject"
                  key={form.key("subject")}
                  {...form.getInputProps("subject")}
                  readOnly
                  onFocus={() => toast.error(  `Please send your idea:-  ${
                   contactData.contact && contactData.contact?.email_address
                      ? contactData.contact?.email_address
                      : "Info@yemitradingllc.com"
                  }`)}
                />
                <Textarea
                  withAsterisk
                  mt="md"
                  label="With your message"
                  placeholder="Write your message"
                  readOnly
                  onFocus={() => toast.error(  `Please send your idea:-  ${
                   contactData.contact && contactData.contact?.email_address
                      ? contactData.contact?.email_address
                      : "Info@yemitradingllc.com"
                  }`)}
                />
                <Group justify="flex-end" mt="md">
                  <Button type="submit" disabled>Submit</Button>
                </Group>
              </form>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
            <Card
              shadow="sm"
              padding="xl"
              component="a"
              href="https://www.google.com/maps/place/Mai+Tower+-+Al+Qusais+-+Al+Nahda+1+-+Dubai+-+United+Arab+Emirates/@25.2879745,55.3650455,21z/data=!4m15!1m8!3m7!1s0x3e5f5c641d5a9e2f:0x9e2a1fef589bd3b0!2sMai+Tower+-+Al+Qusais+-+Al+Nahda+1+-+Dubai+-+United+Arab+Emirates!3b1!8m2!3d25.2879542!4d55.3652105!16s%2Fg%2F1hjh3xv8x!3m5!1s0x3e5f5c641d5a9e2f:0x9e2a1fef589bd3b0!8m2!3d25.2879542!4d55.3652105!16s%2Fg%2F1hjh3xv8x?entry=ttu&g_ep=EgoyMDI0MTExMy4xIKXMDSoASAFQAw%3D%3D"
              target="_blank"
            >
              <Card.Section>
                <Image
                  src={map}
                  h={160}
                  alt="No way!"
                  style={{ objectFit: "contain" }}
                />
              </Card.Section>
            </Card>
          </Grid.Col>
        </Grid>
      </Container>
      <CommonLink />
    </>
  );
};

export default Contact;



