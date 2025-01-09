import "./App.css";
import Grid from "./components/grid/grid.tsx";
import Keyboard from "./components/keyboard/keyboard.tsx";
import Header from "./Header.tsx";

export default function App() {
  return (
    <div className="">
      <Header />
      <div className="h-[905px] w-[500px] mx-[160px] flex flex-col items-center justify-center bg-background-black">
        <Grid />
        <Keyboard />
      </div>
    </div>
  );
}
