/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { NavbarItem } from "./NavbarItem";
import { navbarLinks } from "../model/navbarLinks";

const navbarStyles = css`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background-color: #6200ea;
  color: white;
`;

export const Navbar = () => {
  return (
    <nav css={navbarStyles}>
      {navbarLinks.map((link) => (
        <NavbarItem key={link.id} {...link} />
      ))}
    </nav>
  );
};
