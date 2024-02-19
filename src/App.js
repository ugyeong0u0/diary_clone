import logo from "./logo.svg";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiraryList";
import { useEffect, useMemo, useRef, useState } from "react";
import LifeCycle from "./LifeCycle";

// 데이터 객체를 리스트로
const dummyList = [
  {
    id: 1,
    author: "이유경",
    content: "하이1",
    emotion: 5,
    created_date: new Date().getTime(),
  },
  {
    id: 2,
    author: "이유경",
    content: "하이1",
    emotion: 5,
    created_date: new Date().getTime(),
  },
  {
    id: 3,
    author: "이유경",
    content: "하이1",
    emotion: 5,
    created_date: new Date().getTime(),
  },
];

function App() {
  const [data, setData] = useState([]); // 빈배열로 초기화
  const dataId = useRef(0); // 0으로 초기화

  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());

    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1, // 랜덤이 정수가 아니라서 floor
        created_date: new Date().getTime() + 1,
        id: dataId.current++,
      };
    });
    setData(initData);
  };

  useEffect(() => {
    setTimeout(() => {
      getData();
    }, 1500);
  }, []); // 마운트 시 데이터 불러오기

  const onCreate = (author, content, emotion) => {
    // DiaryEditor에서 클릭시 실행
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };
    dataId.current += 1; // useRef를 사용하면 컴포넌트의 전생애주기 동안 지속되는 불변의 값을 저장하는데 사용됨
    // 객체에.current 속성을 통해 접근가능
    setData([newItem, ...data]); // 새로운 data가 먼저 보여야함, 기존 데이터는 뒤에 보이게
  };

  // 삭제하기
  const onDelete = (targetId) => {
    console.log("${targetId}가 삭제되었습니다.");
    const newDiaryList = data.filter((it) => it.id !== targetId);
    setData(newDiaryList); // 타겟 id 게시글 제외 출력
  };

  const onEdit = (targetId, newContent) => {
    // 수정하기 시에 쓰임
    setData(
      data.map(
        (it) => (it.id === targetId ? { ...it, content: newContent } : it) // id가 같을 경우에 나머진 그래도 content만 newContent로 변경
      ) // *****
    );
  };

  // 개수 변화가 있으면 감정 재분류
  const getDiaryAnalysis = useMemo(() => {
    console.log("일기 분석 시작");
    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / badCount) * 100;
    return { goodCount, badCount, goodRatio };
  }, [data.length]);
  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  return (
    <div className="App">
      {/* <LifeCycle /> */}
      <div>천체일기 : {data.length}</div>
      <div>기분 좋은 일기 개수 : {goodCount}</div>
      <div>기분 나쁜 일기 개수 : {badCount}</div>
      <div>기분좋은/ 나쁜 비율 : {goodRatio}</div>
      <DiaryEditor onCreate={onCreate} />
      <DiaryList onEdit={onEdit} onDelete={onDelete} diaryList={data} />
    </div>
  );
}

export default App;
