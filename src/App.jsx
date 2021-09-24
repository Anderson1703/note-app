import { useState } from 'react/cjs/react.development';
import uuid from 'react-uuid'
import Editor from './components/editor';
import Item from './components/item';
import List from './components/list';
import Menu from './components/menu';
import Panel from './components/panel';
import Preview from './components/preview';
import  './index.css';



function App() {

  const [items, setItems] = useState([]);
  const [copyItems, setCopyItems] = useState([]);
  const [actualIndex, setActualIndex ] = useState(-1)

  
  const handleNew = ()=>{
    const nota ={
     id:uuid(),
     title:``,
     text:``,
     pinned:false,
     created:Date.now()
    }

    let notes=[...items]
    notes.unshift(nota)

    let res = getOrderedNotes(notes)
    
    setItems(res)
    setCopyItems(res)
 }

 const handlePinned = (item, index)=>{
    setActualIndex(index);
    let id = item.id;
    let notes=[...items];
    notes[index].pinned= !notes[index].pinned;

    let res = getOrderedNotes(notes)
    setItems(res)
    setCopyItems(res)

    let i = res.findIndex(x => x.id === id)
    setActualIndex(i)
 }

 const getOrderedNotes=(arr)=>{
    let items = [...arr]
    let pinned = items.filter(x => x.pinned === true)
    let res = items.filter(x => x.pinned === false)

    pinned = sortByDate(pinned, true);
    res = sortByDate(res, true)

    return [...pinned,...res]
 }

 const sortByDate=(arr, asc)=>{
    if(asc) return arr.sort((a,b)=> new Date (b.created)- new Date (a.created));
  }

 const onChangeTitle = e =>{
    const title = e.target.value
    let notes=[...items]
    notes[actualIndex].title = title;
    setItems(notes)
    setCopyItems(notes)
 }

 const onChangeText = e =>{
    const text = e.target.value
    let notes=[...items]
    notes[actualIndex].text = text;
    setItems(notes)
    setCopyItems(notes)
}

 const handleSelectNote = (item, e)=>{
    if (!e.target.classList.contains(`note`)) return;
    const index = items.findIndex( x => x ===  item)
    setActualIndex(index)
}

const renderEditorAndPreviewUI=()=>{
  return(
     <>
      <Editor item={copyItems[actualIndex]} onChangeTitle={onChangeTitle} onChangeText={onChangeText}/>
      <Preview text={copyItems[actualIndex].text}/>
    </>
  )
}

const handleSearch =e=>{
  const q = e.target.value;

  if (q === ``) {
    setCopyItems([...items])
  }else {
    let res = items.filter(x=> x.title.indexOf(q) >= 0 || x.text.indexOf(q) >= 0 ) 
    if (res.length === 0) {
      setActualIndex(-1)
    } else {
      setCopyItems([...res])
      setActualIndex(0)
    }

  }
}

  return (
    <div className="App">
        <div className="container">
            <Panel>
              <Menu onNew={handleNew} onSearch={handleSearch}/>
              <List className="list">
                {
                  copyItems.map((item,i)=>{
                    return <Item item={item} index={i} actualIndex={actualIndex} onHandlePinned={handlePinned} onHandleSelectNote={handleSelectNote}/>
                  })
                }
              </List>
              </Panel>
            <>
              {
                actualIndex >= 0 ? renderEditorAndPreviewUI() : ``
              }
            </>
        </div>
    </div>
  );
}

export default App;