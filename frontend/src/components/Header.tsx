import { ConnectButton } from "@rainbow-me/rainbowkit";
import logo from "../assets/logo.png";
const Header = () => {
  return (
    <header>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px 30px",
        }}
      >
        <div style={{ display: "flex" }}>
          <img
            src={logo}
            alt="logo"
            style={{ border: "1px black solid", margin: "0" }}
          />
          <h1
            style={{
              fontWeight: "bold",
              fontSize: "24px",
              display: "flex",
            }}
          >
            Sisyfos
          </h1>
        </div>
        <div>
          <ConnectButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
