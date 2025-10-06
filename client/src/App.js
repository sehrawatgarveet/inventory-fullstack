import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Dialog, DialogTitle, DialogContent, Typography, Button } from "@mui/material";
import Sidebar from "./components/Sidebar";
import DashboardStats from "./components/DashboardStats";
import ProductTable from "./components/ProductTable";
import ProductForm from "./components/ProductForm";
import CategoriesTable from "./components/CategoriesTable";
import UsersTable from "./components/UsersTable";
import ReportsSection from "./components/ReportsSection";
import SettingsSection from "./components/SettingsSection";

// Translations for multiple languages
export const translations = {
  en: {
    inventorySystem: "📦 Inventory Management System",
    totalProducts: "Total Products",
    lowStockItems: "Low Stock Items",
    totalInventoryValue: "Total Inventory Value",
    addProduct: "➕ Add Product",
    name: "Name",
    category: "Category",
    stock: "Stock",
    price: "Price",
    actions: "Actions",
    settings: "⚙️ Settings",
    lowStockThreshold: "Low Stock Threshold",
    rowsPerPage: "Rows per Page",
    language: "Language",
    exportCSV: "📤 Export Inventory CSV",
  },
  hi: {
    inventorySystem: "📦 इन्वेंटरी प्रबंधन प्रणाली",
    totalProducts: "कुल उत्पाद",
    lowStockItems: "कम स्टॉक आइटम",
    totalInventoryValue: "कुल इन्वेंटरी मूल्य",
    addProduct: "➕ नया उत्पाद जोड़ें",
    name: "नाम",
    category: "श्रेणी",
    stock: "स्टॉक",
    price: "मूल्य",
    actions: "क्रियाएँ",
    settings: "⚙️ सेटिंग्स",
    lowStockThreshold: "कम स्टॉक सीमा",
    rowsPerPage: "प्रति पृष्ठ पंक्तियाँ",
    language: "भाषा",
    exportCSV: "📤 इन्वेंटरी CSV निर्यात करें",
  },
  de: {
    inventorySystem: "📦 Inventarverwaltungssystem",
    totalProducts: "Gesamtprodukte",
    lowStockItems: "Wenig Lagerbestand",
    totalInventoryValue: "Gesamtwert des Inventars",
    addProduct: "➕ Produkt hinzufügen",
    name: "Name",
    category: "Kategorie",
    stock: "Bestand",
    price: "Preis",
    actions: "Aktionen",
    settings: "⚙️ Einstellungen",
    lowStockThreshold: "Niedrigbestand-Grenzwert",
    rowsPerPage: "Zeilen pro Seite",
    language: "Sprache",
    exportCSV: "📤 Inventar CSV exportieren",
  },
  fr: {
    inventorySystem: "📦 Système de gestion des stocks",
    totalProducts: "Produits totaux",
    lowStockItems: "Articles en rupture de stock",
    totalInventoryValue: "Valeur totale de l'inventaire",
    addProduct: "➕ Ajouter un produit",
    name: "Nom",
    category: "Catégorie",
    stock: "Stock",
    price: "Prix",
    actions: "Actions",
    settings: "⚙️ Paramètres",
    lowStockThreshold: "Seuil de faible stock",
    rowsPerPage: "Lignes par page",
    language: "Langue",
    exportCSV: "📤 Exporter l'inventaire CSV",
  }
};

function App() {
  const [products, setProducts] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [selectedSection, setSelectedSection] = useState("dashboard");
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("en"); // Default English

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/api/products");
    setProducts(res.data);
  };

  useEffect(() => { fetchProducts(); }, []);

  const renderContent = () => {
    switch (selectedSection) {
      case "dashboard":
        return (
          <Box>
            <DashboardStats
              products={products}
              darkMode={darkMode}
              toggleDarkMode={() => setDarkMode(!darkMode)}
              translations={translations[language]}
            />
            <Box sx={{ mt: 2 }}>
              <ProductTable
                products={products}
                refresh={fetchProducts}
                setOpenForm={setOpenForm}
                translations={translations[language]}
              />
            </Box>
            <Box sx={{ mt: 4 }}>
              <ReportsSection products={products} translations={translations[language]} />
            </Box>
          </Box>
        );
      case "products":
        return (
          <ProductTable
            products={products}
            refresh={fetchProducts}
            setOpenForm={setOpenForm}
            translations={translations[language]}
          />
        );
      case "categories":
        return <CategoriesTable products={products} translations={translations[language]} />;
      case "reports":
        return <ReportsSection products={products} translations={translations[language]} />;
      case "users":
        return <UsersTable translations={translations[language]} />;
      case "settings":
        return (
          <SettingsSection
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            language={language}
            setLanguage={setLanguage}
            translations={translations[language]}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        background: darkMode
          ? "linear-gradient(to right, #1e1e1e, #2c2c2c)"
          : "linear-gradient(to right, #f0f4f8, #d9e2ec)",
        color: darkMode ? "#fff" : "#000",
        transition: "0.3s",
      }}
    >
      <Sidebar selected={selectedSection} setSelected={setSelectedSection} />
      <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
        <Typography
          variant="h3"
          align="center"
          sx={{
            fontWeight: "bold",
            mb: 4,
            animation: "fadeInDown 1s",
            "@keyframes fadeInDown": {
              "0%": { opacity: 0, transform: "translateY(-30px)" },
              "100%": { opacity: 1, transform: "translateY(0)" }
            }
          }}
        >
          {translations[language].inventorySystem}
        </Typography>

        {(selectedSection === "dashboard" || selectedSection === "products") && (
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpenForm(true)}
            >
              {translations[language].addProduct}
            </Button>
          </Box>
        )}

        {renderContent()}

        <Dialog open={openForm} onClose={() => setOpenForm(false)} maxWidth="sm" fullWidth>
          <DialogTitle>{translations[language].addProduct}</DialogTitle>
          <DialogContent>
            <ProductForm onAdded={() => { fetchProducts(); setOpenForm(false); }} translations={translations[language]} />
          </DialogContent>
        </Dialog>
      </Box>
    </Box>
  );
}

export default App;
