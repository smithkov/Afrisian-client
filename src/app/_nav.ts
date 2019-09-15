interface NavAttributes {
  [propName: string]: any;
}
interface NavWrapper {
  attributes: NavAttributes;
  element: string;
}
interface NavBadge {
  text: string;
  variant: string;
}
interface NavLabel {
  class?: string;
  variant: string;
}

export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: NavBadge;
  title?: boolean;
  children?: NavData[];
  variant?: string;
  attributes?: NavAttributes;
  divider?: boolean;
  class?: string;
  label?: NavLabel;
  wrapper?: NavWrapper;
}

export const navItems: NavData[] = [
  {
    name: "Dashboard",
    url: "/dashboard",
    icon: "icon-speedometer"
  },
  // {
  //   title: true,
  //   name: "Theme"
  // },
  // {
  //   name: "Colors",
  //   url: "/theme/colors",
  //   icon: "icon-drop"
  // },
  // {
  //   name: "Typography",
  //   url: "/theme/typography",
  //   icon: "icon-pencil"
  // },
  // {
  //   title: true,
  //   name: "Components"
  // },
  {
    name: "Category",
    url: "/base",
    icon: "icon-check",
    children: [
      {
        name: "Add",
        url: "/base/category",
        icon: "icon-pencil"
      },
      {
        name: "List",
        url: "/base/category-list",
        icon: "icon-layers"
      }
    ]
  },
  {
    name: "Sub Category",
    url: "/base",
    icon: "icon-check",
    children: [
      {
        name: "Add",
        url: "/base/sub-category",
        icon: "icon-pencil"
      },
      {
        name: "List",
        url: "/base/sub-category-list",
        icon: "icon-layers"
      }
    ]
  },
  {
    name: "Products",
    url: "/base",
    icon: "icon-basket-loaded",
    children: [
      {
        name: "Add",
        url: "/base/product",
        icon: "icon-pencil"
      },
      {
        name: "List",
        url: "/base/product-list",
        icon: "icon-layers"
      }
    ]
  }
];
