import React, { useCallback, useState, type Dispatch, type SetStateAction } from "react";
import "@/styles/MainLayout.css";
import { useQuery } from "@tanstack/react-query";
import { getAllJoinedServers } from "@/util/tanstack/quries/readQuries";
import type { ServerDTO } from "@/types/auth.types";
import { useNavigate } from "react-router";
const ServerSideBar = () => {
  console.log("ServerSideBar()");
  const { data: Allservers } = useQuery(getAllJoinedServers);
  const [showAddServerPopup, setShowAddServerPopup] = useState<Boolean>(false);
  const navigate = useNavigate();
  const changeUrl = useCallback((id: string) => {
    navigate(id);
  }, []);
  return (
    <aside className="ServersideBarList">
      {Allservers?.servers.map((s: ServerDTO) => (
        <ServerIcon
          key={s.id}
          id={s.id!}
          changeUrl={changeUrl}
          iconUrl={s.iconUrl!}
          name={s.name}
        />
      ))}
      <div className="ServerIcon" onClick={() => setShowAddServerPopup(true)}>
        <img src="" alt={"addS"} />
      </div>
      {showAddServerPopup && <AddServer setClosePopup={setShowAddServerPopup} />}
    </aside>
  );
};
const ServerIcon = React.memo(
  ({
    id,
    iconUrl,
    name,
    changeUrl,
  }: {
    id: string;
    iconUrl: string;
    name: string;
    changeUrl: (id: string) => void;
  }) => {
    return (
      <div className="ServerIcon" onClick={() => changeUrl(id)}>
        <img src={iconUrl} alt={name} />
      </div>
    );
  },
);
const AddServer = ({ setClosePopup }: { setClosePopup: Dispatch<SetStateAction<Boolean>> }) => {
  return (<>
    <div className="addServerBoxContainer">hello</div>
  </>)
}
export default ServerSideBar;
