import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

function Playground() {
  const [text, setText] = useState("Default Text");

  useEffect(() => {
    console.log(`🔵 Schedule "${text}" log`);
    const timeoutId = setTimeout(
      () => console.log(`⏰ "${text}" has been scheduled successfully.`),
      3000
    );

    return () => {
      console.log(`🟡 Cancel "${text}" log`);
      clearTimeout(timeoutId);
    };
  }, [text]);

  return (
    <>
      <label>
        What to log:
        <Input
          type="text"
          placeholder="Enter your text here..."
          onChange={(e) => setText(e.target.value)}
        />
        <h1>{text}</h1>
      </label>
    </>
  );
}

export default function Scheduler() {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button onClick={() => setShow(!show)}>
        {show ? "Mount" : "Unmount"} component
      </Button>

      <button></button>
      {show && <hr />}
      {show && <Playground />}
    </>
  );
}
