export default function Editor({item, onChangeTitle, onChangeText}) {

    const handleTitleChange = e => onChangeTitle(e);

    const handleTextChange = e => onChangeText(e);

    return (
        <div className="editor">
            <div>
                <input className="title" value={item.title} onChange = {(e)=>handleTitleChange(e)} />
            </div>
            <div className="editor-textarea">
                <textarea className="content" value={item.text} onChange = {(e)=>handleTextChange(e)} ></textarea>
            </div>
        </div>
    )
}
