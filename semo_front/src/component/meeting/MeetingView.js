import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Kakao from "../util/Kakao";

const MeetingView = (props) => {
  const groupNo = props.groupNo;
  const [meeting, setMeeting] = useState({});
  const location = useLocation();

  useEffect(() => {
    axios
      .get("/meeting/view/" + groupNo)
      .then((res) => {
        // console.log(res.data);
        setMeeting(res.data);
      })
      .catch((res) => {
        // console.log(res.response.status);
      });
  }, [groupNo]);

  // D-day 계산을 위한 함수
  const calculateDDay = (targetDate) => {
    const currentDate = new Date();
    const timeDiff = targetDate - currentDate;
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  };
  // D-day를 계산하고 표시
  const dDay = calculateDDay(new Date(meeting.meetingDate));

  //UTC날짜 계산
  const utcDate = new Date(meeting.meetingDate);
  const localDate = new Date(utcDate);
  // 날짜 형식 지정
  const year = localDate.getFullYear() % 100; // 년도를 10의 자리 숫자로 표현
  const month = localDate.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더함
  const day = localDate.getDate();
  const hours = localDate.getHours();
  const minutes = localDate.getMinutes();
  const ampm = hours >= 12 ? "오후" : "오전";
  const formattedHours = hours % 12 || 12; // 0시를 12시로 표시
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const justDate = `${year}년 ${month}월 ${day}일 `;
  const localTime = `${year}년 ${month}월 ${day}일 ${ampm} ${formattedHours}:${formattedMinutes}`;
  return (
    <div className="meetingView-frm">
      <h2 className="meetingView-title">정기 모임</h2>
      <div className="meetingView-content">
        <div>
          <h3 className="meeting-Dday">
            날짜 &nbsp; : &nbsp; {justDate} <span>D - {dDay} </span>
          </h3>
          <div className="meeting-content">
            모임내용 &nbsp; : {meeting.meetingName} &nbsp;{" "}
          </div>
        </div>
        <div className="meeting-date">일시 &nbsp; :&nbsp; {localTime} </div>
        <div className="meeting-price">
          금액 &nbsp; :&nbsp;{meeting.meetingPrice}{" "}
        </div>
        <div className="meeting-memberNum">
          참여수&nbsp; :&nbsp; {meeting.meetingMember} /{meeting.meetingMaxnum}
        </div>
        <div className="meeting-place">
          장소 &nbsp; :&nbsp; {meeting.meetingPlace}
          <Kakao
            data={meeting.meetingPlace}
            setData={setMeeting.meetingPlace}
          />
        </div>
      </div>
    </div>
  );
};

export default MeetingView;
