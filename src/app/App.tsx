import { Route, Routes } from "react-router-dom"

import ConstructorPage from "@/pages/constructor/ui/ConstructorPage"
import AboutPage from "@/pages/about/ui/AboutPage"
import CatalogPage from "@/pages/catalog/ui/CatalogPage"
import AdminPage from "@/pages/admin/ui/AdminPage"
import { Navbar } from "@/widgets/Navbar"
import { AppRoutes } from "@/app/routes/routes"
import { RequestFormModal } from "@/widgets/RequestFormModal/ui/RequestFormModal"


function App() {

  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path={AppRoutes.Home} element={<AboutPage />} />
          <Route path={AppRoutes.Constructor} element={<ConstructorPage />} />
          <Route path={AppRoutes.Catalog} element={<CatalogPage />} />
          <Route path={AppRoutes.Admin} element={<AdminPage />} />
        </Routes>
      </main>
      <RequestFormModal />
    </>
  )
}

export default App
