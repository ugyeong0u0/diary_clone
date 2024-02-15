import DiaryList from "./DiraryList";

const DiaryItem = ({ author, content, created_date, emotion, id }) => {
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
    </div>
  );
};
export default DiaryItem;
