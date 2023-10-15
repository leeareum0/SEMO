import { colors } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";

const GroupSave = (props) => {
  const groupNo = props.groupNo;
  const groupSave = props.groupSave;
  const setGroupSave = props.setGroupSave;
  const groupSaveClick = (e) => {
    e.stopPropagation(); // 부모 컴포넌트의 onClick 막기

    const token = window.localStorage.getItem("token");
    axios
      .post("/group/save/toggle/" + groupNo, null, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          Swal.fire("찜모임에 추가되었습니다.");
          setGroupSave(true);
        } else {
          Swal.fire("찜모임에서 삭제되었습니다.");
          setGroupSave(false);
        }
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  };

  return (
    <>
      {groupSave ? (
        <span
          className="material-icons"
          style={{ color: "red" }}
          onClick={groupSaveClick}
        >
          favorite
        </span>
      ) : (
        <span className="material-icons" onClick={groupSaveClick}>
          favorite_border
        </span>
      )}
    </>
  );
};
export default GroupSave;