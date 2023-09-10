import { useEffect, useRef, useState } from "react"

const Tamagochi = ({ level }) => {
    // const [path, setPath] = useState("images/egg.png");
    let path = useRef("images/1.png");
    if(level > 60){
        path.current="images/7.png";
    }
    else if(level > 50){
        path.current="images/6.png";
    }
    else if(level > 40){
        path.current="images/5.png";
    }
    else if(level > 30){
        path.current="images/4.png";
    }
    else if(level > 20){
        path.current="images/3.png";
    }
    else if(level > 10){
        path.current="images/2.png";
    }
    else{
        path.current="images/1.png";
    }
    return <img src={path.current} style={{ width: `${150 + 5*(level-1)}px` }} />;
}
export default Tamagochi;