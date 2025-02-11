import React, { useState, useEffect } from "react";
import {
  TextInput,
  Textarea,
  FileInput,
  Button,
  Grid,
  Paper,
  Image,
} from "@mantine/core";
import { ContactOutput } from "../../types/contentType";
import { useForm } from "@mantine/form";
import { useAppDispatch } from "../../hooks/hooks";
import toast from "react-hot-toast";
// import { updateImageAction } from "../../features/imageSlice";
import { updateContactAction } from "../../features/contactSlice";

export interface UpdateProps {
  selectedItem: ContactOutput;
  onClose: (isOpened: boolean) => void;
}

const ContactUpdate: React.FC<UpdateProps> = ({
  selectedItem,
  onClose,
}) => {
    console.log("updated contacyt", selectedItem);
    
  const dispatch = useAppDispatch();
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  console.log(image);
  
  // Initialize form with selectedItem data
  const form = useForm({
    initialValues: {
        company_name: selectedItem.company_name || "",
        email_address: selectedItem.email_address || "",
        office_full_address: selectedItem.office_full_address || "",
        phone_number: selectedItem.phone_number || "",
        description: selectedItem.description || "",
        image: null as File | null,
    },
  });

  // UseEffect to update the preview state when selectedItem changes
  useEffect(() => {
    if (selectedItem.image) {
      setPreview(selectedItem.image); // Assuming it's a file path
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
    formData.append("company_name", values.company_name);
    formData.append("email_address", values.email_address);
    formData.append("office_full_address", values.office_full_address);
    formData.append("phone_number", values.phone_number);
    formData.append("description", values.description);

    if (values.image) {
      formData.append("image", values.image); // File object
    }

    formData.append("id", selectedItem.id); // Append new image if provided

    try {
    console.log("Submitting form data:", [...formData.entries()]);
      await dispatch(updateContactAction(formData)).unwrap();
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
          {/* company name */}
          <Grid.Col span={12}>
            <TextInput
              label="Company Name"
              key={form.key("company_name")}
              {...form.getInputProps("company_name")}
            />
          </Grid.Col>
          {/* email address */}
          <Grid.Col span={12}>
            <TextInput
              label="Email Address"
              key={form.key("email_address")}
              {...form.getInputProps("email_address")}
            />
          </Grid.Col>
          {/* phone number */}
          <Grid.Col span={12}>
            <TextInput
              label="Phone Number"
              key={form.key("phone_number")}
              {...form.getInputProps("phone_number")}
            />
          </Grid.Col>
          
          {/* office address */}
          <Grid.Col span={12}>
            <Textarea
              label="Full office Address"
              key={form.key("office_full_address")}
              {...form.getInputProps("office_full_address")}
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

export default ContactUpdate