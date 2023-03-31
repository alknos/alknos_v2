import Navhome from "@/pages/navhome";


function MainLayout(props) {
  return (
    <>
      <Navhome />
      <main>{props.children}</main>
    </>
  );
}

export default MainLayout;