import type { ReactNode } from "react";

interface CardProps {
  title: string;
  children?: ReactNode;
}

/*
ReactNode represents anything React can render,
including text, numbers, JSX elements, arrays,
fragments, null, and undefined.
It is the correct type for the children prop.
*/

function Card({ title, children }: CardProps) {
  return (
    <div className="card">
      <h3 className="card-title">{title}</h3>

      {children && (
        <div className="card-body">
          {children}
        </div>
      )}
    </div>
  );
}

export default Card;

/*
Required vs Optional children

Required children:
- The component must receive content between its opening and closing tags.

Optional children:
- The component can be rendered without any content.

Use required children when the component cannot function without content.
Use optional children when displaying content is optional.
*/