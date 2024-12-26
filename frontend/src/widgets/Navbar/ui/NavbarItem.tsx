import { StyledNavbarItem } from "./NavbarItem.styles";

type NavbarItemProps = {
  label: string;
  href: string;
};

export const NavbarItem = ({ label, href }: NavbarItemProps) => {
  return <StyledNavbarItem href={href}>{label}</StyledNavbarItem>;
};

export default NavbarItem;
