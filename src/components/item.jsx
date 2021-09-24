export default function Item({item,index,onHandlePinned,onHandleSelectNote,actualIndex}) {

    const handlePinned = (item, index)=>{
        onHandlePinned(item,index)
    }

    const handleClick = (item, e)=>{
        onHandleSelectNote(item,e)
    }

    return (
        <div className={index === actualIndex? `note activeNote` : `note`} key={item.id} onClick={(e)=>handleClick(item, e)}>
            <div>
                {
                    item.title ===``? `[sin titulo]` :item.title.substring(0,20)
                }
            </div>
            <div>
                <button className="pinButton" onClick={(e)=>handlePinned(item,index)}>
                    {
                        item.pinned? `Pinned`:`Pin`
                    }
                </button>
            </div>
        </div>
    )
}