import React from 'react';

export function highlightCppCode(code: string): React.ReactNode {
  const lines = code.split('\n');

  return lines.map((line, lineIdx) => {
    // Whole line comment
    const trimmed = line.trim();
    if (trimmed.startsWith('//')) {
      return (
        <div key={lineIdx} className="leading-relaxed">
          <span className="text-[#d8b5bd] italic">{line}</span>
        </div>
      );
    }

    if (trimmed.startsWith('#include') || trimmed.startsWith('#define')) {
      return (
        <div key={lineIdx} className="leading-relaxed">
          <span className="text-[#ed9bb8] font-semibold">{line}</span>
        </div>
      );
    }

    // Tokenize line with regex
    const tokens = line.split(/(\b(?:int|long|void|bool|auto|const|return|if|else|for|while|class|public|private|struct|vector|pair|priority_queue|queue|stack|set|map|string|size_t)\b|"[^"]*"|\/\/.+$|\d+)/g);

    return (
      <div key={lineIdx} className="leading-relaxed">
        {tokens.map((token, tokenIdx) => {
          if (!token) return null;

          if (token.startsWith('//')) {
            return (
              <span key={tokenIdx} className="text-[#d8b5bd] italic">
                {token}
              </span>
            );
          }

          if (token.startsWith('"') && token.endsWith('"')) {
            return (
              <span key={tokenIdx} className="text-[#dde4c5]">
                {token}
              </span>
            );
          }

          if (/^\d+$/.test(token)) {
            return (
              <span key={tokenIdx} className="text-[#f5ebcb]">
                {token}
              </span>
            );
          }

          if (
            /^(int|long|void|bool|auto|const|return|if|else|for|while|class|public|private|struct|vector|pair|priority_queue|queue|stack|set|map|string|size_t)$/.test(
              token
            )
          ) {
            return (
              <span key={tokenIdx} className="text-[#f2bfcf] font-semibold">
                {token}
              </span>
            );
          }

          return <span key={tokenIdx}>{token}</span>;
        })}
      </div>
    );
  });
}
