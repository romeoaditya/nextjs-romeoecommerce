import Sidebar from "@/components/fragments/Sidebar";
import styles from "./MemberLayout.module.scss";

type Propstypes = {
  children: React.ReactNode;
};

const listSidebarItem = [
  {
    title: "Dashboard",
    url: "/member",
    icon: "bx  bx-dashboard",
  },
  {
    title: "Orders",
    url: "/member/orders",
    icon: "bx  bx-cart",
  },
  {
    title: "Profile",
    url: "/member/profile",
    icon: "bx  bx-user-circle",
  },
];

const MemberLayout = (props: Propstypes) => {
  const {children} = props;
  return (
    <div className={styles.member}>
      <Sidebar lists={listSidebarItem} />
      <div className={styles.member__main}>{children}</div>
    </div>
  );
};
export default MemberLayout;
