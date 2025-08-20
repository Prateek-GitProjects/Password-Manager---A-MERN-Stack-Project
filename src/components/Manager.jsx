import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { ToastContainer, Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

// 🔹 Hook for typing animation
function usePlaceholderTyper(
  words,
  { typeSpeed = 90, deleteSpeed = 50, pauseAtEnd = 1200, pauseBetween = 500 } = {}
) {
  const inputRef = useRef(null)

  useEffect(() => {
    const el = inputRef.current
    if (!el || words.length === 0) return

    let wordIndex = 0
    let charIndex = 0
    let deleting = false
    let timer

    const tick = () => {
      const current = words[wordIndex]

      if (!deleting) {
        charIndex++
        el.placeholder = current.slice(0, charIndex)
        if (charIndex === current.length) {
          deleting = true
          timer = setTimeout(tick, pauseAtEnd)
          return
        }
        timer = setTimeout(tick, typeSpeed)
      } else {
        charIndex--
        el.placeholder = current.slice(0, charIndex)
        if (charIndex === 0) {
          deleting = false
          wordIndex = (wordIndex + 1) % words.length
          timer = setTimeout(tick, pauseBetween)
          return
        }
        timer = setTimeout(tick, deleteSpeed)
      }
    }

    tick()
    return () => clearTimeout(timer)
  }, [words])

  return inputRef
}
const Manager = () => {
  const ref = useRef()
  const passwordRefr = useRef()
  const [form, setform] = useState({ site: "", username: "", password: "" })
  const [passwordArray, setpasswordArray] = useState([])

  const getPasswords = async () => {
    let req = await fetch("http://localhost:3000/")
    let passwords = await req.json()
    setpasswordArray(passwords)
  }

  useEffect(() => {
    getPasswords()
  }, [])

  const copytext = (text) => {
    toast('Copied to clipboard', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark"
    });
    navigator.clipboard.writeText(text)
  }

  const showPassword = () => {
    passwordRefr.current.type = "text"
    if (ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eye.png"
      passwordRefr.current.type = "password"
    }
    else {
      ref.current.src = "icons/eyecross.png"
      passwordRefr.current.type = "text"
    }
  }

const savePassword = async () => {
  if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
    // if form has an id, update
    if (form.id) {
      await fetch("http://localhost:3000/edit", { 
        method: "PUT", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify(form) 
      });

      // update frontend state
      setpasswordArray(passwordArray.map(p => 
        p.id === form.id ? { ...form } : p
      ));

      toast('Password Updated', {
        position: "top-right",
        autoClose: 5000,
        theme: "dark"
      });
    } else {
      // else create new
      const newPassword = { ...form, id: uuidv4() };
      await fetch("http://localhost:3000/", { 
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify(newPassword) 
      });

      setpasswordArray([...passwordArray, newPassword]);

      toast('Password Saved', {
        position: "top-right",
        autoClose: 5000,
        theme: "dark"
      });
    }

    setform({ site: "", username: "", password: "" });
  } else {
    toast('Error: Password not saved!');
  }
};

  const deletePassword = async (id) => {
    let c = confirm("Do you really want to delete this password?")
    if (c) {
      setpasswordArray(passwordArray.filter(item => item.id !== id))
      await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })

    }
    toast('Password Deleted', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark"
    });
  }

const editPassword = (id) => {
  const selected = passwordArray.find(i => i.id === id);
  if (selected) {
    setform({ ...selected });  // keep id in form
  }
};


  // 🎯 Words for placeholder animation
  const inputRef = usePlaceholderTyper([
    "Enter Site Name",
    "geeksforgeeks.com",
    "CodeHustle.io",
    "Github.com",
    "Instagram.com"
  ])

  const usernameRef = usePlaceholderTyper([
    "Enter Username",
    "john_doe",
    "prateek123"
  ])

  const passwordRef = usePlaceholderTyper([
    "********",
    "pass@123"
  ])



  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <div>
        <div className="absolute inset-0 -z-10 h-full w-full  ">
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
        </div>

        <div className="p-3 md:mycontainer min-h-[78.5vh]">
          <h1 className="text-4xl font-bold text-center">
            <span className="text-green-500">&lt;</span>
            <span>Pass</span>
            <span className="text-green-500">OP/&gt;</span>
          </h1>

          <p className="text-green-900 text-lg text-center">Your own Password Manager</p>

          <div className="flex flex-col p-4 text-black gap-8 items-center">
            {/* 🔹 Input with animated placeholder */}
            <input value={form.site} onChange={handleChange} ref={inputRef} name='site' className="mix w-full h-8 p-4 py-1" type="text" id='site' />
            <div className="flex flex-col md:flex-row w-full gap-8 justify-between">
              <input value={form.username} onChange={handleChange} className="mix w-full h-8 p-4 py-1" ref={usernameRef} name='username' type="text" id='username' />
              <div className="relative">
                <input ref={(el) => {
                  passwordRefr.current = el
                  passwordRef.current = el
                }} value={form.password} onChange={handleChange} className="mix w-full h-8 p-4 py-1" name='password' type="password" id='password' />
                <span className='absolute right-[2px] top-[1px] cursor-pointer' onClick={showPassword}>
                  <img ref={ref} className='p-1' width={30} src="icons/eye.png" alt="" />
                </span>
              </div>
            </div>
            <button onClick={savePassword} className=" bg-green-500 gap-2 hover:bg-green-400 text-white px-8 py-1 mix1 flex justify-center items-center w-fit">
              <lord-icon
                src="https://cdn.lordicon.com/jgnvfzqg.json"
                trigger="loop" >
              </lord-icon>
              Save Password
            </button>
          </div>
          <div className="passwords">
            <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
            {passwordArray.length === 0 && <div> No passwords to show</div>}
            {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden mb-10">
              <thead className='bg-green-800 text-white'>
                <tr>
                  <th className='py-2'>Site</th>
                  <th className='py-2'>Username</th>
                  <th className='py-2'>Password</th>
                  <th className='py-2'>Actions</th>
                </tr>
              </thead>
              <tbody className='bg-green-100'>
                {
                  passwordArray.map((item, index) => {
                    return <tr key={index}>
                      <td className='  text-center border border-white py-2'>
                        <div className='flex justify-center items-center'>
                          <a className='cursor-pointer' href={item.site.startsWith("http") ? item.site : `https://${item.site}`} target='_blank'>{item.site}</a>
                          <div className=' lordiconcopy size-7 cursor-pointer' onClick={() => { copytext(item.site) }}>
                            <lord-icon
                              style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover" >
                            </lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className='py-2 border border-white text-center'>
                        <div className='flex items-center justify-center '>
                          <span>{item.username}</span>
                          <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copytext(item.username) }}>
                            <lord-icon
                              style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover" >
                            </lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className='py-2 border border-white text-center'>
                        <div className='flex items-center justify-center '>
                          <span>{"*".repeat(item.password.length)}</span>
                          <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copytext(item.password) }}>
                            <lord-icon
                              style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover" >
                            </lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className='justify-center py-2 border border-white text-center'>
                        <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
                          <lord-icon
                            src="https://cdn.lordicon.com/gwlusjdu.json"
                            trigger="hover"
                            style={{ "width": "25px", "height": "25px" }}>
                          </lord-icon>
                        </span>
                        <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}>
                          <lord-icon
                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="hover"
                            style={{ "width": "25px", "height": "25px" }}>
                          </lord-icon>
                        </span>
                      </td>
                    </tr>
                  })}
              </tbody>
            </table>}
          </div>
        </div>
      </div>
    </>
  )
}

export default Manager
