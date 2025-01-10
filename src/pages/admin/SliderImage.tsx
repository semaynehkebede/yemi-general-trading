import {
  Button,
  FileInput,
  Grid,
  Image,
  Paper,
  Select,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { createImageAction } from "../../features/imageSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { Notification, rem } from "@mantine/core";
import { RootState } from "../../app/store";

type createSliderProps = {
  onClose: (isOpened: boolean) => void;
};
const SliderImage = (props: createSliderProps) => {
  const dispatch = useAppDispatch();
  const sliderImage = useAppSelector((state: RootState) => state.imageContent);
  const homeSliderImage = sliderImage.image.filter(
    (image: any) => image.image_type === "home"
  );
  const serviceSliderImage = sliderImage.image.filter(
    (image: any) => image.image_type === "service"
  );
  const aboutSliderImage = sliderImage.image.filter(
    (image: any) => image.image_type === "about"
  );
  const contactSliderImage = sliderImage.image.filter(
    (image: any) => image.image_type === "contact"
  );
  const imageOptions = [
    ...(homeSliderImage.length >= 2 ? [] : [{ value: "home", label: "Home" }]),
    ...(serviceSliderImage.length >= 2
      ? []
      : [{ value: "service", label: "Service" }]),
    ...(aboutSliderImage.length >= 2
      ? []
      : [{ value: "about", label: "About" }]),
    ...(contactSliderImage.length >= 1
      ? []
      : [{ value: "contact", label: "Contact" }]),
  ];
  // Form validation
  const form = useForm({
    initialValues: {
      image_type: "",
      description: "",
      image: null as File | null,
    },

    validate: {
      image_type: (value) =>
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
    formData.append("image_type", values.image_type);
    formData.append("description", values.description);
    formData.append("created_by", created_by);
    if (values.image) {
      formData.append("image", values.image); // File object
    }

    try {
      // Dispatch the action
      await dispatch(createImageAction(formData)).unwrap(); // Assuming the action is asynchronous and returns a promise
      // Show success notification
      <Notification color="green" title="Success">
        You saved successfully!"
      </Notification>;

      // Close the modal
      props.onClose(false);
    } catch (error) {
      // Show error notification
      <Notification color="red" title="Error">
        Failed to save. Please try again!"
      </Notification>;
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
              <Select
                label="Image Type"
                data={imageOptions}
                key={form.key("image_type")}
                {...form.getInputProps("image_type")}
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
export default SliderImage;
