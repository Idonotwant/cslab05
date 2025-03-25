import { useState, useEffect } from "react";
import "./App.css";
import selfie from "./selfie.jpg";

function App() {
  const [page, setPage] = useState(0);
  const [nViewers, setNViewers] = useState(0);
  const [forminput, setForminput] = useState({ name: "", message: "" });
  const [comments, setComments] = useState([]);

  const handleFormInputChange = ({ target: { name, value } }) => {
    setForminput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormInputSubmit = (event) => {
    setComments((prev) => [...prev, forminput]);
    setForminput({ name: "", message: "" });
    event.preventDefault();
  };

  useEffect(() => {
    let viewCount = localStorage.getItem("viewCount") || 0;
    viewCount++;
    setNViewers(viewCount);
    localStorage.setItem("viewCount", viewCount);
  }, []);
  return (
    <div className="bg-white h-screen w-screen">
      <div className="flex flex-row w-full h-10">
        <div className="flex flex-row w-3/5 bg-amber-800">
          <div>網路攻防實習</div>
          <button
            onClick={() => {
              setPage(0);
            }}
          >
            About
          </button>
          <button
            onClick={() => {
              setPage(1);
            }}
          >
            Chat
          </button>
          <div>參觀人數</div>
          <div>{nViewers}</div>
        </div>
        <div className="flex flex-row-reverse w-2/5 bg-amber-800">
          <button>Login</button>
          <button>Sign up</button>
        </div>
      </div>
      {page === 0 ? (
        <>
          <div className="flex flex-row w-full h-full">
            <div className="w-1/3 h-full flex justify-center pt-10 bg-yellow-300">
              <img src={selfie} className="w-36 h-48"></img>
            </div>
            <div className="w-2/3 h-full pt-20 pl-20 bg-blue-300">
              <p className="text-left">
                大家好，我是陳威儒，目前就讀台大電機資安所
              </p>
              <p className="text-left">興趣是彈鋼琴、看小說</p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col w-full h-full bg-cyan-500">
            <form
              className="w-full bg-emerald-600"
              onSubmit={handleFormInputSubmit}
            >
              <input
                name="name"
                value={forminput.name}
                placeholder="name"
                onChange={handleFormInputChange}
                className="w-1/5 text-left"
              />
              <input
                name="message"
                value={forminput.message}
                placeholder="message"
                onChange={handleFormInputChange}
                required={true}
                className="w-3/5 text-left"
              />
              <input type="submit" value="submit" className="w-1/5 text-left" />
            </form>
            {comments.map((comment, index) => (
              <div
                key={index}
                className="bg-cyan-600 border-4 border-black rounded-lg"
              >
                <p className="w-full text-left rounded-lg">
                  {comment.name === "" ? "Anonymous" : comment.name}
                </p>
                <p className="w-full text-left h-10 bg-amber-300 rounded-lg mt-2 ml-4 pl-1">
                  {comment.message}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
