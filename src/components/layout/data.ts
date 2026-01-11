interface NavItem {
  name: string;
  path: string;
  children?: NavItem[];
  badge?: string;
}

export const navConfig: NavItem[] = [
  { name: "Home", path: "/home/stat" },
  { name: "Buckets", path: "/home/bucket" },
  { name: "Records", path: "/home/record" },
  // {
  //   name: "Parent",
  //   path: "/parent",
  //   children: [
  //     { name: "Submenu 1", path: "/parent/sub1" },
  //     { name: "Submenu 2", path: "/parent/sub2" },
  //   ],
  // },
];

export const userMenuConfig: NavItem[] = [
  // { name: "Profile", path: "/profile", badge: "New" },
  // { name: "Settings", path: "/settings" },
  { name: "Logout", path: "/auth/signin" },
];
