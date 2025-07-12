
import { useState, useRef } from 'react';
import { EmojiPalette } from '@/components/EmojiPalette';
import { AvatarCanvas } from '@/components/AvatarCanvas';
import { DragProvider } from '@/components/DragProvider';

export interface DroppedEmoji {
  id: string;
  emoji: string;
  x: number;
  y: number;
  zIndex: number;
}

const Index = () => {
  const [droppedEmojis, setDroppedEmojis] = useState<DroppedEmoji[]>([]);
  const [draggedEmoji, setDraggedEmoji] = useState<string | null>(null);
  const nextZIndex = useRef(1);

  const handleEmojiDrop = (emoji: string, x: number, y: number) => {
    const newEmoji: DroppedEmoji = {
      id: `${emoji}-${Date.now()}-${Math.random()}`,
      emoji,
      x,
      y,
      zIndex: nextZIndex.current++
    };
    setDroppedEmojis(prev => [...prev, newEmoji]);
  };

  const handleEmojiMove = (id: string, x: number, y: number) => {
    setDroppedEmojis(prev => 
      prev.map(emoji => 
        emoji.id === id ? { ...emoji, x, y } : emoji
      )
    );
  };

  const handleEmojiSelect = (id: string) => {
    setDroppedEmojis(prev => 
      prev.map(emoji => 
        emoji.id === id 
          ? { ...emoji, zIndex: nextZIndex.current++ }
          : emoji
      )
    );
  };

  const clearCanvas = () => {
    setDroppedEmojis([]);
    nextZIndex.current = 1;
  };

  return (
    <DragProvider 
      draggedEmoji={draggedEmoji} 
      setDraggedEmoji={setDraggedEmoji}
    >
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60 px-6 py-4 sticky top-0 z-50">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ReWare Avatar Builder
              </h1>
              <p className="text-slate-600 text-sm mt-1">
                Drag emojis to create your unique avatar
              </p>
            </div>
            <button
              onClick={clearCanvas}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200 font-medium"
            >
              Clear Canvas
            </button>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex h-[calc(100vh-80px)]">
          {/* Left Panel - Emoji Palette */}
          <div className="w-80 bg-white/90 backdrop-blur-sm border-r border-slate-200/60 overflow-hidden">
            <EmojiPalette />
          </div>

          {/* Right Panel - Avatar Canvas */}
          <div className="flex-1 relative">
            <AvatarCanvas
              droppedEmojis={droppedEmojis}
              onEmojiDrop={handleEmojiDrop}
              onEmojiMove={handleEmojiMove}
              onEmojiSelect={handleEmojiSelect}
            />
          </div>
        </div>
      </div>
    </DragProvider>
  );
};

export default Index;
