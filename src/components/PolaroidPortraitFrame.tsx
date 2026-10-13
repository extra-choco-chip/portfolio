import React, { useState } from 'react';
import { playTactileClick } from '../utils/audio';

interface PolaroidPortraitFrameProps {
  onInspect?: () => void;
}

export const PolaroidPortraitFrame: React.FC<PolaroidPortraitFrameProps> = ({ onInspect }) => {
  const [customPhotoUrl, setCustomPhotoUrl] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [inputUrl, setInputUrl] = useState('');

  const handleSavePhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputUrl.trim()) {
      setCustomPhotoUrl(inputUrl.trim());
      setIsEditing(false);
      setInputUrl('');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCustomPhotoUrl(event.target.result as string);
          setIsEditing(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative z-10 w-full max-w-xs sm:max-w-sm mx-auto mt-4 rotate-[-2.5deg] hover:rotate-[-0.5deg] transition-transform duration-500">
      {/* Top Floral Washi Tape */}
      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#F8D7E2] rotate-[3deg] z-20 shadow-xs flex items-center justify-center washi-tape-strip border-y border-[#B97891]/50">
        <span className="material-symbols-outlined text-[#805365]/70 text-sm rotate-[-10deg]">
          local_florist
        </span>
      </div>

      {/* Main Polaroid Frame with intentional outlines */}
      <div className="bg-[#FFFEFC] p-4 pb-8 shadow-tactile-heavy border border-[#D8B5BD] hover:border-[#B97891] transition-colors">
        {/* Photo Container Area */}
        <div className="w-full aspect-square bg-[#FFF8F0] border border-dashed border-[#B97891]/60 rounded-xs overflow-hidden relative flex flex-col items-center justify-center p-4 group">
          {customPhotoUrl ? (
            <div className="relative w-full h-full">
              <img
                src={customPhotoUrl}
                alt="Ishana Datta"
                className="w-full h-full object-cover rounded-xs"
              />
              <button
                onClick={() => {
                  playTactileClick();
                  setCustomPhotoUrl(null);
                }}
                className="absolute top-2 right-2 bg-[#44343B]/80 text-white rounded-full p-1 text-xs hover:bg-[#805365]"
                title="Remove photo"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>
          ) : (
            <div className="text-center flex flex-col items-center justify-center space-y-3">
              {/* Monogram Seal Artwork */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#F8D7E2] via-[#F2BFCF] to-[#ED9BB8] border-2 border-[#B97891] flex items-center justify-center shadow-xs">
                <span className="font-display-lg text-2xl font-bold text-[#805365] tracking-wider">
                  ID
                </span>
              </div>

              {/* Clear, intentional placeholder label */}
              <div>
                <p className="font-accent-handwritten text-xl text-[#805365] leading-tight">
                  A little portrait goes here
                </p>
                <span className="font-label-sm text-[10px] text-[#805365]/70 tracking-widest uppercase block mt-1">
                  Ready for Ishana's photograph
                </span>
              </div>

              {/* Upload or Add Image Action */}
              <button
                onClick={() => {
                  playTactileClick();
                  setIsEditing(!isEditing);
                }}
                className="px-3 py-1 bg-[#F8D7E2] hover:bg-[#F2BFCF] text-[#805365] text-xs font-label-sm rounded-sm border border-[#D8B5BD] shadow-2xs hover:shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">add_photo_alternate</span>
                <span>Add Your Photo</span>
              </button>
            </div>
          )}

          {/* Quick upload popover if toggled */}
          {isEditing && (
            <div className="absolute inset-0 bg-[#FFF8F0]/95 backdrop-blur-xs p-4 flex flex-col justify-center items-center text-center z-30 animate-fade-in border border-[#B97891]">
              <h4 className="font-display-lg text-base text-[#805365] mb-2">Upload Portrait</h4>
              <label className="w-full mb-2 cursor-pointer bg-[#F8D7E2] text-[#805365] py-1.5 px-3 rounded-xs text-xs font-label-sm border border-[#D8B5BD] hover:bg-[#F2BFCF]">
                <span>Choose Local File</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              <div className="w-full text-xs text-[#805365]/60 my-1 font-label-sm">— OR —</div>

              <form onSubmit={handleSavePhoto} className="w-full space-y-2">
                <input
                  type="url"
                  placeholder="Paste image URL..."
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  className="w-full text-xs p-1.5 border border-[#D8B5BD] rounded-xs bg-white text-[#44343B] focus:outline-hidden focus:border-[#805365]"
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 bg-[#805365] text-white py-1 rounded-xs text-xs font-label-sm"
                  >
                    Set Photo
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-2 bg-gray-200 text-gray-700 py-1 rounded-xs text-xs font-label-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Polaroid Lower Caption */}
        <div className="mt-3 text-center">
          <span className="font-accent-handwritten text-[#44343B] text-2xl drop-shadow-2xs block leading-tight">
            Ishana Datta
          </span>
          <span className="font-label-sm text-[11px] text-[#805365] tracking-wider uppercase block mt-0.5">
            B.Tech E&TC · Cummins College, Pune
          </span>
        </div>
      </div>
    </div>
  );
};
