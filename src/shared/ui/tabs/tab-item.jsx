export const TabItem = ({ tab, index, activeTab, setActiveTab }) => {
    return (
        <button
            className={`itemDetailedInfo ${index === activeTab ? "btn_tabs selected" : "btn_tabs"}`}
            value={index}
            onClick={() => setActiveTab(index)}
        >
            {tab}
        </button>
    );
};