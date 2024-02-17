import React, { useState, useEffect, useReducer } from "react";

const UnmountTest = () => {
  useEffect(() => {
    console.log("sub Commponent Mount");
    return () => {
      console.log("Sub Component Unmount"); // 리턴을 Effect안에 장성시에 unmount의미
    };
  }, []);
  return <div>언마운트 테스트 컴포넌트</div>; // 원래 컴포넌트가 반환하는 뷰
};

const LifeCycle = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  const [isVisible, setIsVisible] = useState(false);
  const toggle = () => setIsVisible(!isVisible);

  useEffect(() => {
    console.log("mount");
  }, []); // 카운터+1 누르면 리랜더링 되지만 컴포넌트가 마운트 될때만 호출됨, 배열 변화는 없어서
  useEffect(() => {
    console.log("update");
  }); // 업데이트 되는 순간 계속 호출됨

  useEffect(() => {
    console.log(`count is update: ${count}`);
    if (count > 5) {
      alert("카운트가 5가 넘어 초기화 하겠다");
      setCount(0);
    }
  }, [count]); // 카운트가 업데이트 될때 마다 update 출력

  useEffect(() => {
    console.log(`text is update ${text}`);
  }, [text]); // 감지하고 싶은것만 감지 가능해서 그 값이 변화하는 순간에만 콜백함수 수행할 수 있게 함

  return (
    <div>
      <div>
        {count}
        <button onClick={() => setCount(count + 1)}>count up</button>
      </div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></input>
      <button onClick={toggle}>on/off</button>
      {isVisible && <UnmountTest />}
    </div>
  );
};

export default LifeCycle;
