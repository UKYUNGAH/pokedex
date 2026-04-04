import { useState } from 'react';
import { X, MessageCircle, Send } from 'lucide-react';
import { askPokemon } from '@/shared/api/gemini';

export default function PokemonChat({ pokemonName, koreanName }) {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'ai', text: `안녕! 나는 ${koreanName || '오박사'}야. 뭐든 물어봐!` },
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input;
        setInput('');
        setMessages((prev) => [...prev, { role: 'user', text: userMessage }]);
        setIsLoading(true);

        try {
            const reply = await askPokemon(pokemonName, koreanName, userMessage);
            setMessages((prev) => [...prev, { role: 'ai', text: reply }]);
        } catch (e) {
            setMessages((prev) => [...prev, { role: 'ai', text: '앗, 잠깐 정신이 없었어. 다시 물어봐줘!' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* 플로팅 버튼 */}
            <div className="sticky bottom-6 flex justify-end pr-4 z-50">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-14 h-14 bg-[#5A8A9A] rounded-full shadow-lg flex items-center justify-center hover:bg-[#4A7A8A] transition-colors cursor-pointer"
                >
                    {isOpen ? <X className="text-white size-6" /> : <MessageCircle className="text-white size-6" />}
                </button>
            </div>

            {/* 채팅창 */}
            {isOpen && (
                <div className="fixed bottom-24 right-[calc(50%-187px+16px)] w-64 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden">
                    {/* 헤더 */}
                    <div className="bg-[#A8D5E2] px-4 py-3 flex items-center gap-2">
                        <MessageCircle className="text-[#5A8A9A] size-4" />
                        <p className="text-sm font-bold text-[#5A8A9A]">
                            {koreanName ? `${koreanName}에게 질문하기` : '오박사에게 질문하기'}
                        </p>
                    </div>

                    {/* 메시지 목록 */}
                    <div className="h-64 overflow-y-auto p-3 flex flex-col gap-2">
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div
                                    className={`max-w-[80%] px-3 py-2 rounded-2xl text-xs leading-relaxed ${
                                        msg.role === 'user'
                                            ? 'bg-[#5A8A9A] text-white rounded-br-sm'
                                            : 'bg-gray-100 text-gray-700 rounded-bl-sm'
                                    }`}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-gray-100 px-3 py-2 rounded-2xl rounded-bl-sm text-xs text-gray-400">
                                    생각 중...
                                </div>
                            </div>
                        )}
                    </div>

                    {/* 입력창 */}
                    <div className="border-t p-3 flex gap-2">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
                                    handleSend();
                                }
                            }}
                            placeholder="질문을 입력해줘..."
                            className="flex-1 text-xs border border-gray-200 rounded-full px-3 py-2 focus:outline-none"
                        />
                        <button
                            onClick={handleSend}
                            disabled={isLoading}
                            className="w-8 h-8 bg-[#5A8A9A] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#4A7A8A] transition-colors"
                        >
                            <Send className="text-white size-3" />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
