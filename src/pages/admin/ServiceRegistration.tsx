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
import React, { useState } from "react";
import { createServiceAction } from "../../features/serviceSlice";
import { useAppDispatch } from "../../hooks/hooks";
import toast from "react-hot-toast";

type createUserProps = {
  onClose: (isOpened: boolean) => void;
};
const ServiceRegistration = (props: createUserProps) => {
  const dispatch = useAppDispatch();
  const serviceOptions = [
    { value: "EthiopianOriginExports", label: "Ethiopian Origin Exports" },
    {
      value: "GlobalImportstoEastAfrica",
      label: "Global Imports to East Africa",
    },
    {
      value: "ComprehensiveTradeServices",
      label: "Comprehensive Trade Services",
    },
    { value: "other", label: "Other" },
  ];
  const [displayPlaceOptions, setDisplayPlaceOptions] = useState([
    { value: "home", label: "Home" },
    { value: "service", label: "Service" },
  ]);

  // Form validation
  const form = useForm({
    initialValues: {
      service_name: "",
      description: "",
      display_place: "",
      service_type: "",
      image: null as File | null,
    },

    validate: {
      service_name: (value) => (value.length < 2 ? "Service Name is required" : null),
      description: (value) =>
        value.length < 2 ? "Description must required" : null,
      display_place: (value) =>
        value.length < 2 ? "Display place is required" : null,
      service_type: (value) =>
        value.length < 3 ? "service type Place must be required" : null,
    },
  });

  const [preview, setPreview] = useState<string | null>(null);

  const handleSubmit = async (values: any) => {
    const created_by = "Admin";
    // Create FormData object
    const formData = new FormData();
    formData.append("service_name", values.service_name);
    formData.append("description", values.description);
    formData.append("display_place", values.display_place); // Raw string
    formData.append("service_type", values.service_type); // Raw string
    formData.append("created_by", created_by);

    if (values.image) {
      formData.append("image", values.image); // File object
    }
    try {
      await dispatch(createServiceAction(formData)).unwrap();
      toast.success("Image saved successfully!"); // Show success notification
      props.onClose(false); // Close the modal
    } catch (error) {
      toast.error("Failed to save image. Please try again!"); // Show error notification
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
            <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
              <Select
                label="Service Type"
                data={serviceOptions}
                key={form.key("service_type")}
                {...form.getInputProps("service_type")}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
              <Select
                label="Display Place"
                data={displayPlaceOptions}
                key={form.key("display_place")}
                {...form.getInputProps("display_place")}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
              <TextInput
                label="Name"
                key={form.key("service_name")}
                {...form.getInputProps("service_name")}
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

export default ServiceRegistration;
