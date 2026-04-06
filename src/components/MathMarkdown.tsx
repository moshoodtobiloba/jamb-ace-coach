import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

interface MathMarkdownProps {
  children: string;
  className?: string;
}

/**
 * Preprocess text to fix common LaTeX delimiter issues:
 * - Convert \( ... \) to $ ... $ (inline math)
 * - Convert \[ ... \] to $$ ... $$ (display math)
 * - Convert bare ( ... ) containing LaTeX commands to $ ... $
 */
function preprocessMath(text: string): string {
  if (!text) return '';
  
  // 1. Convert \( ... \) to $ ... $ (inline math)
  let result = text.replace(/\\\((.+?)\\\)/gs, (_, inner) => `$${inner.trim()}$`);
  
  // 2. Convert \[ ... \] to $$ ... $$ (display math)  
  result = result.replace(/\\\[(.+?)\\\]/gs, (_, inner) => `$$${inner.trim()}$$`);
  
  // 3. Convert bare parentheses containing LaTeX commands like \cdot, \boxed, \frac, etc.
  // Match ( ... ) that contains LaTeX commands but isn't already inside $ delimiters
  result = result.replace(/(?<!\$)\(([^()]*\\(?:cdot|boxed|frac|sqrt|sum|prod|int|times|div|pm|mp|leq|geq|neq|approx|equiv|infty|alpha|beta|gamma|delta|theta|lambda|mu|sigma|omega|pi|phi|psi|text|mathbf|mathrm|overline|underline|hat|bar|vec|dot|ddot|quad|qquad|hspace|vspace|left|right|Big|big|Bigg|bigg)[^()]*)\)(?!\$)/g, (_, inner) => `$${inner}$`);
  
  // 4. Convert [ ... ] blocks containing LaTeX commands to display math
  result = result.replace(/(?<!\$)\[([^\[\]]*\\(?:cdot|boxed|frac|sqrt|sum|prod|int|times|div|pm)[^\[\]]*)\](?!\$)/g, (_, inner) => `$$${inner}$$`);
  
  return result;
}

export default function MathMarkdown({ children, className = '' }: MathMarkdownProps) {
  const processed = preprocessMath(children);
  
  return (
    <div className={className}>
      <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
        {processed}
      </ReactMarkdown>
    </div>
  );
}
