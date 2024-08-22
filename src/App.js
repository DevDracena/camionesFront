import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import Work from "./queries/works";
import Registration from "./registration";
import Queries from "./queries";
import Activity from "./registration/activity";
import Owner from "./registration/owner";
import OwnerQuery from "./queries/owners";
import { Login } from "./login";
import Inventario from "./queries/inventario/index";
import useInactivityTimeout from "./customHooks/inactivityHook"; // Asegúrate de tener la ruta correcta
import ProtectedRoute from "./components/ProtectedRoute"; // Asegúrate de tener la ruta correcta
import Products from "./registration/Products";
import Truks from "./queries/list Truk";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const location = useLocation();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const isLoginRoute = location.pathname === "/login";

  useInactivityTimeout(1800000); // 30 minutos

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {!isLoginRoute && !isAuthenticated && <Navigate to="/login" replace />}
          {!isLoginRoute && isAuthenticated && <Sidebar isSidebar={isSidebar} />}
          <main className="content">
            {!isLoginRoute && isAuthenticated && <Topbar setIsSidebar={setIsSidebar} />}
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/work" element={<ProtectedRoute><Work /></ProtectedRoute>} />
              <Route path="/team" element={<ProtectedRoute><Team /></ProtectedRoute>} />
              <Route path="/contacts" element={<ProtectedRoute><Contacts /></ProtectedRoute>} />
              <Route path="/invoices" element={<ProtectedRoute><Invoices /></ProtectedRoute>} />
              <Route path="/form" element={<ProtectedRoute><Form /></ProtectedRoute>} />
              <Route path="/registration" element={<ProtectedRoute><Registration /></ProtectedRoute>} />
              <Route path="/activity" element={<ProtectedRoute><Activity /></ProtectedRoute>} />
              <Route path="/owner" element={<ProtectedRoute><Owner /></ProtectedRoute>} />
              <Route path="/owner/query" element={<ProtectedRoute><OwnerQuery /></ProtectedRoute>} />
              <Route path="/queries" element={<ProtectedRoute><Queries /></ProtectedRoute>} />
              <Route path="/bar" element={<ProtectedRoute><Bar /></ProtectedRoute>} />
              <Route path="/pie" element={<ProtectedRoute><Pie /></ProtectedRoute>} />
              <Route path="/line" element={<ProtectedRoute><Line /></ProtectedRoute>} />
              <Route path="/faq" element={<ProtectedRoute><FAQ /></ProtectedRoute>} />
              <Route path="/calendar" element={<ProtectedRoute><Calendar /></ProtectedRoute>} />
              <Route path="/geography" element={<ProtectedRoute><Geography /></ProtectedRoute>} />
              <Route path="/Inventario" element={<ProtectedRoute><Inventario /></ProtectedRoute>} />
              <Route path="/Products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
              <Route path="/truks" element={<ProtectedRoute><Truks /></ProtectedRoute>} />


            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
