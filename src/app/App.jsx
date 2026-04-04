import HomePage from '@/pages/HomePage';
import DetailPage from '@/pages/DetailPage';
import { Routes, Route } from 'react-router-dom';

function App() {
    return (
        <div className="bg-linear-to-b from-[#B8E6F5] via-[#E8F5F0] to-[#D4F0D4]">
            <div className="w-full max-w-[375px] min-h-screen bg-white/40 shadow-2xl mx-auto relative">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/pokemon/:id" element={<DetailPage />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
