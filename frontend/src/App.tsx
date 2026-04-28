import FlashCardPage from './pages/FlashCardPage'
import { Routes, Route, Navigate } from 'react-router-dom'
import { PrivateRoute } from './components/PrivateRoute'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import VocabularyListPage from './pages/VocabularyListPage'
import VocabularyFormPage from './pages/VocabularyFormPage'
import Layout from './components/Layout'

  function App() {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/vocabularies" element={                                                      
          <PrivateRoute>
            <Layout><VocabularyListPage /></Layout>
          </PrivateRoute>
        } />
        <Route path="/flashcard" element={
          <PrivateRoute>
              <Layout><FlashCardPage /></Layout>
          </PrivateRoute>
        } />
        <Route path="/vocabularies/new" element={
          <PrivateRoute>
            <Layout><VocabularyFormPage /></Layout>
          </PrivateRoute>
        } />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    )
  }

  export default App