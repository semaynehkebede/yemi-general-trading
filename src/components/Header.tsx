import {
  UnstyledButton,
  useMantineColorScheme,
  useComputedColorScheme,
  Group,
  Menu,
  Text,
  Avatar,
} from "@mantine/core";
import cx from "clsx";
import classes from "../styles/css/layout.module.css";
import { CiDark, CiLight } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { logout } from "../features/loginSlice";
import { useAppDispatch } from "../hooks/hooks";
import { MdLogout, MdSettings } from "react-icons/md";
import { useDisclosure } from "@mantine/hooks";

// Define the public and private routes
const publicData = [
  { link: "/home", label: "Home" },
  { link: "/service", label: "Service" },
  { link: "/about", label: "About" },
  { link: "/contact", label: "Contact" },
];

const privateData = [
  { link: "/manage/employee", label: "Employee" },
  { link: "/manage/content", label: "Content" },
];

export const Header = () => {
  const dispatch = useAppDispatch();
  const [opened, { toggle }] = useDisclosure();
  console.log(opened);
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  const current_url = window.location.pathname.replace("/", "");
  
  const reload_index = publicData.findIndex(
    (item) => item.link === `/${current_url}`
  );
  const [active, setActive] = useState(reload_index !== -1 ? reload_index : 0);
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

  const publicLinks = publicData.map((item, index) => (
    <UnstyledButton
      key={index}
      data-active={index === active || undefined}
      className={cx(classes.link, {
        [classes.active]: index === active, // Add active class for styling
      })}
      component={Link}
      to={item.link}
      onClick={(event) => {
        console.log(event);
        
        setActive(index);
        if (window.innerWidth <= 768) {
          // Check if the screen width is small
          toggle(); // Close the navbar on small screens
        }
      }}
      variant="link"
    >
      {item.label}
    </UnstyledButton>
  ));

  const privateLinks =
    userData?.role === true
      ? privateData.map((item, index) => (
          <UnstyledButton
            key={index}
            className={classes.link}
            component={Link}
            to={item.link}
            variant="link"
          >
            {item.label}
          </UnstyledButton>
        ))
      : null;

  return (
    <Group ml="xl" gap={0} visibleFrom="sm">
      {userData?.role === true && (
        <Menu withArrow>
          <Menu.Target>
            <UnstyledButton className={classes.link}>
              <Text fw={500}>Manage</Text>
            </UnstyledButton>
          </Menu.Target>
          <Menu.Dropdown bg={"cyan"}>{privateLinks}</Menu.Dropdown>
        </Menu>
      )}

      {/* Render the public links */}
      {publicLinks}

      {userData?.role === true ? (
        <Menu withArrow position="bottom">
          <Menu.Target>
            <UnstyledButton className={classes.link}
             styles={{
              root: {
                display: "flex",
                alignItems: "center",
                gap: "5px", // Add spacing between Avatar and text
              },
            }}>
              {userData?.userName}
              <Avatar 
              color="white" // Set the background color to white
              radius="xl"
              styles={(theme) => ({
                root: {
                  backgroundColor: theme.white,
                  color: theme.colors.dark[9], // Set text color to dark for contrast
                  border: `1px solid ${theme.colors.gray[3]}`, // Optional: add a border
                },
              })}/>
            </UnstyledButton>
          </Menu.Target>
          <Menu.Dropdown bg={"cyan"}>
            <Menu.Item
              leftSection={<MdSettings size={16} />}
            >
              Settings
            </Menu.Item>
            <Menu.Item
              leftSection={<MdLogout size={16} />}
              onClick={handleLogout}
              // color="red"
              
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
    </Group>
  );
};
