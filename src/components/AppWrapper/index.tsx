import { NavBar } from "../NavBar";
import { ReactNode } from "react";

type ReactChildren = {
  children: ReactNode;
}

export default function AppWrapper({children}:ReactChildren){
  return(
    <>
      <NavBar />
      {children}
    </>
  );
}