import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./Layout/Navbar";
import FormGenerator from "./components/FormGenerator/FormGenerator";
import { mockObj_login, mockObj_registration } from "./mockObjects/mockObjects";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index path="mock1" />
          <Route
            path="mock1"
            element={<FormGenerator dataObject={mockObj_registration} />}
          />
          <Route
            path="mock2"
            element={<FormGenerator dataObject={mockObj_login} />}
          />
        </Route>
      </Routes>
      <Outlet />
    </BrowserRouter>
  );
}

export default App;
