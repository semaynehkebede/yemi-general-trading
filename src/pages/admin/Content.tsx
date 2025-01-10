import React, { useEffect, useState } from "react";
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
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {createContentAction, fetchContentThunk} from "../../features/contentSlice"
import { RootState } from "../../app/store";
type createUserProps = {
  onClose: (isOpened: boolean) => void;
};
const Content = (props: createUserProps) => {
  
  const dispatch = useAppDispatch();
  const contents = useAppSelector((state: RootState) => state.content);

  // Filter the contents where content_type === "ABOUT"
  const aboutContents = contents.content.filter(
    (content: any) => content.content_type === "ABOUT"
  );
  const locationContents = contents.content.filter(
    (content: any) => content.content_type === "LOCATION"
  );
  const serviceContents = contents.content.filter(
    (content: any) =>
      content.content_type === "EthiopianOriginExports" ||
      content.content_type === "GlobalImportstoEastAfrica" ||
      content.content_type === "ComprehensiveTradeServices"
  );
  const ethiopianOriginExportsContents = contents.content.filter(
    (content: any) => content.content_type === "EthiopianOriginExports"
  );
  const globalImportstoEastAfricaContents = contents.content.filter(
    (content: any) => content.content_type === "GlobalImportstoEastAfrica"
  );
  const comprehensiveTradeServicesContents = contents.content.filter(
    (content: any) => content.content_type === "ComprehensiveTradeServices"
  );
  const otherContents = contents.content.filter(
    (content: any) => content.content_type === "OTHER"
  );
  const [modalOpened, setModalOpened] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectdContent, setSelectdContent] = useState<any>();

  useEffect(() => {
    console.log("about content", aboutContents);
    console.log("a content", contents);

    dispatch(fetchContentThunk());
  }, []);
  const [preview, setPreview] = useState<string | null>(null);


  const [isLocationSelected, setIsLocationSelected] = useState(false);
  const [isAboutSelected, setIsAboutSelected] = useState(false);
    // Conditionally filter out "Location" if locationContents has data
    const contentOptions = [
      { value: "EthiopianOriginExports", label: "Ethiopian Origin Exports" },
      { value: "GlobalImportstoEastAfrica", label: "Global Imports to East Africa" },
      { value: "ComprehensiveTradeServices", label: "Comprehensive Trade Services" },
      ...(aboutContents.length < 2
        ? [{ value: "ABOUT", label: "About" }] // Only include "Location" if no content of type "LOCATION"
        : []),
      ...(locationContents.length === 0
        ? [{ value: "LOCATION", label: "Location" }] // Only include "Location" if no content of type "LOCATION"
        : []),
      { value: "slider", label: "Slider Image" },
      { value: "OTHER", label: "Other" },
    ];
    const [displayPlaceOptions, setDisplayPlaceOptions] = useState([
      { value: "ABOUT", label: "About" },
      { value: "HOME", label: "Home" },
      { value: "SERVICE", label: "Service" },
      { value: "HEADER", label: "Header" },
      { value: "CONTACT", label: "Contact" }
    ]);
  // Form validation
  const form = useForm({
    initialValues: {
      content_name: "",
      description: "",
      display_place: "",
      content_type: "",
      image: null as File | null,
    },

    validate: {
      content_name: (value) =>
        !(isLocationSelected || isAboutSelected) && value.length < 2 ? "Name is required" : null,
      description: (value) =>
        value.length < 2 ? "Description must required" : null,
      display_place: (value) =>
        !isLocationSelected && value.length < 2 ? "Display place is required" : null,
      content_type: (value) =>
        value.length < 3 ? "content_type Place must be required" : null,
    },
  });
   // Adjust validation based on content_type selection
   useEffect(() => {
    const selectedContentType = form.values.content_type;

    if (selectedContentType === "LOCATION") {
      setIsLocationSelected(selectedContentType === "LOCATION");
    }
    else if(selectedContentType === "slider"){
      setDisplayPlaceOptions([
        { value: "ABOUT", label: "About" },
        { value: "HOME", label: "Home" },
        { value: "SERVICE", label: "Service" },
        { value: "CONTACT", label: "Contact" },
      ]);
    }
    else if(selectedContentType === "EthiopianOriginExports"){
      setDisplayPlaceOptions([
        { value: "HOME", label: "Home" },
        { value: "SERVICE", label: "Service" },
      ]);
    }
    else if(selectedContentType === "GlobalImportstoEastAfrica"){
      setDisplayPlaceOptions([
        { value: "HOME", label: "Home" },
        { value: "SERVICE", label: "Service" },
      ]);
    }
    else if(selectedContentType === "ComprehensiveTradeServices"){
      setDisplayPlaceOptions([
        { value: "HOME", label: "Home" },
        { value: "SERVICE", label: "Service" },
      ]);
    }
    else if(selectedContentType === "ABOUT"){
      setIsAboutSelected(selectedContentType === "ABOUT")
      setDisplayPlaceOptions([
        { value: "ABOUT", label: "About" },
        { value: "HOME", label: "Home" },
      ]);
    }
    else {
      setDisplayPlaceOptions([
        { value: "ABOUT", label: "About" },
        { value: "HOME", label: "Home" },
        { value: "SERVICE", label: "Service" },
        { value: "HEADER", label: "Header" },
        { value: "CONTACT", label: "Contact" },
      ]);
    }
  }, [form.values.content_type]);
  
  const handleSubmit = (values: any) => {
    const created_by = "Admin";

    // Create FormData object
    const formData = new FormData();
    formData.append("content_name", values.content_name);
    formData.append("description", values.description);
    formData.append("display_place", values.display_place); // Raw string
    formData.append("content_type", values.content_type);   // Raw string
    formData.append("created_by", created_by);

    if (values.image) {
        formData.append("image", values.image); // File object
    }

    console.log("Submitting form data:", [...formData.entries()]);
    // Dispatch the action (createContentAction should support FormData)
    dispatch(createContentAction(formData));
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
            
          <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
              <Select
                label="Content Type"
                data = {contentOptions}
                key={form.key('content_type')}
                {...form.getInputProps("content_type")}
              />
            </Grid.Col>
            {/* Display Place - Hidden when LOCATION is selected */}
            {!isLocationSelected && (
            <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
              <Select
                label="Display Place"
                data = {displayPlaceOptions}
                key={form.key('display_place')}
                {...form.getInputProps("display_place")}
              />
            </Grid.Col>
            )}
            {/* Content Name - Hidden when LOCATION is selected */}
            {!isLocationSelected || !isAboutSelected && (
            <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
              <TextInput label="Name"  key={form.key('content_name')} {...form.getInputProps("content_name")} />
            </Grid.Col>
            )}
            <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
              <Textarea
                label="Description"
                key={form.key('description')}
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
