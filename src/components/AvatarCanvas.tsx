
import { useState, useRef } from 'react';
import { DroppedEmoji } from '@/pages/Index';
import { useDrag } from './DragProvider';

interface AvatarCanvasProps {
  droppedEmojis: DroppedEmoji[];
  onEmojiDrop: (emoji: string, x: number, y: number) => void;
  onEmojiMove: (id: string, x: number, y: number) => void;
  onEmojiSelect: (id: string) => void;
}

export const AvatarCanvas = ({ 
  droppedEmojis, 
  onEmojiDrop, 
  onEmojiMove, 
  onEmojiSelect 
}: AvatarCanvasProps) => {
  const { draggedEmoji } = useDrag();
  const [isDragOver, setIsDragOver] = useState(false);
  const [draggedEmojiId, setDraggedEmojiId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const emoji = e.dataTransfer.getData('text/plain');
    if (emoji) {
      onEmojiDrop(emoji, x - 20, y - 20); // Center the emoji
    }
  };

  const handleEmojiMouseDown = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setDraggedEmojiId(id);
    onEmojiSelect(id);

    const emoji = droppedEmojis.find(e => e.id === id);
    if (!emoji) return;

    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvasRef.current) return;

      const canvasRect = canvasRef.current.getBoundingClientRect();
      const newX = e.clientX - canvasRect.left - dragOffset.x;
      const newY = e.clientY - canvasRect.top - dragOffset.y;

      onEmojiMove(id, newX, newY);
    };

    const handleMouseUp = () => {
      setDraggedEmojiId(null);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      ref={canvasRef}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`w-full h-full relative transition-all duration-200 ${
        isDragOver || draggedEmoji
          ? 'bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-dashed border-blue-300'
          : 'bg-gradient-to-br from-slate-50 to-slate-100'
      }`}
    >
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(0,0,0,0.3) 1px, transparent 0)
          `,
          backgroundSize: '20px 20px'
        }}
      />

      {/* Drop Zone Indicator */}
      {(isDragOver || draggedEmoji) && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-white/90 backdrop-blur-sm px-8 py-4 rounded-2xl border border-blue-200 shadow-lg animate-pulse">
            <div className="text-center">
              <div className="text-4xl mb-2">🎨</div>
              <p className="text-lg font-semibold text-slate-700">Drop emoji here</p>
              <p className="text-sm text-slate-500">Create your avatar</p>
            </div>
          </div>
        </div>
      )}

      {/* Dropped Emojis */}
      {droppedEmojis.map((droppedEmoji) => (
        <div
          key={droppedEmoji.id}
          className={`absolute text-4xl cursor-move hover:scale-110 transition-all duration-200 select-none ${
            draggedEmojiId === droppedEmoji.id ? 'z-50 scale-110' : ''
          }`}
          style={{
            left: droppedEmoji.x,
            top: droppedEmoji.y,
            zIndex: draggedEmojiId === droppedEmoji.id ? 9999 : droppedEmoji.zIndex,
            filter: draggedEmojiId === droppedEmoji.id ? 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))' : 'none'
          }}
          onMouseDown={(e) => handleEmojiMouseDown(e, droppedEmoji.id)}
          title="Click and drag to move"
        >
          {droppedEmoji.emoji}
        </div>
      ))}

      {/* Instructions */}
      {droppedEmojis.length === 0 && !isDragOver && !draggedEmoji && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center max-w-md mx-auto p-8">
            <div className="text-6xl mb-4 animate-bounce">✨</div>
            <h2 className="text-2xl font-bold text-slate-700 mb-2">Start Creating!</h2>
            <p className="text-slate-500 mb-4">
              Drag emojis from the left panel to build your unique avatar. 
              Layer them to create amazing combinations!
            </p>
            <div className="flex justify-center space-x-2 text-2xl">
              <span className="animate-pulse">🎭</span>
              <span className="animate-pulse delay-75">👗</span>
              <span className="animate-pulse delay-150">👑</span>
              <span className="animate-pulse delay-225">✨</span>
            </div>
          </div>
        </div>
      )}

      {/* Avatar Count */}
      {droppedEmojis.length > 0 && (
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200 shadow-sm">
          <span className="text-sm font-medium text-slate-700">
            {droppedEmojis.length} emoji{droppedEmojis.length !== 1 ? 's' : ''}
          </span>
        </div>
      )}
    </div>
  );
};
