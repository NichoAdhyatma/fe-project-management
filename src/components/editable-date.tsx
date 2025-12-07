"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Check, X, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface EditableDateProps {
  value?: string;
  onChange?: (value: string) => void;
  onSave?: (value: Date) => void;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  dateDisplayClassName?: string;
  icon?: boolean;
  disabled?: boolean;
  format?: "DD/MM/YYYY" | "MM/DD/YYYY" | "YYYY-MM-DD";
}

export const EditableDate = React.forwardRef<HTMLDivElement, EditableDateProps>(
  (
    {
      value = "",
      onChange,
      onSave,
      placeholder = "Click to edit date...",
      className,
      inputClassName,
      dateDisplayClassName,
      icon = true,
      disabled = false,
      format = "YYYY-MM-DD",
    },
    ref
  ) => {
    const [isEditing, setIsEditing] = React.useState(false);
    const [editValue, setEditValue] = React.useState(value);
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
      setEditValue(value);
    }, [value]);

    React.useEffect(() => {
      if (isEditing && inputRef.current) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }, [isEditing]);

    const formatDateForDisplay = (dateString: string): string => {
      if (!dateString) return placeholder;

      try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return placeholder;

        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();

        switch (format) {
          case "DD/MM/YYYY":
            return `${day}/${month}/${year}`;
          case "MM/DD/YYYY":
            return `${month}/${day}/${year}`;
          case "YYYY-MM-DD":
          default:
            return `${year}-${month}-${day}`;
        }
      } catch {
        return placeholder;
      }
    };

    const handleSave = () => {
      // Validate date format
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (editValue && !dateRegex.test(editValue)) {
        alert("Please enter date in YYYY-MM-DD format");
        return;
      }

      const date = new Date(editValue);

      onSave?.(date);
      onChange?.(editValue);
      setIsEditing(false);
    };

    const handleCancel = () => {
      setEditValue(value);
      setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleSave();
      } else if (e.key === "Escape") {
        handleCancel();
      }
    };

    if (isEditing) {
      return (
        <div ref={ref} className={cn("flex items-center gap-2", className)}>
          <Input
            ref={inputRef}
            type="date"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={cn("h-8", inputClassName)}
          />
          <Button
            size="sm"
            variant="default"
            onClick={handleSave}
            className="h-8 w-8 p-0"
            title="Save (Enter)"
          >
            <Check className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleCancel}
            className="h-8 w-8 p-0"
            title="Cancel (Escape)"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        onClick={() => !disabled && setIsEditing(true)}
        className={cn(
          "group flex items-center gap-2 rounded px-2 py-1 transition-colors",
          !disabled && "cursor-pointer hover:bg-muted",
          disabled && "cursor-not-allowed opacity-50",
          className
        )}
      >
        <span
          className={cn(
            "text-sm",
            !editValue && "text-muted-foreground",
            dateDisplayClassName
          )}
        >
          {formatDateForDisplay(editValue)}
        </span>
        {icon && !disabled && (
          <Calendar className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
        )}
      </div>
    );
  }
);
EditableDate.displayName = "EditableDate";
