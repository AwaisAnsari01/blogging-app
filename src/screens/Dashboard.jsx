import React, { useEffect, useRef, useState } from 'react'



import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { collection, query, where, getDocs, addDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebaseConfig/firebaseMethod';
import Swal from 'sweetalert2';




function Dashboard() {

  let navigate = useNavigate()
  let title = useRef()
  let description = useRef()

  let [blogArr, setBlogArr] = useState([])
  let [userUid, setUserUid] = useState(null)
  let [pic, setPic] = useState(null)
  let [username, setUsername] = useState(null)
  let [docId, setDocId] = useState("")

  
  async function getDataFromFirestore() {

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        setUserUid(user.uid)


        
        const q = query(collection(db, "users"), where("uid", "==", uid));
        const usersSnapshot = await getDocs(q);
        let userOne = [];
        usersSnapshot.forEach((doc) => {
         
          setPic(doc.data().userPic)
          setUsername(doc.data().firstName)

          userOne.push(doc.data());

        });


       
        const q2 = query(collection(db, "Blogs"), where("uid", "==", uid));
        const blogsSnapshot = await getDocs(q2);
        let Blogs = [];
        blogsSnapshot.forEach((doc) => {
          console.log(doc.id);
          Blogs.push({ ...doc.data(), id: doc.id });

          setDocId(doc.id)
        })

        setBlogArr(Blogs);
        console.log(Blogs);

      }

      else {
        console.log("no data");
      }
    });

  }

  
  useEffect(() => {
    getDataFromFirestore()
  }, [])


  
  async function addBlog(event) {
    event.preventDefault()
    console.log(username);

    const docRef = await addDoc(collection(db, "Blogs"), {
      title: title.current.value,
      description: description.current.value,
      uid: userUid,
      pic: pic,
      name: username,
      id: docId
    });
    console.log("Document written with ID: ", docRef.id);

  

    Swal.fire({
      title: "Good job!",
      text: "Blog successfully added!",
      icon: "success"
    }).then(() => {
     
      window.location.reload();
    });

    console.log(blogArr);

  }


  
  async function deleteBlog(index, id) {
    console.log(id);

    blogArr.splice(index, 1)
    setBlogArr([...blogArr])

    Swal.fire({
      text: "Blog successfully deleted!",
      icon: "success"
    })

    await deleteDoc(doc(db, "Blogs", id));
  }



  
  return (
    <>
      <div className=" l-bg l-color shadow-md w-[70rem] mt-[2rem] mx-auto py-4 px-[5rem]">
        <h2 className="form-title text-[2rem] text-center">Create a New Blog Post</h2>
        <form className="form" onSubmit={addBlog}>
  
          <input
            type="text"
            className=" text-[1.3rem] border-[.1rem] border-[#8f8f8f] p-2  block black-color w-[60rem] rounded-lg  mx-auto px-[1.3rem] py-[1rem] mt-[1.4rem]"
            ref={title}
            placeholder='Title'
            name="title" />
  
          <textarea className="mt-[2rem]  border-[.1rem] border-[#8f8f8f] text-[1.3rem] w-[60rem] rounded-lg block mx-auto px-[1.3rem] py-[1rem] black-color"
            placeholder='Description'
            name="description"
            ref={description}
            rows="4"
          ></textarea>

          <button type="submit" className="mt-[2rem] black-bg text-white 2-color block ms-auto  p-3 rounded-lg">Publish Blog</button>
        </form>
      </div>

    
      <div className=' my-5 '>
        {blogArr && blogArr.map((item, index) => {
          return (
            <div className='w-[1050px] border-[.1rem] border-[#d8d7d7]  p-5 mx-auto l-bg shadow-lg rounded-lg overflow-hidden mt-5' key={index}>

              
              <div className='flex items-center justify-start p-4 l-bg rounded-md'>
                <img src={item.pic} className='h-[80px] w-[80px] object-contain rounded-full mr-4 shadow-lg shadow-slate-800' alt="Profile" />
                <div>
                  <p className='text-[1.6rem] font-semibold capitalize text-gray-800'> {item.name}</p>
                </div>
              </div>

             
              <div className='p-4 text-left'>
                <h2 className='text-[1.5rem] mt-3 font-[600] capitalize text-black'><span className='font-bold '></span> {item.title}</h2>
                <p className='text-[1.2rem]  mt-3'><span className='font-semibold'></span> {item.description}</p>
                <button
                  onClick={() => deleteBlog(index, item.id)}
                  className='mt-[1.5rem]   black-color hover:text-[#9f81f3] font-bold w-[4rem] rounded-lg '>delete</button>
              </div>
            </div>

          )
        })
        }
      </div>

    </>

  )
}

export default Dashboard