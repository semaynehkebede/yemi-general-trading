import { Anchor, Card, Container, Divider, Grid, Group, Stack, Text, Title } from '@mantine/core'
import React from 'react'
import { FaEnvelope, FaFacebook, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaTwitter } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const CommonLink = () => {
  return (
    <Container fluid bg="#0468b1" mt={50} mb={30}>
    <Title
    fw={500}
      ta="center"
      order={2}
      mt="md"
      mb="sm"
      c="white"
      style={{ fontWeight: 400, fontSize: "1.5rem" }} // Adjusted font weight and size
    >
      YEMI General Trading P.L.C
    </Title>
    <Divider my="md" />
    <Grid grow mb={30}>
      <Grid.Col span={{ base: 12, md: 4, lg: 3 }}>
        <Card padding="lg" h="100%" mb="12px" bg="inherit">
          <Title
            order={3}
            style={{
              fontWeight: 400,
              fontSize: "1.3rem",
              color: "white",
            }}
          >
            Connect With Us
          </Title>
          <Group
            mt="sm"
            gap="xs"
            style={{
              display: "flex",
            }}
          >
            <Anchor href="#" style={{ fontSize: "1rem", color: "white" }}>
              <FaFacebook />
            </Anchor>
            <Anchor href="#" style={{ fontSize: "1rem", color: "white" }}>
              <FaTwitter />
            </Anchor>
            <Anchor href="#" style={{ fontSize: "1rem", color: "white" }}>
              <FaInstagram />
            </Anchor>
          </Group>
        </Card>
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 4, lg: 3 }}>
        <Card padding="lg" h="100%" mb="12px" bg="inherit">
          <Title
            order={3}
            style={{ fontWeight: 400, fontSize: "1.3rem", color: "white" }} // Adjusted font weight and size
          >
            Quick Links
          </Title>
          <Stack gap="xs" mt="0.6rem">
            {["Home", "About", "Service", "Contact"].map((link) => (
              <Anchor
                key={link}
                component={Link} // Using Link component from react-router-dom
                to={`/${link.toLowerCase()}`} // Set the route based on the link
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontSize: "0.8rem", // Adjusted font size
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "yellow")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "white")
                }
              >
                {link}
              </Anchor>
            ))}
          </Stack>
        </Card>
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 4, lg: 3 }}>
        <Card padding="lg" h="100%" mb="12px" bg="inherit">
          <Title
            order={3}
            style={{ fontWeight: 400, fontSize: "1.3rem", color: "white" }} // Adjusted font weight and size
          >
            Contact
          </Title>
          <Stack gap="xs" mt="0.6rem">
            <Group gap="xs">
              <FaMapMarkerAlt size="1rem" />
              <Text color="white" style={{ fontSize: "0.9rem" }}>
                Mai Tower, Office 602, Dubai, UAE
              </Text>
            </Group>
            <Group gap="xs">
              <FaPhoneAlt size="1rem" />
              <Text color="white" style={{ fontSize: "0.9rem" }}>
                +971543017029
              </Text>
            </Group>
            <Group gap="xs">
              <FaEnvelope size="1.3rem" />
              <Text color="white" style={{ fontSize: "0.9rem" }}>
                Info@yemitradingllc.com
              </Text>
            </Group>
          </Stack>
        </Card>
      </Grid.Col>
    </Grid>
  </Container>
  )
}

export default CommonLink