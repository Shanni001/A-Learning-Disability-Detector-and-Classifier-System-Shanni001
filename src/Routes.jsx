import React from "react";
import { Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import MultiRoleDashboard from "./pages/multi-role-dashboard";
import AssessmentPortal from "./pages/assessment-portal";
import SchoolIntegrationHub from "./pages/school-integration-hub";
import ReportAnalytics from "./pages/report-analytics";
import ProgressVisualization from "./pages/progress-visualization";
import ResourceCenter from "./pages/resource-center";
import Homepage from "./pages/home-page";
import Registration from "./pages/registration";
import Login from "./pages/login";
import AuthCallback from './pages/auth/AuthCallback';
import ForgotPassword from 'pages/forgot-password/ForgotPassword';
import ResetPassword from 'pages/reset-password/ResetPassword';




const Routes = () => {
  return (
    <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Public Routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
       
        <Route path="/auth/callback" element={<AuthCallback />} />


        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />


        {/* Dashboards */}
       

        {/* Other Modules */}
        <Route path="/multi-role-dashboard" element={<MultiRoleDashboard />} />
        <Route path="/assessment-portal" element={<AssessmentPortal />} />
        <Route path="/school-integration-hub" element={<SchoolIntegrationHub />} />
        <Route path="/report-analytics" element={<ReportAnalytics />} />
        <Route path="/progress-visualization" element={<ProgressVisualization />} />
        <Route path="/resource-center" element={<ResourceCenter />} />

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
    </ErrorBoundary>
  );
};

export default Routes;
