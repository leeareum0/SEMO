import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BoardFrm from "./GrBoardFrm";
import axios from "axios";
import Swal from "sweetalert2";

const GrBoardModify = () => {
  const location = useLocation();
  const board = location.state.board;
  //제목,내용 -> 전송용 데이터를 담을 state
  const [GrBoardTitle, setGrBoardTitle] = useState(board.GrboardTitle);
  const [GrBoardContent, setGrBoardContent] = useState(board.GrboardContent);
  const [boardFile, setBoardFile] = useState([]);
  //boardImg -> 썸네일 미리보기용, fileList -> 첨부파일 목록 출력용
  //기존의 이미지,파일리스트 사용
  const [boardImg, setBoardImg] = useState(board.boardImg);

  const [fileList, setFileList] = useState(board.fileList);
  const [delFileNo, setDelFileNo] = useState([]); //삭제파일용(추가)
  const navigate = useNavigate();

  //수정하기 클릭시 동작할 함수
  const modify = () => {
    const form = new FormData();
    //boardNo 필수
    form.append("boardNo", board.boardNo);
    form.append("boardTitle", GrBoardTitle);
    form.append("boardDetail", GrBoardContent);
    form.append("boardImg", boardImg);
    for (let i = 0; i < boardFile.length; i++) {
      form.append("boardFile", boardFile[i]);
    }
    //join 문자열로 합치기
    form.append("delFileNo", delFileNo.join("/"));
    const token = window.localStorage.getItem("token");
    axios
      .post("/board/modify", form, {
        headers: {
          contentType: "muitlpart/form-data",
          processDate: false,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.data === 1) {
          navigate("/board");
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
        fileList={fileList}
        setFileList={setFileList}
        buttonEvent={modify}
        delFileNo={delFileNo}
        setDelFileNo={setDelFileNo}
        type="modify"
      />
    </div>
  );
};
export default GrBoardModify;
