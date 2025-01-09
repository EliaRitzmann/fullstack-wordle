import Row from "./rows.tsx";

export default function Grid() {
    return (
    <div className="align-baseline justify-center items-center flex grow">
        <div className="grid grid-rows-5 gap-2 w-[350px] h-[420px] p-2.5">
            <Row word="water" targetWord="skate"/>
            <Row word="skirt" targetWord="skate"/>
            <Row word="stake" targetWord="skate"/>
            <Row word="skate" targetWord="skate"/>
            <Row word="     " targetWord="skate"/>
            <Row word="     " targetWord="skate"/> 
        </div>
    </div>
    );
  }

  