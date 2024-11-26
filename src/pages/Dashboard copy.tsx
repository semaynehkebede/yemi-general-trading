import React, { useState } from 'react';
import { Container, Group, ActionIcon, Button, Text, useMantineTheme } from '@mantine/core';
import { BsMoon, BsSun } from 'react-icons/bs'; // You can use any icon you prefer
import { useColorScheme } from '@mantine/hooks';

// const useStyles = createStyles((theme: any) => ({
//   logo: {
//     fontSize: 24,
//     fontWeight: 700,
//     color: theme.colors.blue[6],
//   },
//   navbarLink: {
//     textDecoration: 'none',
//     color: theme.colors.dark[6],
//     '&:hover': {
//       color: theme.colors.blue[6],
//     },
//   },
//   navbar: {
//     paddingTop: theme.spacing.sm,
//     paddingBottom: theme.spacing.sm,
//   },
//   button: {
//     fontSize: 14,
//     padding: '10px 20px',
//     backgroundColor: theme.colors.blue[6],
//     color: theme.white,
//     '&:hover': {
//       backgroundColor: theme.colors.blue[7],
//     },
//   },
// }));

const Dashboard = () => {
  // const { classes } = useStyles();
  const theme = useMantineTheme();
  const colorScheme = useColorScheme();
  const [darkMode, setDarkMode] = useState<boolean>(colorScheme === 'dark');

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    document.body.classList.toggle('dark');
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <Container>
        {/* Main Content */}
        <section>
          <div className="main-img">
            <img src="image/allimage.jpg" alt="Company Image" style={{ width: '100%' }} />
            <div className="overlay-text">
              <Text ta="center" size="xl" fw={700}>
                Welcome to Y E M I General Trading
              </Text>
              <Text ta="center" size="lg">
                Your Gateway to Global Trade Excellence
              </Text>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="about">
          <div className="about-img">
            <img src="image/sesame2.jpg" alt="About Image" style={{ width: '100%' }} />
          </div>
          <div className="about-text">
            <Text size="xl" fw={700}>About Us</Text>
            <Text size="lg" style={{ marginBottom: '1rem' }}>Your Gateway to Global Trade Excellence</Text>
            <Text>
              Founded on June 25, 2022, in Dubai, UAE, Y E M I GENERAL TRADING L.L.C. is a dedicated provider of
              world-class import and export solutions. We specialize in delivering high-quality products and tailored
              trade solutions to meet diverse client needs worldwide.
            </Text>
            <Button variant="outline" style={{ marginTop: '1rem' }}>Learn More</Button>
          </div>
        </section>

        {/* Services Section */}
        <section className="services" id="services">
          <Text ta="center" size="xl" fw={700} style={{ marginBottom: '1rem' }}>
            Our Services
          </Text>
          <Text ta="center" size="md">
            Serving markets across Europe, USA, Middle East, and more...
          </Text>

          <Group align='center' style={{ marginTop: '2rem' }}>
            {/* Service Box 1 */}
            <div className="service-box">
              <img src="image/c1.webp" alt="Coffee" style={{ width: '100%' }} />
              <Text size="lg" fw={500}>Coffee</Text>
              <Text size="sm">Both raw and processed varieties, including washed and unwashed Ethiopian coffee.</Text>
            </div>
            {/* Service Box 2 */}
            <div className="service-box">
              <img src="image/pulses.jpg" alt="Pulses" style={{ width: '100%' }} />
              <Text size="lg" fw={500}>Pulses</Text>
              <Text size="sm">A diverse selection, including kidney beans, black beans, and more.</Text>
            </div>
            {/* Service Box 3 */}
            <div className="service-box">
              <img src="image/miningproduct.jpg" alt="Mining Products" style={{ width: '100%' }} />
              <Text size="lg" fw={500}>Mining Products</Text>
              <Text size="sm">Mining products like Copper and Opal.</Text>
            </div>
          </Group>
        </section>

        {/* Contact Section */}
        <section className="contact" id="contact">
          <Text ta="center" size="xl" fw={700}>Contact Us</Text>
          <Button variant="outline" size="lg" style={{ marginTop: '2rem' }}>
            Contact Us Now
          </Button>
        </section>

        {/* Footer */}
        <footer style={{ textAlign: 'center', padding: '20px' }}>
          <Text size="sm">© Y E M I General Trading All Rights Reserved.</Text>
        </footer>
      </Container>
    </div>
  );
};

export default Dashboard;