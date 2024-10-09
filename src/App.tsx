import React from 'react';
import { Route, Routes } from "react-router-dom";
import CharacterList from "./components/CharacterList";
import CharacterDetails from "./components/CharacterDetails";

const App: React.FC = () => (
  <Routes>
    <Route path="/" element={<CharacterList />} />
    <Route path="/character/:id" element={<CharacterDetails />} />
  </Routes>
);

export default App;
