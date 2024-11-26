import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootLayout from "@/routes/RootLayout";
import UserRoutes from "@/routes/UserRoutes";
import NotFound from "@/components/layout/error/NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Route Layout */}
        <Route element={<RootLayout />}>
          {UserRoutes}

          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
