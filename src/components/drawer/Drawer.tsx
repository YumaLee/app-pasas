import { FC, useState } from "react";
import { X, Users, ClipboardList, Eye, Camera, DollarSign, Bell } from "lucide-react";
import NavItem from "./NavItem";
import ManageHosts from "./ManageHosts";
import ManageRSVPs from "./ManageRSVPs";
import DisplayPrivacy from "./DisplayPrivacy";
import ChipIn from "./ChipIn";
import AutoReminders from "./AutoReminders";
import Questionnaire from "./Questionnaire";
import { usePaymentStore } from "@/store/settingPayment";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const Drawer: FC<DrawerProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("Hosts");

  return (
    <div
      className={`fixed inset-0 z-50 flex transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>

      <div
        className={`fixed left-0 top-0 h-full w-[650px] bg-white shadow-lg transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex h-full">
          <div className="w-1/3 bg-gray-100 p-6">
            <h2 className="text-lg font-semibold mb-4">Event Settings</h2>
            <nav className="space-y-4">
              <NavItem icon={Users} text="Hosts" active={activeTab === "Hosts"} onClick={() => setActiveTab("Hosts")} />
              <NavItem icon={ClipboardList} text="RSVPs" active={activeTab === "RSVPs"} onClick={() => setActiveTab("RSVPs")} />
              <NavItem icon={ClipboardList} text="Questionnaire" active={activeTab === "Questionnaire"} onClick={() => setActiveTab("Questionnaire")} />

              <NavItem icon={Eye} text="Display & Privacy" active={activeTab === "Display & Privacy"} onClick={() => setActiveTab("Display & Privacy")} />
              <NavItem icon={DollarSign} text="Chip In" active={activeTab === "Chip In"} onClick={() => setActiveTab("Chip In")} />
              <NavItem icon={Bell} text="Auto-Reminders" active={activeTab === "Auto-Reminders"} onClick={() => setActiveTab("Auto-Reminders")} />
            </nav>
          </div>

          <div className="w-2/3 p-6 relative">
            <button
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 hover:bg-gray-300"
              onClick={onClose}
            >
              <X className="w-5 h-5" />
            </button>

            {activeTab === "Hosts" && <ManageHosts />}
            {activeTab === "RSVPs" && <ManageRSVPs />}
            {activeTab === "Questionnaire" && <Questionnaire />}

            {activeTab === "Display & Privacy" && <DisplayPrivacy />}
            {activeTab === "Chip In" && <ChipIn />}
            {activeTab === "Auto-Reminders" && <AutoReminders />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;