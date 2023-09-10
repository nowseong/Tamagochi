import { useState } from "react"

const Tamagochi = ({ level }) => {
    const [path, setPath] = useState("images/egg.png");
    return <img src={path} style={{ width: `${15*level}px` }} />
}
export default Tamagochi;