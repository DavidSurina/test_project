import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Layout/Navbar";
import FormGenerator from "./components/FormGenerator/FormGenerator";

import { mockObj_registration } from "./globals/mockObjects";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route
            path="mock1"
            element={<FormGenerator dataObject={mockObj_registration} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
