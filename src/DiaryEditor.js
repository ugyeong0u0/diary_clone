import { useRef, useState } from "react";
const DiaryEditor = () => {
  const authorInput = useRef(); // html 돔 접근 요소 반환 ,React.MutableRefObject
  const contentInput = useRef();
  const [state, setState] = useState({
    author: "",
    content: "",
    emotion: 1,
  });

  const handleChangeState = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    setState({
      ...state,
      [e.target.name]: e.target.value, // 동적으로 값을 넣어주는 의미에서 []
    });
  };
  // const [author, setAuthor] = useState("");
  // const [content, setContent] = useState("");
  const handleSubmit = () => {
    console.log(state);
    if (state.author.length < 1) {
      // alert("작성자는 최소 1글자 이상 작성필요");
      // 어떤 돔 요소에 적용? -> useRef가 알려줌
      authorInput.current.focus();
      return;
    }
    if (state.content.length < 5) {
      // alert("5자 이상 내용입력");
      contentInput.current.focus();
      return;
    }
    alert("저장성공");
  };
  return (
    <div className="DiaryEditor">
      <h2>오늘의 일기</h2>
      <div>
        <input
          ref={authorInput}
          name="author"
          value={state.author}
          onChange={handleChangeState}
        />
      </div>
      <div>
        <textarea
          ref={contentInput}
          name="content"
          value={state.content}
          onChange={handleChangeState}
        />
      </div>
      <div>
        <span>오늘의 감정 점수</span>
        <select
          name="emotion"
          value={state.emotion}
          onChange={handleChangeState}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <div>
        <button onClick={handleSubmit}>일기 저장하기</button>
      </div>
    </div>
  );
};
export default DiaryEditor;
