
import { useDrag } from './DragProvider';

interface DraggableEmojiProps {
  emoji: string;
}

export const DraggableEmoji = ({ emoji }: DraggableEmojiProps) => {
  const { setDraggedEmoji } = useDrag();

  const handleDragStart = (e: React.DragEvent) => {
    setDraggedEmoji(emoji);
    e.dataTransfer.setData('text/plain', emoji);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDragEnd = () => {
    setDraggedEmoji(null);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className="w-10 h-10 flex items-center justify-center text-2xl cursor-grab active:cursor-grabbing hover:bg-slate-100 rounded-lg transition-all duration-200 hover:scale-110 select-none"
      title={`Drag ${emoji} to canvas`}
    >
      {emoji}
    </div>
  );
};
