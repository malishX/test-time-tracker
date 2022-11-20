import type { FC } from "react";

const SlashScreen: FC = () => (
  <div
    style={{
      alignItems: "center",
      backgroundColor: "#fff",
      display: "flex",
      flexDirection: "column",
      height: "100%",
      justifyContent: "center",
      placeContent: "center",
      placeItems: "center",
      left: 0,
      position: "fixed",
      top: 0,
      width: "100%",
      zIndex: 2000,
    }}
  >
    loading...
  </div>
);

export default SlashScreen;
