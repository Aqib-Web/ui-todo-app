import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default function TaskDrawer({
  isOpen,
  onClose,
  task,
  categories,
  onSaveTask,
}) {
  const [newTask, setNewTask] = useState(
    task || { title: "", description: "", categories: [] }
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  const toggleCategory = (category) => {
    setNewTask((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  };

  const handleSave = () => {
    onSaveTask(newTask);
    onClose();
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent>
        <div className="bg-white w-full max-w-4xl mx-auto rounded-t-xl p-6">
          <DrawerTitle>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {task ? "Edit Task" : "Add New Task"}
              </h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            <DrawerDescription />
          </DrawerTitle>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={newTask.title}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-100 rounded-md"
                placeholder="Add a title..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={newTask.description}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-100 rounded-md h-32"
                placeholder="Add a description..."
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Categories
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.name}
                    onClick={() => toggleCategory(category.name)}
                    variant={
                      newTask.categories.includes(category.name)
                        ? "secondary"
                        : "outline"
                    }
                    size="sm"
                    className={
                      newTask.categories.includes(category.name)
                        ? category.color
                        : ""
                    }
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {task ? "Save Changes" : "Add Task"}
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
