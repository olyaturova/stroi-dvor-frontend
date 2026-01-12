import { TabItem } from "./tab-item";
import "./tabs.css";

export const Tabs = ({ activeTab, setActiveTab, tabs = ["ОПИСАНИЕ", "ДЕТАЛИ"] }) => {
    return (
        <div className="all-tabs">
            {tabs.map((tab, index) => (
                <TabItem 
                    key={tab}
                    tab={tab}
                    index={index}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />
            ))}
        </div>
    );
};