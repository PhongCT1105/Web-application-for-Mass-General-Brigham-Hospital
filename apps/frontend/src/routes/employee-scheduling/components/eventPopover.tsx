import { Label } from "@/components/ui/label";

import { CustomCalendarEvent } from "@/routes/employee-scheduling/components/BigCalendar.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { CustomEventComponent } from "@/routes/employee-scheduling/components/CustomEventComponent.tsx";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import React, { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { statuses } from "@/routes/employee-scheduling/data/status.ts";
import { priorities } from "@/routes/employee-scheduling/data/priority.ts";

interface EventPopoverProps {
  onUpdateEvent: (updatedEvent: CustomCalendarEvent) => void;
  event: CustomCalendarEvent;
  trigger: boolean;
  setTrigger: (isOpen: boolean) => void;
}
export function EventPopover({
  trigger,
  setTrigger,
  event,
  onUpdateEvent,
}: EventPopoverProps) {
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(
    event.status,
  );
  const [selectedPriority, setSelectedPriority] = useState<string | undefined>(
    event.priority,
  );
  const [thisEvent, setThisEvent] = useState(event);

  const handleStatusChange = (value: string) => {
    setThisEvent((prevState) => ({
      ...prevState,
      status: value,
    }));
    setSelectedStatus(value);
  };

  const handlePriorityChange = (value: string) => {
    setThisEvent((prevState) => ({
      ...prevState,
      priority: value,
    }));
    setSelectedPriority(value);
  };

  const handleSaveChanges = () => {
    const updatedEvent = {
      ...event,
      status: selectedStatus,
      priority: selectedPriority,
    };
    onUpdateEvent(updatedEvent);
    event.priority = selectedPriority;
    event.status = selectedStatus;
    return thisEvent;
  };

  return (
    <Dialog open={trigger} onOpenChange={setTrigger}>
      <DialogTrigger className={"items-start"}>
        <CustomEventComponent event={event} />
      </DialogTrigger>
      <DialogContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Shift</h4>
            <p className="text-sm text-muted-foreground">
              Set the shift information for {event.title}.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="status">Status</Label>
              <div className={"w-40"}>
                <Select onValueChange={handleStatusChange}>
                  <SelectTrigger>
                    <SelectValue placeholder={`Select status`} />
                  </SelectTrigger>
                  <SelectContent id="status">
                    {statuses.map((status) => (
                      <SelectItem key={status.value} value={status.label}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="priority">Priority</Label>
              <div className={"w-40"}>
                <Select onValueChange={handlePriorityChange}>
                  <SelectTrigger>
                    <SelectValue placeholder={`Select priority`} />
                  </SelectTrigger>
                  <SelectContent id="priority">
                    {priorities.map((priority) => (
                      <SelectItem key={priority.value} value={priority.label}>
                        {priority.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter className={"mr-4"}>
          <DialogClose>
            <Button
              onClick={() => {
                setTrigger(false);
                handleSaveChanges();
              }}
            >
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
