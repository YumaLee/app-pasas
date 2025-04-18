import { FC } from "react";

interface NavItemProps {
    title: string;
    description: string;

}

const TabContent: FC<NavItemProps> = ({ title, description}) => {
    return (
        <div
  
            className={"flex items-center space-x-3 p-3 rounded-md cursor-pointer hover:bg-gray-200"}
        >
            <span className="text-gray-800">{title}</span>

            <span className="text-gray-800">{description}</span>
        </div>
    );
};

export default TabContent;