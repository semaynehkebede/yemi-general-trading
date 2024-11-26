import {
  UnstyledButton,
  useMantineColorScheme,
  useComputedColorScheme,
  Group,
  Menu,
  Text,
} from "@mantine/core";
import cx from "clsx";
import classes from "../styles/css/layout.module.css";
import { CiDark, CiLight } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useState } from "react";
const data = [
  { link: "/home", label: "Home" },
  { link: "/service", label: "Service" },
  { link: "/about", label: "About" },
  { link: "/contact", label: "Contact" },
];

export const Header = () => {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });
  const current_url = window.location.pathname.replace("/", "");
  var reload_index = data.findIndex((item) => item.link === current_url);

  const [active, setActive] = useState(reload_index);

  const links = data.map((item, index) => (
    <UnstyledButton
      className={classes.link}
      data-active={index === active || undefined}
      component={Link}
      variant="link"
      to={item.link}
      onClick={(event) => {
        setActive(index);
      }}
    >{item.label}
    </UnstyledButton>
  ));
  return (
    <Group ml="xl" gap={0} visibleFrom="sm">
      {/* New Dropdown Button for Register */}
      <Menu withArrow>
        <Menu.Target>
          <UnstyledButton className={classes.link}>
            <Text fw={500}>Manage</Text>
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            component={Link}
            to="/manage/employee"
          >
            Employee
          </Menu.Item>
          <Menu.Item
            component={Link}
            to="/manage/content"
          >
            Content
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      {links}
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
