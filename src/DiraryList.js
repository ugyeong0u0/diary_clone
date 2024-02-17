import DiaryItem from "./DiaryItem";

const DiaryList = ({ onEdit, onDelete, diaryList }) => {
  console.log(diaryList);
  return (
    <div className="DiaryList">
      <h2>일기 리스트</h2>
      <h4>{diaryList.length}개 의 일기 존재</h4>
      <div>
        {diaryList.map((it) => (
          // // 큰 div자체도 컴포넌트
          // <div key={it.id}>
          //   <div>작성자 : {it.author}</div>
          //   <div>일기 : {it.content}</div>
          //   <div>작성 시간 : {it.created_date}</div>
          // </div>
          <DiaryItem
            key={it.id}
            {...it}
            onDelete={onDelete}
            onEdit={onEdit}
          ></DiaryItem> // ondelete 던짐
        ))}
      </div>
    </div>
  );
};
// 잘못된 prop이 들어올 경우
DiaryList.defaultProps = {
  diaryList: [],
};
export default DiaryList;
