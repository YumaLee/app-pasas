import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChevronDown, Check, X, HelpCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const attendanceOptions = [
  { label: "Going", icon: <Check className="w-6 h-6" />, value: "going" },
  { label: "Maybe", icon: <HelpCircle className="w-6 h-6" />, value: "maybe" },
  { label: "Can't Go", icon: <X className="w-6 h-6" />, value: "cant_go" },
];

interface ActionButtonsProps {
  open: boolean;
  onClose: () => void;
}

export default function AttendanceForm({ onClose, open }: ActionButtonsProps) {
  const [attendance, setAttendance] = useState("going");
  const [openAtt, setOpenAtt] = useState(true);
  const [openMessage, setOpenMessage] = useState(false);
  const [openCode, setOpenCode] = useState(false);

  const handleSubmit = () => {
    setOpenMessage(true);
    setOpenCode(false);
    setOpenAtt(false)
  };

  const handleMessage = () => {
    setOpenMessage(false);
    setOpenCode(true);
  };


  const handleClose = (open: any) => {
    if (openCode) {
      setOpenMessage(true);
      setOpenCode(false);
    } else {
      if (openMessage) {
        setOpenMessage(false);
        setOpenCode(false);
        setOpenAtt(true)
      } else {
        onClose();
      }
    }
  };

  return (

    <Dialog open={open} onOpenChange={handleClose} >
      <DialogTitle></DialogTitle>
      <DialogContent >
        <div className="max-w-xl mx-auto rounded-xl p-6 bg-white/80 backdrop-blur-md shadow-lg space-y-6">
          {openAtt ?
            <>
              {/* Attendance Options */}
              <div className="flex justify-around">
                {attendanceOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setAttendance(opt.value)}
                    className={`flex flex-col items-center justify-center w-20 h-20 rounded-full shadow-md text-sm font-medium transition-colors ${attendance === opt.value
                      ? "bg-gradient-to-br from-cyan-400 to-orange-300 ring-2 ring-black"
                      : "bg-gray-100 text-gray-600"
                      }`}
                  >
                    {opt.icon}
                    <span className="mt-1">{opt.label}</span>
                  </button>
                ))}
              </div>

              <Input placeholder="Your Name" />

              <div className="flex gap-2">
                <div className="flex-1 flex gap-1">
                  <div className="border rounded px-2 py-1 flex items-center gap-1 text-sm font-medium">
                    PE <ChevronDown className="w-4 h-4" />
                  </div>
                  <Input placeholder="Phone Number" className="flex-1" />
                </div>

                <div className="flex items-center gap-1 border rounded px-2 py-1 text-sm">
                  <span className="font-semibold">2</span> attendees
                  <ChevronDown className="w-4 h-4 ml-1" />
                </div>
              </div>

              <p className="text-xs text-gray-500">Just for event updates. No spam.</p>

              <Textarea placeholder="+Post a comment" />

              <div className="flex justify-end gap-2">
                <Button onClick={onClose} variant="outline">Cancel</Button>
                <Button onClick={handleSubmit}>Continue</Button>
              </div>
            </>
            : null}


          {openMessage ?
            <div className="text-center space-y-6">
              <h2 className="text-2xl font-semibold">Get your code</h2>
              <p className="text-gray-600 text-sm">
                Choose to receive Partiful notifications via SMS or WhatsApp
              </p>

              <div className="border p-4 rounded-md bg-green-50 text-green-700 flex items-center justify-center gap-3">
                <Check className="w-6 h-6 text-green-600" />
                <span>¡Operación exitosa!</span>
                <img src="https://www.cloudflare.com/img/logo-cloudflare-dark.svg" alt="Cloudflare" className="h-6 ml-auto" />
              </div>

              <p className="text-sm text-gray-500">
                Having trouble?{" "}
                <a href="#" className="text-blue-600 underline">
                  Learn more
                </a>
              </p>


              <div className="space-y-3">
                <Button
                  className="w-full bg-[#6B46C1] hover:bg-[#5936a3] text-white"
                  onClick={handleMessage}
                >
                  <span className="mr-2">💬</span> SEND WITH WHATSAPP
                </Button>
                <Button className="w-full bg-gray-300 text-gray-600 cursor-not-allowed" disabled>
                  SEND WITH SMS
                </Button>
              </div>
            </div>
            : null}

          {openCode ?
            <div className="mx-auto max-w-md p-6 bg-gray-50 border border-gray-300 rounded-md shadow-md font-sans text-gray-800 flex flex-col items-center space-y-6">
              <h2 className="text-2xl font-semibold">Verify your number</h2>
              <p className="text-center text-gray-600 text-sm sm:text-base">
                We sent <span className="font-semibold">+51 999999999</span> a code via WhatsApp:
              </p>
              <div className="border-2 border-purple-600 rounded-md px-6 py-3 text-xl font-bold">
                676766
              </div>
              <p className="text-red-500 text-sm">Invalid code</p>
              <p className="text-center text-gray-600 text-sm sm:text-base">
                Didn't receive your code? Resend it in <span className="font-semibold">21s</span>
              </p>
              <p className="text-center text-xs text-gray-400">
                By clicking I AGREE, you agree to our{' '}
                <a href="#" className="text-gray-400 underline">
                  Terms
                </a>{' '}
                and{' '}
                <a href="#" className="text-gray-400 underline">
                  Privacy Policy
                </a>{' '}
                and consent to receive text messages from us and hosts. Message and
                data rates apply. Text HELP for help and STOP to cancel.
              </p>
              <button className="bg-purple-600 text-white font-semibold rounded-md px-10 py-4 cursor-pointer w-full sm:w-auto">
                I AGREE
              </button>
            </div>
            : null}
        </div>
      </DialogContent>
    </Dialog>

  );
}
