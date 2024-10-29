import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

export default function TaskList({
  tasks,
  onToggleTask,
  onDeleteTask,
  onEditTask,
  categories,
}) {
  return (
    <div className="flex-1 grid grid-cols-2 gap-4 overflow-x-hidden overflow-y-auto p-4">
      {tasks.map((task) => (
        <div key={task.id} className="mb-4 bg-yellow-50 rounded-lg p-4">
          <div className="flex justify-between items-start">
            <div className={task.done ? "line-through" : ""}>
              <h3 className="text-lg font-semibold mb-2">{task.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{task.description}</p>
              <div className="flex flex-wrap gap-1 mb-2">
                {task.categories.map((category) => {
                  const categoryColor =
                    categories.find((c) => c.name === category)?.color ||
                    "bg-gray-200";
                  return (
                    <div
                      key={category}
                      className={`w-4 h-4 px-2 py-2 rounded-full ${categoryColor} mr-2`}
                    ></div>
                  );
                })}
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEditTask(task)}>
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onDeleteTask(task.id)}>
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div>
            <label className="flex items-center">
              <Checkbox
                checked={task.done}
                onCheckedChange={() => onToggleTask(task.id)}
              />
              <span className="ml-2 text-sm text-gray-600">Done</span>
            </label>
          </div>
        </div>
      ))}
    </div>
  );
}
