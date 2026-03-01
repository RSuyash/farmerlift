import React from 'react';

interface FormattedTextProps {
    text: string;
    className?: string;
}

export default function FormattedText({ text, className = "" }: FormattedTextProps) {
    if (!text) return null;

    // Split by newlines first
    const lines = text.split('\n');

    return (
        <div className={`space-y-1.5 ${className}`}>
            {lines.map((line, lineIdx) => {
                // If the line is empty, render a spacer
                if (!line.trim()) {
                    return <div key={lineIdx} className="h-2" />;
                }

                // Split by '$' to find math/chemistry blocks
                const parts = line.split('$');

                return (
                    <div key={lineIdx} className="leading-relaxed">
                        {parts.map((part, i) => {
                            // Odd indices are inside the $...$ block
                            if (i % 2 === 1) {
                                // Split by _ to find subscripts like P_2O_5 -> ['P', '2', 'O', '5']
                                // Actually, regex split is better: /_(\d+)/
                                const subParts = part.split(/_(\d+)/);
                                return (
                                    <span key={i} className="font-medium tracking-tight">
                                        {subParts.map((sub, j) => {
                                            // Odd indices in subParts are the matched numbers
                                            if (j % 2 === 1) {
                                                return <sub key={j} className="text-[10px] bottom-[-0.25em] relative">{sub}</sub>;
                                            }
                                            return <span key={j}>{sub}</span>;
                                        })}
                                    </span>
                                );
                            }
                            // Even indices are normal text
                            return <span key={i}>{part}</span>;
                        })}
                    </div>
                );
            })}
        </div>
    );
}
