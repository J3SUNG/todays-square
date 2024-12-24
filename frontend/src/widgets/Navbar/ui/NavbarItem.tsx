/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

type NavbarItemProps = {
  label: string;
  href: string;
};

const itemStyles = css`
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;

  &:hover {
    text-decoration: underline;
  }
`;

export const NavbarItem = ({ label, href }: NavbarItemProps) => {
  return (
    <a css={itemStyles} href={href}>
      {label}
    </a>
  );
};
