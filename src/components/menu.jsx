export default function Menu({onNew, onSearch}) {

   const handleClick = ()=> onNew();

   const handleChange = (e)=> onSearch(e);

    return (
        <div className="menu">
            <input className="search" type="search" placeholder="search..." onChange={(e)=>handleChange(e)}/>
            <button className="btn" onClick={(e)=>handleClick()}>+ nueva nota</button>
        </div>
    )
}
