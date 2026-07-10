import type { ReactNode, ReactElement } from "react";

/*
Research 1:
React.FC is a generic type for function components.
It automatically includes the children prop.
Typing props directly is simpler and gives more control,
so modern React projects usually prefer typing the props parameter.
*/

/*
Research 2:
PropsWithChildren automatically adds the children prop to an interface.
It avoids writing children: ReactNode manually and is useful when
every component should accept children.
*/

interface PageLayoutProps {
  header: ReactNode;
  children: ReactNode;
  footer: ReactNode;
}

function PageLayout({
  header,
  children,
  footer,
}: PageLayoutProps) {
  return (
    <div>
      <header
        style={{
          background: "#f0f0f0",
          padding: "12px",
        }}
      >
        {header}
      </header>

      <main
        style={{
          padding: "16px",
        }}
      >
        {children}
      </main>

      <footer
        style={{
          background: "#f0f0f0",
          padding: "12px",
        }}
      >
        {footer}
      </footer>
    </div>
  );
}

/*
Research 4:

children is passed between opening and closing tags.

Named props such as header={...} or footer={...}
are used when different areas of a layout require
different content.

Use children for the primary content and named
slots for fixed layout sections.
*/

interface WrapperProps {
  content: ReactNode;
}

function Wrapper({ content }: WrapperProps) {
  return <div>{content}</div>;
}

interface IconButtonProps {
  icon: ReactElement;
  label: string;
}

function IconButton({
  icon,
  label,
}: IconButtonProps) {
  return (
    <button>
      {icon} {label}
    </button>
  );
}

interface TooltipProps {
  trigger: ReactElement;
  tip: string;
}

function Tooltip({
  trigger,
  tip,
}: TooltipProps) {
  return <span title={tip}>{trigger}</span>;
}

/*
Research 3:

The key prop is used internally by React to identify
elements during rendering.

It is not passed as a normal prop, so props.key
is undefined inside a component.

Keys improve rendering performance by helping React
identify changed, added and removed elements.
*/

/*
Research 5:

ReactNode
- Accepts anything React can render.
- Best for children and layout content.

ReactElement
- Accepts only JSX elements.
- Does not allow strings or numbers.

JSX.Element
- Similar to ReactElement.
- Also rejects null and undefined.
*/

function SelfLearning() {
  return (
    <div>
      <PageLayout
        header={<h1>Intern Dashboard</h1>}
        footer={<p>© 2026 Aarvihsolutions</p>}
      >
        <p>Main content goes here as children.</p>
        <p>Any JSX works here.</p>
      </PageLayout>

      <hr />

      <Wrapper content={<h3>ReactNode Example</h3>} />

      <br />

      <IconButton
        icon={<span>⭐</span>}
        label="Star"
      />

      <br />
      <br />

      <Tooltip
        trigger={<button>Hover Me</button>}
        tip="Tooltip Example"
      />
    </div>
  );
}

export default SelfLearning;