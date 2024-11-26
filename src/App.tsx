import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { Layout } from "./pages/Layout";
import Service from "./pages/Service";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import AdminLayout from "./pages/admin/AdminLayout";
import Content from "./pages/admin/Content";
import ContentList from "./pages/admin/ContentList";

function App() {
  let user = 0;
  return (
    <BrowserRouter>
      <Routes>
        {/* Wrap the main routes with Layout */}
        <Route element={ user === 0 ? <Layout /> : <AdminLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/service" element={<Service />} />
          <Route path="/about" element={<About />} /> {/* Fix typo here */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/manage/content" element={<ContentList />} />
          <Route path="/manage/employee" element={<ContentList />} />
        </Route>

        {/* Catch-all for 404 pages */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
