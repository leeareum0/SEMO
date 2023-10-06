import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BoardFrm from "./GrBoardFrm";
import axios from "axios";
import Swal from "sweetalert2";

const GrBoardModify = () => {
  const location = useLocation();
  const grBoard = location.state.grBoard;
  console.log(grBoard);
  //제목,내용 -> 전송용 데이터를 담을 state
  const [GrBoardTitle, setGrBoardTitle] = useState(grBoard.GrboardTitle);
  const [GrBoardContent, setGrBoardContent] = useState(grBoard.GrboardContent);
  const [boardFile, setBoardFile] = useState([]);
  //기존의 이미지,파일리스트 사용
  const [boardImg, setBoardImg] = useState(grBoard.boardImg); //삭제파일용(추가)
  const navigate = useNavigate();

  //수정하기 클릭시 동작할 함수
  const modify = () => {
    const form = new FormData();
    //boardNo 필수
    form.append("grBoardNo", grBoard.grBoardNo);
    form.append("grBoardTitle", GrBoardTitle);
    form.append("grBoardContent", GrBoardContent);
    form.append("grBoardImg", boardImg);
    const token = window.localStorage.getItem("token");
    axios
      .post("/groupBoard/modify", form, {
        headers: {
          contentType: "muitlpart/form-data",
          processDate: false,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.data === 1) {
          navigate("/groupBoard");
        } else {
          Swal.fire(
            "수정 중 문제가 발생하였습니다. 잠시 후 다시 시도해주세요."
          );
        }
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  };
  return (
    <div>
      <div className="board-frm-title">게시물 수정</div>
      <BoardFrm
        GrboardTitle={GrBoardTitle}
        setBoardTitle={setGrBoardTitle}
        GrboardContent={GrBoardContent}
        setGrboardContent={setGrBoardContent}
        boardFile={boardFile}
        setBoardFile={setBoardFile}
        boardImg={boardImg}
        setBoardImg={setBoardImg}
        buttonEvent={modify}
        type="modify"
      />
    </div>
  );
};
export default GrBoardModify;
