
import { useState } from 'react';
import { Search } from 'lucide-react';
import { DraggableEmoji } from './DraggableEmoji';

const emojiCategories = {
  'Body & Face': [
    '👤', '👥', '👶', '🧒', '👦', '👧', '🧑', '👱', '👨', '🧔', '👨‍🦰', '👨‍🦱', '👨‍🦳', '👨‍🦲',
    '👩', '👩‍🦰', '🧑‍🦰', '👩‍🦱', '🧑‍🦱', '👩‍🦳', '🧑‍🦳', '👩‍🦲', '🧑‍🦲', '👱‍♀️', '👱‍♂️',
    '🧓', '👴', '👵', '🙍', '🙍‍♂️', '🙍‍♀️', '🙎', '🙎‍♂️', '🙎‍♀️', '🙅', '🙅‍♂️', '🙅‍♀️',
    '🙆', '🙆‍♂️', '🙆‍♀️', '💁', '💁‍♂️', '💁‍♀️', '🙋', '🙋‍♂️', '🙋‍♀️', '🧏', '🧏‍♂️', '🧏‍♀️',
    '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '🥲', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍',
    '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🥸', '🤩'
  ],
  'Hair & Features': [
    '💇', '💇‍♂️', '💇‍♀️', '💆', '💆‍♂️', '💆‍♀️', '🧖', '🧖‍♂️', '🧖‍♀️', '🧚', '🧚‍♂️', '🧚‍♀️',
    '👸', '🤴', '👳', '👳‍♂️', '👳‍♀️', '👲', '🧕', '🤵', '🤵‍♂️', '🤵‍♀️', '👰', '👰‍♂️', '👰‍♀️',
    '🤰', '🤱', '👩‍🍼', '👨‍🍼', '🧑‍🍼', '🎅', '🤶', '🧑‍🎄', '🦸', '🦸‍♂️', '🦸‍♀️', '🦹', '🦹‍♂️', '🦹‍♀️'
  ],
  'Clothing': [
    '👕', '👖', '🩱', '👗', '👚', '👔', '👞', '👟', '🥾', '🥿', '👠', '👡', '🩰', '👢', '👑', '👒',
    '🎩', '🎓', '🧢', '⛑️', '📿', '💄', '💍', '💎', '🔇', '🔈', '🔉', '🔊', '📢', '📣', '📯', '🔔',
    '🧳', '🎒', '👝', '👛', '👜', '💼', '🧮', '💻', '⌨️', '🖥️', '🖨️', '🖱️', '🖲️', '💽', '💾'
  ],
  'Accessories': [
    '👓', '🕶️', '🥽', '🥼', '🦺', '👔', '👕', '👖', '🧣', '🧤', '🧥', '🧦', '👗', '👘', '🥻', '🩱',
    '🩲', '🩳', '💄', '💋', '👣', '🧠', '🫀', '🫁', '🦷', '🦴', '👀', '👁️', '👅', '👄', '🫦', '👶',
    '🧒', '👦', '👧', '🧑', '👱', '👨', '🧔', '👨‍🦰', '👨‍🦱', '👨‍🦳', '👨‍🦲', '👩', '👩‍🦰'
  ],
  'Gestures & Hands': [
    '👋', '🤚', '🖐️', '✋', '🖖', '👌', '🤌', '🤏', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆',
    '🖕', '👇', '☝️', '👍', '👎', '👊', '✊', '🤛', '🤜', '👏', '🙌', '👐', '🤲', '🤝', '🙏', '✍️',
    '💅', '🤳', '💪', '🦾', '🦿', '🦵', '🦶', '👂', '🦻', '👃', '🧠', '🫀', '🫁', '🦷', '🦴', '👀'
  ],
  'Animals & Nature': [
    '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐻‍❄️', '🐨', '🐯', '🦁', '🐮', '🐷', '🐽', '🐸',
    '🐵', '🙈', '🙉', '🙊', '🐒', '🐔', '🐧', '🐦', '🐤', '🐣', '🐥', '🦆', '🦅', '🦉', '🦇', '🐺',
    '🐗', '🐴', '🦄', '🐝', '🪱', '🐛', '🦋', '🐌', '🐞', '🐜', '🪰', '🪲', '🪳', '🦟', '🦗', '🕷️'
  ],
  'Objects & Tools': [
    '🔧', '🔨', '⚒️', '🛠️', '⛏️', '🔩', '⚙️', '🧲', '🔫', '💣', '🧨', '🪓', '🔪', '🗡️', '⚔️', '🛡️',
    '🚬', '⚰️', '🪦', '⚱️', '🏺', '🔮', '📿', '🧿', '💈', '⚗️', '🔭', '🔬', '🕳️', '🩹', '🩺', '💊',
    '💉', '🩸', '🧬', '🦠', '🧫', '🧪', '🌡️', '🧹', '🧺', '🧻', '🚽', '🚿', '🛁', '🪒', '🧴', '🧷'
  ]
};

export const EmojiPalette = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const allEmojis = Object.values(emojiCategories).flat();
  const filteredEmojis = searchTerm 
    ? allEmojis.filter(emoji => 
        Object.entries(emojiCategories).some(([category, emojis]) =>
          emojis.includes(emoji) && 
          category.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : [];

  return (
    <div className="h-full flex flex-col">
      {/* Search Bar */}
      <div className="p-4 border-b border-slate-200/60">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search emojis..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Categories or Search Results */}
      <div className="flex-1 overflow-y-auto">
        {searchTerm ? (
          <div className="p-4">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Search Results</h3>
            <div className="grid grid-cols-6 gap-2">
              {filteredEmojis.map((emoji, index) => (
                <DraggableEmoji key={`${emoji}-${index}`} emoji={emoji} />
              ))}
            </div>
          </div>
        ) : (
          <div className="p-4 space-y-6">
            {Object.entries(emojiCategories).map(([category, emojis]) => (
              <div key={category}>
                <button
                  onClick={() => setActiveCategory(activeCategory === category ? null : category)}
                  className="w-full text-left mb-3 p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200"
                >
                  <h3 className="text-sm font-semibold text-slate-700 flex items-center justify-between">
                    {category}
                    <span className="text-xs text-slate-500">({emojis.length})</span>
                  </h3>
                </button>
                
                {(activeCategory === category || activeCategory === null) && (
                  <div className="grid grid-cols-6 gap-2 animate-fade-in">
                    {emojis.slice(0, activeCategory === category ? emojis.length : 12).map((emoji, index) => (
                      <DraggableEmoji key={`${emoji}-${index}`} emoji={emoji} />
                    ))}
                    {activeCategory !== category && emojis.length > 12 && (
                      <button
                        onClick={() => setActiveCategory(category)}
                        className="col-span-6 text-xs text-blue-600 hover:text-blue-800 py-1"
                      >
                        Show all {emojis.length} emojis
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
