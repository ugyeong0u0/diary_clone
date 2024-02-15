import DiaryList from "./DiraryList";

const DiaryItem = ({
  onDelete,
  author,
  content,
  created_date,
  emotion,
  id,
}) => {
  console.log(DiaryList);
  return (
    <div className="DiaryItem">
      <div className="info">
        <span>
          작성자 : {author} | 감정 점수 : {emotion}
        </span>
        <div />
        <span className="date">{new Date(created_date).toLocaleString()}</span>
      </div>
      <div className="content"> {content}</div>
      <button
        onClick={() => {
          if (window.confirm("${id}번째 일기를 정말 삭제하시겠습니까?")) {
            onDelete(id); // 확인을 눌렀다면
          }
        }}
      >
        {" "}
        삭제하기
      </button>
    </div>
  );
};
export default DiaryItem;
