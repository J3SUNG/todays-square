import { LayoutWrapper, Content } from "./Layout.styles";

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <LayoutWrapper>
      <Content>{children}</Content>
    </LayoutWrapper>
  );
};

export default Layout;
