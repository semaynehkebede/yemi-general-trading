import {
  AppShell,
  Burger,
  Group,
  UnstyledButton,
  useComputedColorScheme,
  useMantineColorScheme,
  Image,
  Text,
  Menu,
  Avatar,
} from "@mantine/core";
import cx from "clsx";
import { useDisclosure } from "@mantine/hooks";
import classes from "../styles/css/layout.module.css";
import { CiDark, CiLight } from "react-icons/ci";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";
import logo from "../assets/image/logo71.png";
import { MdSettings, MdLogout } from "react-icons/md";
import { useAppDispatch } from "../hooks/hooks";
import { logout } from "../features/loginSlice";
const data = [
  { link: "/home", label: "Home" },
  { link: "/service", label: "Service" },
  { link: "/about", label: "About" },
  { link: "/contact", label: "Contact" },
];
export const Layout = () => {
  const dispatch = useAppDispatch();
  const [opened, { toggle }] = useDisclosure();
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  const current_url = window.location.pathname.replace("/", "");
  // var reload_index = data.findIndex((item) => item.link === current_url);
  const reload_index = data.findIndex(
    (item) => item.link === `/${current_url}`
  );
  const [active, setActive] = useState(reload_index !== -1 ? reload_index : 0);
  // const [active, setActive] = useState(reload_index);
  const navigate = useNavigate(); // Navigate object for navigation

  // Dynamically fetch the user data from localStorage
  const logUser = localStorage.getItem("userInfo") || "{}";
  const userData = logUser ? JSON.parse(logUser) : null;

  // Logout and Settings Handlers
  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    dispatch(logout());
    navigate("/");
  };

  const handleSettings = () => {
    window.location.href = "/settings"; // Redirect to settings page
  };

  const links = data.map((item, index) => (
    <UnstyledButton
      key={item.link}
      // className={classes.link}
      data-active={index === active || undefined}
      className={cx(classes.link, {
        [classes.active]: index === active, // Add active class for styling
      })}
      component={Link}
      variant="link"
      to={item.link}
      onClick={(event) => {
        setActive(index);
        if (window.innerWidth <= 768) {
          // Check if the screen width is small
          toggle(); // Close the navbar on small screens
        }
      }}
    >
      {item.label}
    </UnstyledButton>
  ));
  // --------------------------------
  return (
    <AppShell
      header={{ height: 60 }}
      footer={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { desktop: true, mobile: !opened },
      }}
    >
      <AppShell.Header bg={"cyan"} bd={"none"}>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="space-between" style={{ flex: 1 }}>
            <Image src={logo} width={60} h={60} />
            <Text>YEMI General Trading LLC</Text>

            <Header />
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar
        bg={"cyan"}
        px={4}
        style={{
          display: "flex",
          alignItems: "center",
          alignContent: "center",
          height: 306,
        }}
      >
        {userData?.role === true ? (
          <Menu withArrow position="right">
            <Menu.Target>
              <UnstyledButton className={classes.link}>
                <Text fw={500}>Manage</Text>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                component={Link}
                to="/manage/employee"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent parent handlers
                  if (window.innerWidth <= 768) {
                    toggle(); // Close the navbar
                  }
                }}
              >
                Employee
              </Menu.Item>
              <Menu.Item
                component={Link}
                to="/manage/content"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent parent handlers
                  if (window.innerWidth <= 768) {
                    toggle(); // Close the navbar
                  }
                }}
              >
                Content
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        ) : (
          ""
        )}

        {links}

        {userData?.role === true ? (
          <Menu withArrow position="right">
            <Menu.Target>
              <UnstyledButton className={classes.link}>
                {userData?.userName}
                <Avatar />
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                leftSection={<MdSettings size={16} />}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent parent handlers
                  if (window.innerWidth <= 768) {
                    toggle(); // Close the navbar
                  }
                }}
              >
                Settings
              </Menu.Item>
              <Menu.Item
                leftSection={<MdLogout size={16} />}
                onClick={handleLogout}
                color="red"
              >
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        ) : (
          ""
        )}
        <UnstyledButton
          onClick={() =>
            setColorScheme(computedColorScheme === "light" ? "dark" : "light")
          }
          variant="default"
          size="xl"
          aria-label="Toggle color scheme"
        >
          {computedColorScheme === "light" ? (
            <CiDark
              className={cx(classes.icon, classes.dark)}
              style={{ strokeWidth: 1.5 }}
            />
          ) : (
            <CiLight
              className={cx(classes.icon, classes.light)}
              style={{ strokeWidth: 1.5 }}
            />
          )}
        </UnstyledButton>
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
      <AppShell.Footer p="md">
        <Footer />
      </AppShell.Footer>
    </AppShell>
  );
};
