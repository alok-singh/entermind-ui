import iconMap from "../../icons/lucid-icons";

const Tabs = (props) => {
  return (
    <div className="bg-[#f0f2f8] text-[10.5px] p-[3px] w-fit items-center justify-center rounded-xl flex">
      {props.tabs.map((tab, index) => {
        return (
          <div
            key={tab.title}
            onClick={() => props.setSelectedTabIndex(index)}
            className={`rounded-xl flex items-center gap-1 pt-[3.5px] pb-[3.5px] pr-[7px] pl-[7px] cursor-pointer ${
              props.selectedTabIndex === index ? "bg-white" : ""
            }`}
          >
            {tab.icon ? <div className="icon">{iconMap[tab.icon](tab.iconProps)}</div> : null}
            <div className="title">{tab.title}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Tabs;