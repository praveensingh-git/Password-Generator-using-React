import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [Password, setPassword] = useState(" ")


  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "QWERTYUIOPLKJHGFDSAZXCVBNMqwertyuiopasdfghjklzxcvbnm"
    if (numAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%&*_+=-^}{[]`"
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numAllowed, charAllowed ])

  
  //ref hook
  const passwordRef = useRef(null);
  //copy
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    // passwordRef.current?.setSelectionRange(0,9)
    window.navigator.clipboard.writeText(Password)
  }, [Password])

  //useEffect
  useEffect(() => {
    passwordGenerator()
  }, [length, numAllowed, charAllowed, passwordGenerator])
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg  px-2 py-8 my-8 text-orange-500 bg-gray-700'>
        <h1 className='text-lg text-white text-center py-2 ' >PassWord Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type='text'
            value={Password}
            className='outline-none w-full py-1 px-3'
            placeholder='password'
            readOnly
            ref={passwordRef}

          />
          <button onClick={copyPasswordToClipboard}
            className='outlinte-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>COPY</button>
        </div>
        <div className="flex text-sm gap-x-2 justify-between">
          <div className="flex items-center gap-x-1">
            <input type="range"
              min={6}
              max={20}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value)
              }}
            />
            <label >Length:{length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox"
              defaultChecked={numAllowed}
              onChange={() => {
                setNumAllowed((prev) => !prev)
              }} />
            <label htmlFor='numberInput'>  Number </label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox"
              defaultChecked={charAllowed}
              onChange={() => {
                setCharAllowed((prev) => !prev)
              }} />
            <label htmlFor='charInput'>  Character </label>
          </div>

        </div>
      </div>
    </>
  )
}

export default App
