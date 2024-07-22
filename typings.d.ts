
declare module '*.svg' {
  const content: any;
  export default content;
}


namespace JSX {
  interface IntrinsicElements {
   
    'Navbar': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
   

 
    div: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
    span: React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
    button: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
    nav: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    input: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
    textarea: React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;
    label: React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>;
    ul: React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>;
    li: React.DetailedHTMLProps<React.HTMLAttributes<HTMLLIElement>, HTMLLIElement>;
    section: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    article: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    p: React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>; 
    h1: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>; 

  }
}
