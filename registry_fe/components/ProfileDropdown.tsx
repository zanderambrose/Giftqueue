import React from "react";
import Image from "next/image";
import Link from "next/link";
import NavDropdown from "react-bootstrap/NavDropdown";

import { useSession, signOut } from "next-auth/react";

const ProfileDropdown = () => {
  const { data: session } = useSession();
  const handleSignOut = () => {
    signOut({
      callbackUrl: `${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}`,
      redirect: false,
    });
  };

  const UserMenu = (
    <Image
      src={
        session?.user?.image
          ? session.user.image
          : "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
      }
      alt="UserName profile image"
      width={50}
      height={50}
      className="rounded-circle"
    />
  );

  return (
    <NavDropdown align={"end"} drop="down" title={UserMenu} id="nav-dropdown">
      <Link href={"/account"} passHref>
        <NavDropdown.Item eventKey="4.1">Account</NavDropdown.Item>
      </Link>
      <NavDropdown.Item eventKey="4.2">Friends</NavDropdown.Item>
      <NavDropdown.Item eventKey="4.3">Calendar</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item eventKey="4.4" onClick={() => handleSignOut()}>
        Sign Out
      </NavDropdown.Item>
    </NavDropdown>
  );
};

// const UserMenu = (
//   <Image
//     src={
//       "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
//     }
//     alt="UserName profile image"
//     width={50}
//     height={50}
//     className="rounded-circle"
//   />
// );

export default ProfileDropdown;
