import {
  Button,
  FileInput,
  Grid,
  Image,
  Paper,
  Select,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";

type createContactProps = {
  onClose: (isOpened: boolean) => void;
};
const EmployeeRegistration = (props: createContactProps) => {

    const genderOption = [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
      ];
  // Form validation
  const form = useForm({
    initialValues: {
      id: "",
      title: "",
      firstName: "",
      middleName: "",
      lastName: "",
      gender: "",
      age: "",
      position: "",
      hireDate: "",
      salary: "",
      status: "",
      photo: null as File | null,
    },

    validate: {
      title: (value) => (value.length < 2 ? "lastName must required" : null),
      firstName: (value) =>
        value.length < 2 ? "lastName must required" : null,
      middleName: (value) =>
        value.length < 2 ? "lastName must required" : null,
      lastName: (value) => (value.length < 2 ? "lastName must required" : null),

      gender: (value) => (value.length < 2 ? "lastName must required" : null),
      age: (value) =>
        value.length < 2 ? "lastName must required" : null,
      position: (value) =>
        value.length < 2 ? "lastName must required" : null,
      hireDate: (value) => (value.length < 2 ? "lastName must required" : null),
    },
  });

  const [preview, setPreview] = useState<string | null>(null);

  const handleSubmit = (values: any) => {
    const created_by = "Admin";
    // Create FormData object
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("firstName", values.firstName);
    formData.append("middleName", values.middleName);
    formData.append("lastName", values.lastName);
    formData.append("created_by", created_by);

    if (values.image) {
      formData.append("image", values.image); // File object
    }

    console.log("Submitting form data:", [...formData.entries()]);
    // Dispatch the action (createContentAction should support FormData)
    // dispatch(createContentAction(formData));
    props.onClose(true);
  };

  const handleImageChange = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          setPreview(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
    form.setFieldValue("image", file);
  };

  return (
    <>
      <Paper>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Grid>
            <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
              <TextInput
                label="title"
                key={form.key("title")}
                {...form.getInputProps("title")}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
              <TextInput
                label="firstName"
                key={form.key("firstName")}
                {...form.getInputProps("firstName")}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
              <TextInput
                label="middleName"
                key={form.key("middleName")}
                {...form.getInputProps("middleName")}
              />
            </Grid.Col>
            
          <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
              <Select
                label="Content Type"
                data = {genderOption}
                key={form.key('content_type')}
                {...form.getInputProps("content_type")}
              />
            </Grid.Col>
            {/* Display Place - Hidden when LOCATION is selected */}
            <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
              <Select
                label="Display Place"
                key={form.key('display_place')}
                {...form.getInputProps("display_place")}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
              <Textarea
                label="lastName"
                key={form.key("lastName")}
                {...form.getInputProps("lastName")}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
              <FileInput
                label="Upload Image"
                placeholder="Select an image"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
            </Grid.Col>
            {preview && (
              <Grid.Col span={12}>
                <Image src={preview} alt="Image Preview" mt="md" radius="md" />
              </Grid.Col>
            )}
          </Grid>
          <Button fullWidth mt="xl" type="submit">
            Register
          </Button>
        </form>
      </Paper>
    </>
  );
};

export default EmployeeRegistration;
