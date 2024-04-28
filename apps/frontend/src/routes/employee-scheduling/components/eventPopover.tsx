import { Label } from "@/components/ui/label";

import { CustomCalendarEvent } from "@/routes/employee-scheduling/components/BigCalendar.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { priorities, statuses } from "@/interfaces/dataTypes/labels.ts";
import { CustomEventComponent } from "@/routes/employee-scheduling/components/CustomEventComponent.tsx";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";

interface EventPopoverProps {
  onUpdateEvent: (updatedEvent: CustomCalendarEvent) => void;
  event: CustomCalendarEvent;
}
export function EventPopover({ event, onUpdateEvent }: EventPopoverProps) {
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(
    event.status,
  );
  const [selectedPriority, setSelectedPriority] = useState<string | undefined>(
    event.priority,
  );

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
  };

  const handlePriorityChange = (value: string) => {
    setSelectedPriority(value);
  };

  const handleSaveChanges = () => {
    // Update the event with the selected status and priority
    const updatedEvent = {
      ...event,
      status: selectedStatus,
      priority: selectedPriority,
    };
    event.priority = selectedPriority;
    event.status = selectedPriority;
    onUpdateEvent(updatedEvent);
  };

  return (
    <Dialog>
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
        <DialogFooter className={" mr-4"}>
          <DialogClose>
            <Button onClick={handleSaveChanges}>Save</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
