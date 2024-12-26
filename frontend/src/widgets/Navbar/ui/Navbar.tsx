import { NavbarContainer } from "./Navbar.styles";
import { NavbarItem } from "./NavbarItem";
import { navbarLinks } from "../model/navbarLinks";

export const Navbar = () => {
  return (
    <NavbarContainer>
      {navbarLinks.map((link) => (
        <NavbarItem key={link.id} {...link} />
      ))}
    </NavbarContainer>
  );
};

export default Navbar;
