import { useEffect, useState } from 'react';
import './App.css';
import { db } from './fire/config';
import { getDocs, collection, addDoc, doc, deleteDoc, updateDoc,getDoc } from 'firebase/firestore';


function App() {
  // this channal colletion reference  to add new  variable 
  const CollectionRef = collection(db,"yt")

  const [ChannelList,setChannelList] = useState([]);
  // this state chname 
  const [chName,setChName] = useState('');
  // this state sub
  const [chSub,setChSub] = useState(0);
 // update method  state
  const [docId,setdocId] = useState(null);

 
  
// Edit Methode
const updateChannel = async () => {
  const channelDoc = doc(db, "yt", docId);
  await updateDoc(channelDoc, {
    channelName: chName, 
    sub: chSub,
  });
  getChannelList()
};

// edit the same input box the reason for setName and setchsub
const editChannel = async (id) => {
  const channelDoc = doc(db, "yt", id);
  const channel = await getDoc(channelDoc);

    const channelData = channel.data();
    // console.log(channel.id);
    // console.log(channelData);
    
    setChName(channelData.channelName);
    setChSub(channelData.sub);
    setdocId(id); 
  
}



//  get MEthod
 const getChannelList = async()=>{

    const data = await getDocs(CollectionRef)

    const filteredData = data.docs.map((doc)=>(
      {...doc.data(),
      
        id:doc.id
      }

    ))
    setChannelList(filteredData);
    setChName("");
    setChSub("");
  }

  useEffect(()=>{
    getChannelList()
  },[])


// Delete Channel
  const deleteChannel = async (id) => {
    const channelDoc = doc(db, "yt", id);
    await deleteDoc(channelDoc)
      .then(() => {
        // Document deleted successfully, now update the channel list
        getChannelList();
      })
      .catch((error) => {
        console.error('Error deleting document: ', error);
      });
      alert("Are you sure delete  this item");
  };



// POST METHOD in the section 
  const postData = async () => {
    await addDoc(CollectionRef, {
      // those two  state passed
      channelName: chName,
      sub: chSub,
      
    })
      .then(() => {
        // Data added successfully, now update the channel list
        getChannelList();
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
      alert('successfully added');
  };

  return (
    <>
      <h1>documents list</h1>
      {/* two input box value  apply */}
      <input ype='text' placeholder='Enter a Channel Name' value={chName} onChange={(e)=>setChName(e.target.value)}/>
      <br></br>
      <input style={{marginTop:'15px'}} t type='num' placeholder=' Subscribares' value={chSub} onChange={(e)=>setChSub(e.target.value)}/>
      <br></br>
      {/* submit button  */}
      <button style={{marginTop:'15px'}} onClick={postData}>Submit</button>
      <button style={{marginLeft:'20px'}} onClick={updateChannel}>update</button>
      {
        ChannelList.map((channel)=>(
          <div style={{backgroundColor:'bisque'}} key={channel.id}>
            <h1>{channel.channelName}</h1>
            <h5>{channel.sub}</h5>
            <button onClick={()=>deleteChannel(channel.id)}>Delete</button>
            <button onClick={()=>editChannel(channel.id)}>Edit</button>
          </div>

        ))
      }
    </>
  );

}

export default App;
