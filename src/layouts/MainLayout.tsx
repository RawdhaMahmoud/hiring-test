import Header from "./Header";


interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="app-shell">
      <Header />
      <main className="page-content">{children}</main>
    </div>
  );
};

export default MainLayout;