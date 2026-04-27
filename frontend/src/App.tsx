import FlashCardPage from './pages/FlashCardPage'
import { Routes, Route, Navigate } from 'react-router-dom'
import { PrivateRoute } from './components/PrivateRoute'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import VocabularyListPage from './pages/VocabularyListPage'
import VocabularyFormPage from './pages/VocabularyFormPage'

  function App() {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/vocabularies" element={                                                      
          <PrivateRoute>
            <VocabularyListPage />
          </PrivateRoute>
        } />
        <Route path="/flashcard" element={
          <PrivateRoute>
              <FlashCardPage />
          </PrivateRoute>
        } />
        <Route path="/vocabularies/new" element={
          <PrivateRoute>
            <VocabularyFormPage />
          </PrivateRoute>
        } />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    )
  }

  export default App