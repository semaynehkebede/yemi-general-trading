import React, { useState, useEffect } from "react";
import {
  TextInput,
  Select,
  Textarea,
  FileInput,
  Button,
  Grid,
  Paper,
  Image,
} from "@mantine/core";
import { ContentResponse } from "../../types/contentType";
import { useForm } from "@mantine/form";
import { useAppDispatch } from "../../hooks/hooks";
import toast from "react-hot-toast";
import { updateServiceAction } from "../../features/serviceSlice";

export interface UpdateContentProps {
  selectedItem: ContentResponse;
  onClose: (isOpened: boolean) => void;
}

const ContentUpdate: React.FC<UpdateContentProps> = ({
  selectedItem,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  console.log("update content", selectedItem);

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  console.log(image);
  
  // Initialize form with selectedItem data
  const form = useForm({
    initialValues: {
      service_name: selectedItem.service_name || "",
      service_type: selectedItem.service_type || "",
      // content_type: selectedItem.content_type || "",
      display_place: selectedItem.display_place || "",
      description: selectedItem.description || "",
      image: null as File | null,
    },
  });

  // UseEffect to update the preview state when selectedItem changes
  useEffect(() => {
    if (selectedItem.image) {
      setPreview(`data:image/png;base64,${selectedItem.image}`); // Assuming it's a file path
    }
  }, [selectedItem]); // Runs whenever selectedItem changes

  // Handle image preview on file selection
  const handleImageChange = (file: File | null) => {
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string); // Update preview when file is selected
      };
      reader.readAsDataURL(file);
      form.setFieldValue("image", file); // File object now matches updated type
    } else {
      // Clear image if file input is null (i.e., user clears the file)
      setImage(null);
      setPreview(null);
    }
  };

  // Handle form submission for updating content
  const handleSubmit = async (values: any) => {
    const formData = new FormData();
    formData.append("service_name", values.service_name);
    formData.append("service_type", values.service_type);
    formData.append("display_place", values.display_place);
    formData.append("description", values.description);

    if (values.image) {
      formData.append("image", values.image); // File object
    }

    formData.append("id", selectedItem.id); // Append new image if provided

    try {
    console.log("Submitting form data:", [...formData.entries()]);
      await dispatch(updateServiceAction(formData)).unwrap();
      toast.success("Updated successfully!"); // Show success notification
      onClose(false); // Close the modal
    } catch (error) {
      toast.error("Failed to Update. Please try again!"); // Show error notification
    }
  };

  return (
    <Paper>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid>
          {/* Content Name */}
          <Grid.Col span={12}>
            <TextInput
              label="Service Name"
              key={form.key("service_name")}
              {...form.getInputProps("service_name")}
            />
          </Grid.Col>

          {/* Content Type */}
          <Grid.Col span={12}>
            <Select
              label="Service Type"
              key={form.key("service_type")}
              data={[
                {
                  value: "EthiopianOriginExports",
                  label: "Ethiopian Origin Exports",
                },
                {
                  value: "GlobalImportstoEastAfrica",
                  label: "Global Imports to East Africa",
                },
                {
                  value: "ComprehensiveTradeServices",
                  label: "Comprehensive Trade Services",
                },
                { value: "ABOUT", label: "About" },
                { value: "LOCATION", label: "Location" },
                { value: "OTHER", label: "Other" },
              ]}
              {...form.getInputProps("service_type")}
            />
          </Grid.Col>

          {/* Display Place */}
          <Grid.Col span={12}>
            <Select
              label="Display Place"
              key={form.key("display_place")}
              data={[
                { value: "home", label: "Home" },
                { value: "service", label: "Service" },
              ]}
              {...form.getInputProps("display_place")}
            />
          </Grid.Col>
          {/* Description */}
          <Grid.Col span={12}>
            <Textarea
              label="Description"
              key={form.key("description")}
              {...form.getInputProps("description")}
            />
          </Grid.Col>

          {/* Image Upload */}
          <Grid.Col span={12}>
            <FileInput
              label="Upload Image"
              placeholder="Select an image"
              accept="image/*"
              onChange={handleImageChange}
            />
          </Grid.Col>

          {/* Image Preview */}
          {preview && (
            <Grid.Col span={12}>
              <Image src={preview} alt="Image Preview" mt="md" radius="md" />
            </Grid.Col>
          )}
        </Grid>

        <Button fullWidth mt="xl" type="submit">
          Update
        </Button>
      </form>
    </Paper>
  );
};

export default ContentUpdate;
