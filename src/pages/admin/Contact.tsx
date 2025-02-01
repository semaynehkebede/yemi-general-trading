import {
  Button,
  FileInput,
  Grid,
  Image,
  Paper,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import toast from "react-hot-toast";
import { createContactAction } from "../../features/contactSlice";
import { useAppDispatch } from "../../hooks/hooks";

type createContactProps = {
  onClose: (isOpened: boolean) => void;
};
const Contact = (props: createContactProps) => {
    const dispatch = useAppDispatch();
  // Form validation
  const form = useForm({
    initialValues: {
      companyName: "",
      emailAddress: "",
      phoneNumber: "",
      officeFullAddress: "",
      description: "",
      image: null as File | null,
    },

    validate: {
      companyName: (value) => 
        value.length < 2 ? "You must provide organization name" : null,
      emailAddress: (value) =>
        value.length < 2 ? "Description must required" : null,
      phoneNumber: (value) =>
        value.length < 2 ? "Description must required" : null,
      officeFullAddress: (value) =>
        value.length < 2 ? "Description must required" : null,
      description: (value) =>
        value.length < 2 ? "Description must required" : null,
    },
  });

  const [preview, setPreview] = useState<string | null>(null);

  const handleSubmit = async (values: any) => {
    const created_by = "Admin";
    // Create FormData object
    const formData = new FormData();
    formData.append("companyName", values.companyName);
    formData.append("emailAddress", values.emailAddress);
    formData.append("phoneNumber", values.phoneNumber);
    formData.append("officeFullAddress", values.officeFullAddress);
    formData.append("description", values.description);
    formData.append("created_by", created_by);

    if (values.image) {
      formData.append("image", values.image); // File object
    }

    console.log("Submitting form data:", [...formData.entries()]);

    try {
      await dispatch(createContactAction(formData)).unwrap();
      toast.success("You saved successfully!"); // Show success notification
      props.onClose(false); // Close the modal
    } catch (error) {
      toast.error("Failed to save. Please try again!"); // Show error notification
    }
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
                label="Company Name"
                key={form.key("companyName")}
                {...form.getInputProps("companyName")}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
              <TextInput
                label="Email Address"
                key={form.key("emailAddress")}
                {...form.getInputProps("emailAddress")}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
              <TextInput
                label="Phone Number"
                key={form.key("phoneNumber")}
                {...form.getInputProps("phoneNumber")}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
              <TextInput
                label="Office Full Address"
                key={form.key("officeFullAddress")}
                {...form.getInputProps("officeFullAddress")}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
              <Textarea
                label="Description"
                key={form.key("description")}
                {...form.getInputProps("description")}
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
export default Contact;
