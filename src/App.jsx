import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import SubHeader from "./components/SubHeader";
import RoutesIndex from "./routes";
import "./styles/App.css";

export default function App() {
  return (
    <div className="app-layout">
      <Header />
      <div className="app-body">
        <Sidebar />
        <div className="app-content">
          <SubHeader />    
          <main className="app-main">
            <RoutesIndex />
          </main>
        </div>
      </div>
    </div>
  );
}