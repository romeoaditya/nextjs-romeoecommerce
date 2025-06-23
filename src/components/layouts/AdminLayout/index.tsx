import Sidebar from "@/components/fragments/Sidebar";
import styles from "./AdminLayout.module.scss";

type Propstypes = {
  children: React.ReactNode;
};

const listSidebarItem = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: "bx  bx-dashboard",
  },
  {
    title: "Products",
    url: "/admin/products",
    icon: "bx  bx-sneaker",
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: "bx  bx-community",
  },
];

const AdminLayout = (props: Propstypes) => {
  const {children} = props;
  return (
    <div className={styles.admin}>
      <Sidebar lists={listSidebarItem} />
      <div className={styles.admin__main}>{children}</div>
    </div>
  );
};
export default AdminLayout;
