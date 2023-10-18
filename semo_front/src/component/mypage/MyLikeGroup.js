import { Avatar, AvatarGroup } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const MyLikeGroup = (props) => {
  const member = props.member;
  const [group, setGroup] = useState([]);
  useEffect(() => {
    axios
      .post("/group/myLikeGroup", member)
      .then((res) => {
        // console.log("1: " + res.data);
        setGroup(res.data);
      })
      .catch((res) => {
        // console.log("catch2: " + res.response.status); 문제생기면 500에러 떴을때 메인페이지
      });
    // console.log(group);
  }, []);

  return (
    <div className="groupList-wrap">
      <div className="group-item-wrap">
        {group.map((group, index) => {
          return <MypageItem key={"GroupItem" + index} group={group} />;
        })}
      </div>
    </div>
  );
};
const MypageItem = (props) => {
  const group = props.group;
  const [peopleList, setPeopleList] = useState([]);
  const [peopleCount, setPeopleCount] = useState(0);
  const navigate = useNavigate();
  const groupView = () => {
    navigate("/group/view", { state: { groupNo: group.groupNo } });
  };
  useEffect(() => {
    axios
      .get("/group/groupPeopleList/" + group.groupNo)
      .then((res) => {
        // console.log(res.data);
        setPeopleList(res.data.peopleList);
        setPeopleCount(res.data.peopleCount);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, []);
  return (
    <div className="feed-group-item" onClick={groupView}>
      <div className="feed-group-img">
        <img src={"/group/" + group.groupImg} />
      </div>
      <div className="feed-group-right">
        <div className="feed-group-category">
          <Link to="#">
            {group.groupCategory === 1
              ? "#문화·예술"
              : group.groupCategory === 2
              ? "#운동·액티비티"
              : "#푸드·드링크"}
          </Link>
        </div>
        <div className="feed-group-name">{group.groupName}</div>
        <div className="feed-group-local">
          <span className="material-icons">location_on</span>
          {group.groupLocal === 1
            ? "서울"
            : group.groupLocal === 2
            ? "경기"
            : "부산"}
        </div>
        <div className="feed-group-member">
          <div className="feed-like-person-wrap">
            <AvatarGroup max={7} total={peopleCount}>
              {peopleList.map((people, index) => {
                return people.peopelImg === null ? (
                  <Avatar
                    key={"groupAvatar" + index}
                    sx={{ width: 22, height: 22 }}
                    alt="Remy Sharp"
                    src="/image/person.png"
                  />
                ) : (
                  <Avatar
                    key={"groupAvatar" + index}
                    sx={{ width: 22, height: 22 }}
                    alt="Remy Sharp"
                    src={"/member/" + people.memberImg}
                  />
                );
              })}
            </AvatarGroup>
          </div>
          <div className="feed-group-maxNum">
            <span className="material-icons">groups</span>
            {peopleCount}/{group.groupMaxnum}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyLikeGroup;
