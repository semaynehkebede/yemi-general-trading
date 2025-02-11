import Content from "../pages/admin/Content";
interface ImageInput {
  image_type: string;
  description: string;
  image: string;
}
interface ImageOutput {
  id: string;
  image_type: string;
  description: string;
  file_name: string;
  file_path: string;
  file_type: string;
  unique_identifier: string;
  uploaded_at: string;
  image: string;
}

interface AboutInput {
  display_place: string;
  description: string;
  image: string;
}

interface AboutOutput {
  id: string;
  display_place: string;
  description: string;
  file_name: string;
  file_path: string;
  file_type: string;
  unique_identifier: string;
  uploaded_at: string;
  image: string;
}

interface ServiceInput {
  service_type: string;
  service_name: string;
  display_place: string;
  description: string;
  image: string;
}

interface ServiceOutput {
  id: string;
  service_type: string;
  service_name: string;
  display_place: string;
  description: string;
  file_name: string;
  file_path: string;
  file_type: string;
  unique_identifier: string;
  uploaded_at: string;
  image: string;
}
interface ContactInput {
  company_name: string;
  email_address: string;
  phone_number: string;
  office_full_address: string;
  description: string;
  image: string;
}
interface ContactOutput {
  id: string;
  company_name: string;
  email_address: string;
  phone_number: string;
  office_full_address: string;
  description: string;
  file_name: string;
  file_path: string;
  file_type: string;
  unique_identifier: string;
  uploaded_at: string;
  image: string;
}


interface Content {
  id: string;
  content_name: string;
  description: string;
  display_place: string;
  content_type: string;
  image: string;
}
interface ContentResponse {
  id: string;
  service_name: string;
  description: string;
  display_place: string;
  service_type: string;
  file_name: string;
  file_path: string;
  file_type: string;
  unique_identifier: string;
  uploaded_at: string;
  image: string;
}

interface ImageState {
  image: ImageOutput[];
  isLoading: boolean;
}

interface AboutState {
  aboutContent: AboutOutput[];
  isLoading: boolean;
}

interface ServiceState {
  serviceCont: ServiceOutput[];
  isLoading: boolean;
}

interface ContactState {
  contact: ContactOutput;
  isLoading: boolean;
}
interface ContentState {
  content: ContentResponse[];
  isLoading: boolean;
}

interface User {
  id: string;
  name: string;
  role: string;
  token: string;
}

interface Credentials {
  username: string;
  password: string;
}

interface LoginState {
  currentUser: User | null;
  loading: boolean;
  error: string | null;
}
interface LogUserInfo {
  token: {
    access: string;
    refresh: string;
  };
  userId: number;
  userName: string;
  role: boolean
}

export type {
  Content,
  ContentState,
  ContentResponse,
  ImageState,
  ImageInput,
  ImageOutput,
  AboutInput,
  AboutOutput,
  AboutState,
  ServiceInput,
  ServiceOutput,
  ServiceState,
  ContactInput,
  ContactOutput, ContactState,
  Credentials,
  LoginState,
  User,
  LogUserInfo
};
