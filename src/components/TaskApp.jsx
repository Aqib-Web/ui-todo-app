import { useState } from "react";
import TaskList from "./TaskList";
import TaskDrawer from "./TaskDrawer";
import CategorySidebar from "./CategorySidebar";

import { Plus, MoreHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";

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
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor.",
    categories: ["Work", "Study"],
    done: false,
  },
  {
    id: 2,
    title: "The second task title",
    description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr.",
    categories: [],
    done: false,
  },
  {
    id: 3,
    title: "The third task title",
    description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr.",
    categories: ["Entertainment", "Other"],
    done: true,
  },
];

export default function DevTaskApp() {
  const [tasks, setTasks] = useState(initialTasks);
  const [hideDoneTasks, setHideDoneTasks] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Tasks");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

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
    setEditingTask(task);
    setIsDrawerOpen(true);
  };

  // const openDrawer = (task = null) => {
  //   if (task) {
  //     setEditingTask(task);
  //     setClearForm(false);
  //   } else {
  //     setEditingTask(null);
  //     setClearForm(true);
  //   }
  //   setIsDrawerOpen(true);
  // };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setEditingTask(null);
  };

  const handleSaveTask = (newTask) => {
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
          <CategorySidebar
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            hideDoneTasks={hideDoneTasks}
            onToggleHideDone={setHideDoneTasks}
          />
          <TaskList
            tasks={visibleTasks}
            categories={categories}
            onToggleTask={toggleTaskStatus}
            onDeleteTask={handleDeleteTask}
            onEditTask={openDrawer}
          />
        </div>
      </div>
      <TaskDrawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        task={editingTask}
        categories={categories}
        onSaveTask={handleSaveTask}
      />
    </div>
  );
}
