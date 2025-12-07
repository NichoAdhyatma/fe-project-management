"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Check, X, Pencil } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface EditableTextProps {
  value?: string;
  onChange?: (value: string) => void;
  onSave?: (value: string) => void;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  editableClassName?: string;
  icon?: boolean;
  maxLength?: number;
  disabled?: boolean;
  showPencilIcon?: boolean;
}

export const EditableText = React.forwardRef<HTMLDivElement, EditableTextProps>(
  (
    {
      value = "",
      onChange,
      onSave,
      placeholder = "Click to edit...",
      className,
      inputClassName,
      editableClassName,
      icon = true,
      maxLength,
      disabled = false,
      showPencilIcon = true,
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

    const handleSave = () => {
      onSave?.(editValue);
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
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            maxLength={maxLength}
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
          "group flex items-center gap-2 rounded py-1 transition-colors",
          !disabled && "cursor-pointer hover:bg-muted",
          disabled && "cursor-not-allowed opacity-50",
          className
        )}
      >
        <span
          className={cn(
            "text-sm",
            !editValue && "text-muted-foreground",
            editableClassName
          )}
        >
          {editValue || placeholder}
        </span>
        {icon && showPencilIcon && !disabled && (
          <Pencil className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
        )}
      </div>
    );
  }
);
EditableText.displayName = "EditableText";
