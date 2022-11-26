import { Link } from "react-router-dom";

const Nav = () => {
  const navItems = [
    // { label: "Admin", to: "/admin" },
    { label: "Posts", to: "/posts" },
    { label: "Authors", to: "/authors" },
    { label: "Topics", to: "/topics" },
    { label: "Tags", to: "/tags" },
  ];
  return (
    <div className="flex justify-around bg-primary py-4 text-4xl">
      {navItems.map((navItem) => (
        <Link key={navItem.label} to={navItem.to}>
          {navItem.label}
        </Link>
      ))}
    </div>
  );
};

export default Nav;
