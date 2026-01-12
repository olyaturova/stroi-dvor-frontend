import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense } from "react";
import { Loader } from "@/shared/ui/loader";
import { Home } from "@/pages/home";
import { FeedbackForm } from "@/features/feedback-form";
import { Stocks } from "@/pages/stocks";
import { StocksDetails } from "@/pages/stocks-details";
import { Daily } from "@/pages/daily";
import { Promos } from "@/pages/promos";
import { Shop } from "@/pages/shop";
import { ShopItemDetails } from "@/pages/shop-item-details";
import { PrivacyPolicy } from "@/pages/privacy-policy";
import AdminDashboard from "@/pages/admin-dashboard";
import { Footer } from "@/widgets/footer";
import { AdminLogin } from "@/pages/admin-login";
import { Layout } from "@/widgets/layout";
import { ProtectedRoute } from "@/shared/routing/protected-route";

export const AppRouter = () => (
  <Suspense fallback={<Loader />}>
    <Routes>
  
        <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<FeedbackForm />} />
        <Route path="/stocks" element={<Stocks />} />
        <Route path="/stocks/:title" element={<StocksDetails />} />
        <Route path="/daily" element={<Daily />} />
        <Route path="/promos" element={<Promos />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:id" element={<ShopItemDetails />} />
        <Route path="/contacts" element={<Footer />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
      </Route>


      <Route path="/admin/login" element={<AdminLogin />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Route>
      <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
    </Routes>
  </Suspense>
);