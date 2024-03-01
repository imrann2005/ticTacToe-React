import { useState } from "react"

export default function Player({ player, symbol,isActive }) {
    const [currentPlayer,setCurrentPlayer] = useState(player);
    const [isEditing, setIsEditing] = useState(false);

    // Important Note Always keep in mind whenever you want ot have some chainges in the ui you will need State

    function handleEditClick() {
        setIsEditing((editing) => !isEditing);
    }
    function handleChange(event){
        setCurrentPlayer(()=>event.target.value);
    }


    return (
        <li className={isActive ? 'active' : undefined}>
            <span>
                <span className="player-name">{isEditing ? <input className="highlight-player" type="text" required value={currentPlayer} onChange={handleChange}></input> : currentPlayer}</span>
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing ? <span>Save</span> : <span>Edit</span>}</button>
        </li>
    )
}