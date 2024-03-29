import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Group from "../../models/Group/Group";
import "./groups.css";
import Popup from "../../components/popup/Popup";
import PostForm from "../../components/post-form/PostForm";
import PostDTO from "../../models/PostDTO";
import InviteModulo from "../../components/Group/InviteModulo";
import groupService from "../../services/groupService";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/userSlice";
import PostFeed from "../../components/post/PostFeed";
import api from "../../services/api";
import Profilepicture from "../../components/profilepicture/Profilepicure";
import LoadingIndicatorComponent from "../../components/LoadingIndicator/LoadingIndicatorComponent";
import { searchPosts } from "../../services/postService";
import Search from "../../components/search/Search";

const GroupPage = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const [group, setGroup] = useState({} as Group);
  const [groupMembers, setGroupMembers] = useState<any[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const [posts, setPosts] = useState<PostDTO[]>([])
  const [showPostForm, setShowPostForm] = useState(false);
  const [showInviteModulo, setShowInviteModulo] = useState(false);

  useEffect(() => {
    async function getGroup() {
      if (id) {
        const fetchedGroup = await groupService.getGroup(parseInt(id));
        setGroup(fetchedGroup);
      }
    }
    getGroup();
  }, [id]);


  useEffect(() => {
    async function getGroupPosts() {
    if (id) {
    await groupService.getGroupPosts(parseInt(id))
        .then(data => {
          setIsLoading(false);
          setPosts(data);
        })
      }
    }
    getGroupPosts();
  }, [])


  useEffect(() => {

    async function fetchGroupMembers(members: any[]) {
      try {
        const memberPromises = members.map(async (memberId: string) => {
          const response = await api.get(`/user/${memberId}`);
          return response.data;
        });

        const fetchedMembers = await Promise.all(memberPromises);
        setGroupMembers(fetchedMembers);
      } catch (error) {
        console.error(error);
      }
    }

    if (group.members) {
      fetchGroupMembers(group.members);
    }
  }, [group, user]);

  async function joinGroup() {
    groupService.joinGroup(group.id)
        .then(response => {
          // Update the members list after joining the group
          const newMemberList = [...group.members, user.id];
          setGroup({ ...group, members: newMemberList });
        })
  }

  async function leaveGroup() {
    groupService.leaveGroup(group.id)
        .then(response => {
          // Update the members list after leaving the group
          const newMemberList = group.members.filter(
              (memberId) => memberId !== user.id
          );
          setGroup({ ...group, members: newMemberList });
        })
  }

  const formHandler = (success: boolean) => {
    if(success && id){
      setIsLoading(true);
      groupService.getGroupPosts(parseInt(id))
          .then(data => {
            setIsLoading(false);
            setPosts(data);
            setShowPostForm(false);
          })
    } else {
      setShowPostForm(false);
    }
  }

  function onSearch(searchWord: string) {
    groupService.searchGroupPosts(group.id, searchWord)
    .then((data) => {
      setPosts(data);
    });
  }

  return (
    <div className="group-page">
      {showInviteModulo ? (
        <InviteModulo group={group} setHideInviteModulo={setShowInviteModulo} handler={setGroup} />
      ) : null}
      {showPostForm && (
        <Popup child={<PostForm editing={false} handler={formHandler} />} />
      )}
      <div className="page-header">
        <h1>{group?.name}</h1>
        <button
          className="activity-btn group-join"
          onClick={group.members?.some(member => member === user.id) ? leaveGroup : joinGroup}
        >
          {group.members?.some(member => member === user.id) ? "Leave" : "Join"}
        </button>
      </div>
      <div className="group-desc">
        <p>{group.description}</p>
      </div>
      <div className="member-card">
        <div className="member-card-left">
          <div className="member-icons">
            <div className="participants-event-pic">
              {groupMembers.map((participant, index) => (
                <div
                  className="profilebubble event-profile-pic"
                  key={participant.id}
                  style={{
                    marginLeft: index === 0 ? 0 : -15,
                    zIndex: groupMembers.length - index,
                  }}
                >
                  <Profilepicture
                    profileTheme={user.theme}
                    author={participant}
                    showDetails={true}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="members-count">
            <h4>{`${group?.members?.length}`} members</h4>
          </div>
        </div>
        <div className="member-card-right">
          <button
            className="invite-btn"
            onClick={() => setShowInviteModulo(true)}
          >
            Invite
          </button>
        </div>
      </div>
      <div className="feed-actions">
        <div className="feed-header">
          <h3>Posts</h3>
        </div>
        <div className="feed-actions-right">
          <Search onSearch={onSearch} />
          <button className="activity-btn" onClick={() => setShowPostForm(true)}>
            NEW POST
          </button>
        </div>
      </div>
      <div className="group-feed">
        <PostFeed posts={posts} text={"Be the first to post in " + `${group?.name}`} />
      </div>
    </div>
  );
};
export default GroupPage;
