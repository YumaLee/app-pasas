import { FC } from "react";

interface NavItemProps {
    icon: React.ElementType;
    text: string;
    active: boolean;
    onClick: () => void;
}

const NavItem: FC<NavItemProps> = ({ icon: Icon, text, active, onClick }) => {
    return (
        <div
            onClick={onClick}
            className={`flex items-center space-x-3 p-3 rounded-md cursor-pointer ${active ? "bg-gray-300 font-semibold" : "hover:bg-gray-200"}`}
        >
            <Icon className="w-5 h-5 text-gray-600" />
            <span className="text-gray-800">{text}</span>
        </div>
    );
};

export default NavItem;