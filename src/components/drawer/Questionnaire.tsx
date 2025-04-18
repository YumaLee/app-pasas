import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { X, ChevronDown, Plus, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

const Questionnaire = () => {
    const [enabled, setEnabled] = useState(false);
    const [question, setQuestion] = useState("What's your Instagram handle?");
    const [required, setRequired] = useState(true);
    const [type, setType] = useState("Instagram");

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-around">
                <h2 className="text-lg font-semibold">Cuestionario</h2>
                <Switch checked={enabled} onCheckedChange={setEnabled} />
            </div>

            <p className="text-sm text-muted-foreground">
                Haz preguntas a tus invitados cuando confirmen su asistencia. Recopila correos electrónicos, restricciones dietéticas, ¡lo que sea!{' '}
                <a href="#" className="underline underline-offset-2 font-medium">Ver respuestas</a>
            </p>

            <hr />

            <div className="bg-muted/40 p-3 rounded-md space-y-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <button className="text-sm font-medium flex items-center gap-1 text-muted-foreground">
                            {type}
                            <ChevronDown className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Checkbox checked={required}
                                onCheckedChange={(checked: boolean) => setRequired(checked)}
                                id="required" />
                            <label htmlFor="required" className="text-sm">Required</label>
                        </div>
                        <button className="text-muted-foreground hover:text-destructive">
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <Input
                    placeholder="What’s your Instagram handle?"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                />
            </div>

            <button className="flex items-center gap-2 text-sm text-muted-foreground font-medium hover:underline">
                <Plus className="w-4 h-4" />
                Add question
            </button>

            <Button className="rounded-full px-6">Save</Button>
        </div>
    );
};

export default Questionnaire;
