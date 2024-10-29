import { useState } from "react";
import { Plus, MoreHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from "@/components/ui/drawer";

const categories = [
  { name: "Work", color: "bg-blue-200" },
  { name: "Study", color: "bg-sky-200" },
  { name: "Entertainment", color: "bg-pink-200" },
  { name: "Other", color: "bg-green-200" },
];

const initialTasks = [
  {
    id: 1,
    title: "The first task title",
    description:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et",
    categories: ["Work", "Study", "Entertainment"],
    done: false,
  },
  {
    id: 2,
    title: "The second task title",
    description:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet",
    categories: [],
    done: false,
  },
  {
    id: 3,
    title: "The third task title",
    description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr,",
    categories: ["Entertainment", "Other"],
    done: true,
  },
];

export default function DevTaskApp() {
  const [tasks, setTasks] = useState(initialTasks);
  const [hideDoneTasks, setHideDoneTasks] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    categories: [],
  });
  const [selectedCategory, setSelectedCategory] = useState("All Tasks");
  //   const [open, setOpen] = useState(false);

  //   useEffect(() => {
  //     if (open === false) {
  //       console.log("Drawer is close");
  //     }
  //   }, [open]);

  const visibleTasks = tasks.filter(
    (task) =>
      (!hideDoneTasks || !task.done) &&
      (selectedCategory === "All Tasks" ||
        task.categories.includes(selectedCategory))
  );

  const toggleTaskStatus = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const openDrawer = (task = null) => {
    if (task) {
      setEditingTask(task);
      setNewTask({ ...task });
    } else {
      setEditingTask(null);
      setNewTask({ title: "", description: "", categories: [] });
    }
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setEditingTask(null);
    setNewTask({ title: "", description: "", categories: [] });
  };

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

  const handleSaveTask = () => {
    if (editingTask) {
      setTasks(
        tasks.map((task) =>
          task.id === editingTask.id ? { ...task, ...newTask } : task
        )
      );
    } else {
      setTasks([...tasks, { ...newTask, id: Date.now(), done: false }]);
    }
    closeDrawer();
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="flex bg-white md:mt-20 md:px-20 xl:pr-96">
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex justify-between items-center p-4">
          <h1 className="text-2xl font-semibold text-gray-700">QuickTasks</h1>
          <Button variant="ghost" size="icon" onClick={() => openDrawer()}>
            <Plus className="h-12 w-12" />
          </Button>
        </header>
        <div className="flex-1 flex overflow-hidden">
          <nav className="w-64 p-4">
            <div
              className={`flex items-center mb-2 p-2 rounded-lg cursor-pointer transition-colors ${
                selectedCategory === "All Tasks"
                  ? "bg-gray-200"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => setSelectedCategory("All Tasks")}
            >
              <span className="text-sm text-gray-600">
                <b>All Tasks</b>
              </span>
            </div>
            {categories.map((category) => (
              <div
                key={category.name}
                className={`flex items-center mb-2 p-2 rounded-lg cursor-pointer transition-colors ${
                  selectedCategory === category.name
                    ? "bg-gray-200"
                    : `hover:bg-gray-100`
                }`}
                onClick={() => setSelectedCategory(category.name)}
              >
                <div
                  className={`w-4 h-4 rounded-full ${category.color} mr-2`}
                ></div>
                <span className="text-sm text-gray-600">{category.name}</span>
              </div>
            ))}
            <div className="mt-4 flex items-center">
              <Checkbox
                id="hide-done"
                checked={hideDoneTasks}
                onCheckedChange={setHideDoneTasks}
              />
              <label htmlFor="hide-done" className="ml-2 text-sm text-gray-600">
                Hide Done Tasks
              </label>
            </div>
          </nav>
          <main className="flex-1 grid grid-cols-2 gap-4 justify-between overflow-x-hidden overflow-y-auto p-4">
            {visibleTasks.map((task) => (
              <div key={task.id} className="mb-4 bg-yellow-50 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className={task.done ? "line-through" : ""}>
                    <h3 className="text-lg font-semibold mb-2">{task.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {task.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {task.categories.map((category) => {
                        const categoryColor =
                          categories.find((c) => c.name === category)?.color ||
                          "bg-gray-200";
                        return (
                          // <span
                          //   key={category}
                          //   className={`${categoryColor} px-2 py-1 rounded-full text-xs`}
                          // >
                          //   {category}
                          // </span>
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
                      <DropdownMenuItem onClick={() => openDrawer(task)}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div>
                  <label className="flex items-center">
                    <Checkbox
                      checked={task.done}
                      onCheckedChange={() => toggleTaskStatus(task.id)}
                    />
                    <span className="ml-2 text-sm text-gray-600">Done</span>
                  </label>
                </div>
              </div>
            ))}
          </main>
        </div>
      </div>
      {isDrawerOpen && (
        <Drawer
          open={isDrawerOpen}
          onOpenChange={() => setIsDrawerOpen(true)}
          onClose={() => closeDrawer}
        >
          {/* <DrawerTrigger asChild>
            <Button variant="outline">Open Drawer</Button>
          </DrawerTrigger> */}
          <DrawerContent>
            <div className="bg-white w-full max-w-4xl mx-auto rounded-t-xl p-6">
              <DrawerTitle>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">
                    {editingTask ? "Edit Task" : "Add New Task"}
                  </h2>
                  <Button variant="ghost" size="icon" onClick={closeDrawer}>
                    <X className="h-6 w-6" />
                  </Button>
                </div>
              </DrawerTitle>
              <DrawerDescription></DrawerDescription>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={newTask.title}
                    onChange={handleInputChange}
                    placeholder="Add a title..."
                    className="w-full p-2 bg-gray-100 rounded-md"
                  />
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={newTask.description}
                    onChange={handleInputChange}
                    placeholder="Add a description..."
                    className="w-full p-2 bg-gray-100 rounded-md h-32"
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
                <Button variant="outline" onClick={closeDrawer}>
                  Cancel
                </Button>
                <Button onClick={handleSaveTask}>
                  {editingTask ? "Save Changes" : "Add Task"}
                </Button>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
}
