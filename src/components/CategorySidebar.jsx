import { Checkbox } from "@/components/ui/checkbox";

export default function CategorySidebar({
  categories,
  selectedCategory,
  onSelectCategory,
  hideDoneTasks,
  onToggleHideDone,
}) {
  return (
    <nav className="w-64 p-4">
      <div
        className={`flex items-center mb-2 p-2 rounded-lg cursor-pointer transition-colors ${
          selectedCategory === "All Tasks" ? "bg-gray-200" : "hover:bg-gray-100"
        }`}
        onClick={() => onSelectCategory("All Tasks")}
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
              : "hover:bg-gray-100"
          }`}
          onClick={() => onSelectCategory(category.name)}
        >
          <div className={`w-4 h-4 rounded-full ${category.color} mr-2`}></div>
          <span className="text-sm text-gray-600">{category.name}</span>
        </div>
      ))}
      <div className="mt-4 flex items-center">
        <Checkbox
          id="hide-done"
          checked={hideDoneTasks}
          onCheckedChange={onToggleHideDone}
        />
        <label htmlFor="hide-done" className="ml-2 text-sm text-gray-600">
          Hide Done Tasks
        </label>
      </div>
    </nav>
  );
}
