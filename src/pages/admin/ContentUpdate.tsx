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
import axios from "axios";
import { ContentResponse } from "../../types/contentType";
import { useForm } from "@mantine/form";
import { useAppDispatch } from "../../hooks/hooks";
import { updateContentAction } from "../../features/contentSlice";

export interface UpdateContentProps {
  selectedItem: ContentResponse;
  onClose: (isOpened: boolean) => void;
}

const ContentUpdate: React.FC<UpdateContentProps> = ({
  selectedItem,
  onClose,
}) => {
  const dispatch = useAppDispatch();

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // Initialize form with selectedItem data
  const form = useForm({
    initialValues: {
      content_name: selectedItem.content_name || "",
      content_type: selectedItem.content_type || "",
      display_place: selectedItem.display_place || "",
      description: selectedItem.description || "",
      image: selectedItem.image || "", // Current image URL or path
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
    } else {
      // Clear image if file input is null (i.e., user clears the file)
      setImage(null);
      setPreview(null);
    }
  };

  // Handle form submission for updating content
  const handleSubmit = async (values: any) => {
    try {
      const formData = new FormData();
      formData.append("content_name", values.content_name);
      formData.append("content_type", values.content_type);
      formData.append("display_place", values.display_place);
      formData.append("description", values.description);
      if (image) {
        formData.append("image", image); // Append new image if provided
      }

      formData.append("id", selectedItem.id); // Append new image if provided
    console.log("Submitting form data:", [...formData.entries()]);
      // Update API endpoint (you may need to adjust the URL based on your backend API)
      // const response = await axios.put(`/api/update-content/${selectedItem.id}`, formData);
      const response = dispatch(updateContentAction(formData));

      console.log("Update Success:", response);

      // Close the modal after update success
      onClose(false);
    } catch (error) {
      console.error("Error updating content:", error);
    }
  };

  return (
    <Paper>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid>
          {/* Content Name */}
          <Grid.Col span={12}>
            <TextInput
              label="Content Name"
              key={form.key("content_name")}
              {...form.getInputProps("content_name")}
            />
          </Grid.Col>

          {/* Content Type */}
          <Grid.Col span={6}>
            <Select
              label="Content Type"
              key={form.key("content_type")}
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
              {...form.getInputProps("content_type")}
            />
          </Grid.Col>

          {/* Display Place */}
          <Grid.Col span={6}>
            <Select
              label="Display Place"
              key={form.key("display_place")}
              data={[
                { value: "ABOUT", label: "About" },
                { value: "HOME", label: "Home" },
                { value: "SERVICE", label: "Service" },
                { value: "HEADER", label: "Header" },
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
          Update Content
        </Button>
      </form>
    </Paper>
  );
};

export default ContentUpdate;
