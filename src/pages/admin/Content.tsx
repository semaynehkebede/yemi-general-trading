import React, { useState } from "react";
import { useForm } from "@mantine/form";
import {
  Button,
  Container,
  Group,
  Paper,
  TextInput,
  Title,
  Image,
  FileInput,
  Text,
  Grid,
  Card,
  Select,
  Textarea,
} from "@mantine/core";
import { useAppDispatch } from "../../hooks/hooks";
import {createContentAction} from "../../features/contentSlice"
type createUserProps = {
  onClose: (isOpened: boolean) => void;
};
const Content = (props: createUserProps) => {
  const [preview, setPreview] = useState<string | null>(null);

  // Form validation
  const form = useForm({
    initialValues: {
      contentName: "",
      description: "",
      displayPlace: "",
      contentType: "",
      image: null as File | null,
    },

    validate: {
      contentName: (value) => 
        value.length < 2 ? "Name must required" : null,
      description: (value) =>
        value.length < 2 ? "Description must required" : null,
      displayPlace: (value) =>
        value.length < 2 ? "Display Place must be required" : null,
      contentType: (value) =>
        value.length < 6 ? "contentType Place must be required" : null,
    },
  });

  const dispatch = useAppDispatch();
  const handleSubmit = (values: any) => {
    console.log("on form values", values);
    
    const created_by = "Admin";
    const contentInfo = { ...values, created_by };
    console.log("contentInfo", contentInfo);
    dispatch(createContentAction(contentInfo));
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
              <TextInput label="Name" {...form.getInputProps("contentName")} />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
              <Select
                label="Content Type"
                data = {[
                  { value: "EthiopianOriginExports", label: "Ethiopian Origin Exports" },
                  { value: "GlobalImportstoEastAfrica", label: "Global Imports to East Africa" },
                  { value: "ComprehensiveTradeServices", label: "Comprehensive Trade Services" },
                  { value: "ABOUT", label: "About" },
                  { value: "LOCATION", label: "Location" },
                  { value: "OTHER", label: "Other" }
                ]}
                {...form.getInputProps("contentType")}
              />
            </Grid.Col>
            
            <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
              <Select
                label="Display Place"
                data = {[
                  { value: "ABOUT", label: "About" },
                  { value: "HOME", label: "Home" },
                  { value: "SERVICE", label: "Service" },
                  { value: "HEADER", label: "Header" }
                ]}
                {...form.getInputProps("displayPlace")}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
              <Textarea
                label="Description"
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

export default Content;
