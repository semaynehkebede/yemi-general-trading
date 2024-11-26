import Content from "../pages/admin/Content";

interface Content{
    contentName:string;
    description: string;
    displayPlace: string;
    contentType: string;
    image: string

}
interface ContentState {
    content: Content[];
    // count : number,
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
  }

  export type { Content, ContentState };