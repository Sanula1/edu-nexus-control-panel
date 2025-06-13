
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { Login } from "@/pages/Login";
import { InstituteSelection } from "@/pages/InstituteSelection";
import { ClassSelection } from "@/pages/ClassSelection";
import { Dashboard } from "@/pages/Dashboard";
import { Institutes } from "@/pages/Institutes";
import { Classes } from "@/pages/Classes";
import { Students } from "@/pages/Students";
import { Teachers } from "@/pages/Teachers";
import { Exams } from "@/pages/Exams";
import { Results } from "@/pages/Results";
import { AttendancePage } from "@/pages/Attendance";
import { Profile } from "@/pages/Profile";
import { RoleManagement } from "@/pages/RoleManagement";

const queryClient = new QueryClient();

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

const AppRoutes: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/institutes" element={<ProtectedRoute><InstituteSelection /></ProtectedRoute>} />
      <Route path="/classes" element={<ProtectedRoute><ClassSelection /></ProtectedRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/institutes-manage" element={<ProtectedRoute><Institutes /></ProtectedRoute>} />
      <Route path="/classes-manage"  element={<ProtectedRoute><Classes /></ProtectedRoute>} />
      <Route path="/students" element={<ProtectedRoute><Students /></ProtectedRoute>} />
      <Route path="/teachers" element={<ProtectedRoute><Teachers /></ProtectedRoute>} />
      <Route path="/exams" element={<ProtectedRoute><Exams /></ProtectedRoute>} />
      <Route path="/results" element={<ProtectedRoute><Results /></ProtectedRoute>} />
      <Route path="/attendance" element={<ProtectedRoute><AttendancePage /></ProtectedRoute>} />
      <Route path="/roles" element={<ProtectedRoute><RoleManagement /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/institutes" replace />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
