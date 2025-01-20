type Props = {
  children: React.ReactNode;
  className?: string;
};

const Card = ({ children, className }: Props) => {
  return (
    <div
      className={`border rounded-2xl flex-shrink-0 border-gray-10 shadow-subtle flex flex-col justify-between py-4 px-5 bg-white ${className}`}
    >
      {children}
    </div>
  );
};

const Header = ({ children, className }: Props) => {
  return <div className={className}>{children}</div>;
};

const Content = ({ children, className }: Props) => {
  return <div className={className}>{children}</div>;
};

const Footer = ({ children, className }: Props) => {
  return <div className={className}>{children}</div>;
};

Card.Header = Header;
Card.Content = Content;
Card.Footer = Footer;

export default Card;
