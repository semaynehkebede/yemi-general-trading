import { Button, Card, Container, Grid, Group, Modal, Table, Title } from "@mantine/core";
import React, { useState } from "react";
import EmployeeRegistration from "./EmployeeRegistration";
const elements = [
  { id: 1, title: "Mr", firstName: "Hydrogen", middleName: "Hydrogen", lastName: "Hydrogen", gender: "H", age: 1.008, position: "Hydrogen", hireDate: "Hydrogen", salary: "Hydrogen", status: "H", photo: 1.008 },
  { id: 2, title: "Mr", firstName: "Helium", middleName: "Hydrogen", lastName: "Hydrogen", gender: "He", age: 4.0026, position: "Hydrogen", hireDate: "Hydrogen", salary: "Hydrogen", status: "H", photo: 1.008 },
  { id: 3, title: "Mr", firstName: "Lithium", middleName: "Hydrogen", lastName: "Hydrogen", gender: "Li", age: 6.94, position: "Hydrogen", hireDate: "Hydrogen", salary: "Hydrogen", status: "H", photo: 1.008 },
  { id: 4, title: "Mr", firstName: "Beryllium", middleName: "Hydrogen", lastName: "Hydrogen", gender: "Be", age: 9.0122, position: "Hydrogen", hireDate: "Hydrogen", salary: "Hydrogen", status: "H", photo: 1.008 },
  { id: 5, title: "Mr", firstName: "Boron", middleName: "Hydrogen", lastName: "Hydrogen", gender: "B", age: 10.81, position: "Hydrogen", hireDate: "Hydrogen", salary: "Hydrogen", status: "H", photo: 1.008 },
  { id: 6, title: "Mr", firstName: "Carbon", middleName: "Hydrogen", lastName: "Hydrogen", gender: "C", age: 12.011, position: "Hydrogen", hireDate: "Hydrogen", salary: "Hydrogen", status: "H", photo: 1.008 },
  { id: 7, title: "Mr", firstName: "Nitrogen", middleName: "Hydrogen", lastName: "Hydrogen", gender: "N", age: 14.007, position: "Hydrogen", hireDate: "Hydrogen", salary: "Hydrogen", status: "H", photo: 1.008 },
  { id: 8, title: "Mr", firstName: "Oxygen", middleName: "Hydrogen", lastName: "Hydrogen", gender: "O", age: 15.999, position: "Hydrogen", hireDate: "Hydrogen", salary: "Hydrogen", status: "H", photo: 1.008 },
  { id: 9, title: "Mr", firstName: "Fluorine", middleName: "Hydrogen", lastName: "Hydrogen", gender: "F", age: 18.998, position: "Hydrogen", hireDate: "Hydrogen", salary: "Hydrogen", status: "H", photo: 1.008 },
  { id: 10, title: "Mr", firstName: "Neon", middleName: "Hydrogen", lastName: "Hydrogen", gender: "Ne", age: 20.18, position: "Hydrogen", hireDate: "Hydrogen", salary: "Hydrogen", status: "H", photo: 1.008 },
];
const Employee = () => {
  const [createEmployeeMdl, setCreateEmployeeMdl] = useState(false);
  const rows = elements.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>{element.id}</Table.Td>
      <Table.Td>{element.title}</Table.Td>
      <Table.Td>{element.firstName}</Table.Td>
      <Table.Td>{element.middleName}</Table.Td>
      <Table.Td>{element.lastName}</Table.Td>
      <Table.Td>{element.gender}</Table.Td>
      <Table.Td>{element.age}</Table.Td>
      <Table.Td>{element.position}</Table.Td>
      <Table.Td>{element.hireDate}</Table.Td>
      <Table.Td>{element.salary}</Table.Td>
      <Table.Td>{element.status}</Table.Td>
      <Table.Td>{element.photo}</Table.Td>
    </Table.Tr>
  ));
  return (
    <>
    <Container fluid bg={"dark"}>      
      <Group
          justify="space-between"
          style={{ marginBottom: "10px", padding: "0 10px" }}
          mt={10}
        >
          <Title ta={"center"} order={2} mt="sm" mb="sm" c={"white"}>
        Employee Management
      </Title>
          <Button variant="outline" onClick={() => setCreateEmployeeMdl(true)}>
            Add New
          </Button >
        </Group>
      <Grid grow mb={30}>
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            h={"100%"}
            mb={"12px"}
          >
            <Card.Section component="a">
              <Table.ScrollContainer minWidth={500}>
                <Table striped highlightOnHover verticalSpacing="5px">
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>#No</Table.Th>
                      <Table.Th>Title</Table.Th>
                      <Table.Th>First Name</Table.Th>
                      <Table.Th>Middle Name</Table.Th>
                      <Table.Th>Last Name</Table.Th>
                      <Table.Th>Gender</Table.Th>
                      <Table.Th>Age</Table.Th>
                      <Table.Th>Position</Table.Th>
                      <Table.Th>Hire Date</Table.Th>
                      <Table.Th>Current Salary</Table.Th>
                      <Table.Th>Status</Table.Th>
                      <Table.Th>Photo</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>{rows}</Table.Tbody>
                </Table>
              </Table.ScrollContainer>
            </Card.Section>
          </Card>
        </Grid.Col>
      </Grid>
    </Container>
          <Modal
          opened={createEmployeeMdl}
          onClose={() => {
            setCreateEmployeeMdl(false);
          }}
          title="Employee Registrationt"
          size={"md"} // Predefined size (sm, md, lg, xl)
          styles={{
            title: {
              textAlign: "center", // Center the title text
              width: "100%",
            },
          }}
        >
          <EmployeeRegistration onClose={() => setCreateEmployeeMdl(true)}
          />
        </Modal>
    </>
  );
};

export default Employee;
