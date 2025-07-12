
import { createContext, useContext, ReactNode } from 'react';

interface DragContextType {
  draggedEmoji: string | null;
  setDraggedEmoji: (emoji: string | null) => void;
}

const DragContext = createContext<DragContextType | undefined>(undefined);

export const useDrag = () => {
  const context = useContext(DragContext);
  if (!context) {
    throw new Error('useDrag must be used within a DragProvider');
  }
  return context;
};

interface DragProviderProps {
  children: ReactNode;
  draggedEmoji: string | null;
  setDraggedEmoji: (emoji: string | null) => void;
}

export const DragProvider = ({ children, draggedEmoji, setDraggedEmoji }: DragProviderProps) => {
  return (
    <DragContext.Provider value={{ draggedEmoji, setDraggedEmoji }}>
      {children}
    </DragContext.Provider>
  );
};
