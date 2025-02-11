import { Button, FileInput, Grid, Image, Paper, Select, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { createAboutAction } from "../../features/aboutSlice";
import { useAppDispatch } from "../../hooks/hooks";
import toast from "react-hot-toast";

type createUserProps = {
    onClose: (isOpened: boolean) => void;
  };
  const AboutContent = (props: createUserProps) => {
  const dispatch = useAppDispatch();
    const [displayPlaceOptions] = useState([
      { value: "home", label: "Home" },
      { value: "about", label: "About" },
    ]);
  
    // Form validation
    const form = useForm({
      initialValues: {
        display_place: "",
        description: "",
        image: null as File | null,
      },
  
      validate: {
        description: (value) =>
          value.length < 2 ? "Description must required" : null,
        display_place: (value) =>
          value.length < 2 ? "Display place is required" : null,
      },
    });
  
    const [preview, setPreview] = useState<string | null>(null);
  
    const handleSubmit = async (values: any) => {
      const created_by = "Admin";
      const formData = new FormData();
      formData.append("description", values.description);
      formData.append("display_place", values.display_place); // Raw string
      formData.append("created_by", created_by);
  
      if (values.image) {
        formData.append("image", values.image); // File object
      }
      console.log("Submitting form data:", [...formData.entries()]);
      try {
        await dispatch(createAboutAction(formData)).unwrap();
        toast.success("Data saved successfully!"); // Show success notification
        props.onClose(false); // Close the modal
      } catch (error) {
        toast.error("Failed to save Data. Please try again!"); // Show error notification
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
                  label="Display Place"
                  data={displayPlaceOptions}
                  key={form.key("display_place")}
                  {...form.getInputProps("display_place")}
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

export default AboutContent