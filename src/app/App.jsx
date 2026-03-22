import HomePage from '@/pages/HomePage';
import DetailPage from '@/pages/DetailPage';
import { Routes, Route } from 'react-router-dom';

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/pokemon/:id" element={<DetailPage />} />
        </Routes>
    );
}

export default App;
