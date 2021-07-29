import React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";

interface CodeSnippetProps {
  code: string;
  language: any;
}

export const CodeSnippet: React.FC<CodeSnippetProps> = ({ code, language }) => {
  return (
    <Highlight {...defaultProps} code={code} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={style}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};
