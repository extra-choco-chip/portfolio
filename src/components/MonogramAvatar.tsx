import React from 'react';

interface MonogramAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const MonogramAvatar: React.FC<MonogramAvatarProps> = ({
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-16 h-16 text-xl',
    xl: 'w-24 h-24 text-3xl',
  };

  return (
    <div
      className={`relative rounded-full bg-gradient-to-br from-[#F8D7E2] via-[#F2BFCF] to-[#ED9BB8] border-2 border-[#B97891] shadow-tactile flex items-center justify-center select-none ${sizeClasses[size]} ${className}`}
      title="Ishana Datta Monogram"
    >
      {/* Delicate inner decorative dashed circle */}
      <div className="absolute inset-1 rounded-full border border-dashed border-[#805365]/40 pointer-events-none" />

      {/* Monogram Initials */}
      <span className="font-display-lg text-[#805365] font-semibold tracking-wider drop-shadow-2xs">
        ID
      </span>

      {/* Tiny corner botanical dot */}
      <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-[#B97891] border border-white" />
    </div>
  );
};
