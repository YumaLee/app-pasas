"use client"

import React from "react"

import { Button } from "@/components/ui/button";

import { DateRange, DateRangePicker } from "@/components/ui/datepicker"

export const DateRangeTimer = () => {
    const [value, setValue] = React.useState<DateRange | undefined>(undefined)

    React.useEffect(() => {
        console.log("Value changed: ", value)
    }, [value])

    return (
        <>
            <div className="mx-auto flex max-w-sm flex-col gap-2">
                <p className="text-gray-500">
                    {value
                        ? `${value.from?.toString()} – ${value.to?.toString()}`
                        : "Select a date range"}
                </p>
                <DateRangePicker
                    showTimePicker
                    value={value}
                    onChange={(value) => {
                        setValue(value)
                    }}
                />
                <div className="flex justify-end gap-2">
                    <Button variant="destructive" onClick={() => setValue(undefined)}>
                        Resetss
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() =>
                            setValue({
                                from: new Date(new Date().setDate(new Date().getDate() - 7)),
                                to: new Date(),
                            })
                        }
                    >
                        Week
                    </Button>
                </div>
            </div>
        </>
    )
}