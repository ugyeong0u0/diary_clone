import DiaryList from "./DiraryList";
import { useState, useRef } from "react";
const DiaryItem = ({
  onEdit,
  onDelete,
  author,
  content,
  created_date,
  emotion,
  id,
}) => {
  console.log(DiaryList);

  const [isEdit, setIsEdit] = useState(false); // 수정하기 여부
  const toggleIsEdit = () => setIsEdit(!isEdit); // 수정하기 반대로 되게

  const [localContent, setLocalContnet] = useState(content); // 처음 초기값만 content임
  const localContentInput = useRef(); // 5자 이하면 focus주려고
  const handleQuitEdit = () => {
    // 수정하기 나가더라도 totalContent값은 변경된 그 상태라서 초기화안됨
    setIsEdit(false);
    setLocalContnet(content);
  };

  const handleEdit = () => {
    if (localContent.length < 5) {
      localContentInput.current.focus();
      return;
    }

    if (window.confirm(`${id}번 째 일기를 수정하겠습니까?`)) {
      onEdit(id, localContent);
      toggleIsEdit();
    }
  };

  return (
    <div className="DiaryItem">
      <div className="info">
        <span>
          작성자 : {author} | 감정 점수 : {emotion}
        </span>
        <div />
        <span className="date">{new Date(created_date).toLocaleString()}</span>
      </div>
      <div className="content">
        {isEdit ? (
          <>
            <textarea
              ref={localContentInput}
              value={localContent}
              onChange={(e) => setLocalContnet(e.target.value)}
            />
          </>
        ) : (
          <>{content}</>
        )}
      </div>

      {isEdit ? ( // 수정할때랑 안할때 글자다름
        <>
          <button onClick={handleQuitEdit}>수정취소</button>
          <button onClick={handleEdit}>수정완료</button>
        </>
      ) : (
        <>
          <button
            onClick={() => {
              if (window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)) {
                onDelete(id); // 확인을 눌렀다면
              }
            }}
          >
            {" "}
            삭제하기
          </button>

          <button onClick={toggleIsEdit}>수정하기</button>
        </>
      )}
    </div>
  );
};
export default DiaryItem;
