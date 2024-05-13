import { useCallback, useEffect, useRef, useState } from "react";
import { IoCopyOutline } from "react-icons/io5";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passRef = useRef(null);

  const passGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) {
      str += "0123456789";
    }

    if (charAllowed) {
      str += "~!@#$%^&*()-_=+[{]}|;:',<.>?";
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPassToClipboard = useCallback(() => {
    passRef.current?.select();
    passRef.current?.setSelectionRange(0, 32)
    window.navigator.clipboard.writeText(password);
  }, [password])

  useEffect(() => {
    passGenerator();
  }, [length, numberAllowed, charAllowed, passGenerator]);

  return (
    <div className="font-raleway">
      <h1 className="text-3xl font-semibold  text-center text-white mt-32">
        Generate Your Random Password{" "}
      </h1>

      <div className="w-full max-w-md md:max-w-lg lg:max-w-lg mx-auto shadow-2xl rounded-lg px-8 py-7 my-12 text-sky-600 font-semibold backdrop-blur-sm bg-white/30">
        <div className="flex shadow-lg rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full px-5 py-5"
            placeholder="password"
            ref={passRef}
            readOnly
          />
          <button onClick={copyPassToClipboard}  className="relative w-16 overflow-hidden bg-sky-300 mr-1 rounded-r-md text-neutral-900 font-semibold shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-sky-600 before:transition-all before:duration-500 hover:text-white hover:shadow-sky-600 hover:before:left-0 hover:before:w-full ">
          <span className="relative z-10 left-5">
            <IoCopyOutline />
          </span>
            
          </button>
        </div>
        <div className="flex text-sm gap-x-3">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={32}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label className="text-neutral-800">Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput" className="text-neutral-800">Numbers</label>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={charAllowed}
                id="characterInput"
                onChange={() => {
                  setCharAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="characterInput" className="text-neutral-800">Characters</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

