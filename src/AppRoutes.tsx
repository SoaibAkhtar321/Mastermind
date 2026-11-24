import { MotionConfig } from 'motion/react';
import { Route, Routes } from 'react-router-dom';
import { EnquiryModalProvider } from './context/EnquiryModalContext';
import { QuickEnquiryModal } from './components/QuickEnquiryModal';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProgramPage } from './pages/ProgramPage';
import { LecturersPage } from './pages/LecturersPage';
import { TeacherProfilePage } from './pages/TeacherProfilePage';
import { FaqPage } from './pages/FaqPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { DataRightsPage } from './pages/DataRightsPage';
import { NotFoundPage } from './pages/NotFoundPage';

export function AppRoutes() {
  return (
    <MotionConfig reducedMotion="user">
      <EnquiryModalProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/competitive-exam-english-belagavi"
            element={<ProgramPage programId="competitive-exam-english" />}
          />
          <Route
            path="/spoken-english-classes-belagavi"
            element={<ProgramPage programId="spoken-english" />}
          />
          <Route
            path="/be-bca-diploma-classes-belagavi"
            element={<ProgramPage programId="be-bca-diploma" />}
          />
          <Route
            path="/school-tuition-classes-6-to-10-belagavi"
            element={<ProgramPage programId="school-tuition" />}
          />
          <Route
            path="/interview-mastery-personality-development-belagavi"
            element={<ProgramPage programId="interview-mastery" />}
          />
          <Route path="/lecturers" element={<LecturersPage />} />
          <Route path="/lecturers/:id" element={<TeacherProfilePage />} />
          <Route path="/faculty" element={<LecturersPage />} />
          <Route path="/faculty/:id" element={<TeacherProfilePage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-and-conditions" element={<TermsPage />} />
          <Route path="/data-rights" element={<DataRightsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <QuickEnquiryModal />
      </EnquiryModalProvider>
    </MotionConfig>
  );
}
